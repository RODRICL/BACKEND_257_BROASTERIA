import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Detalleventa } from './entities/detalleventa.entity';
import { CreateDetalleventaDto } from './dto/create-detalleventa.dto';
import { Venta } from 'src/ventas/entities/venta.entity';
import { Producto } from 'src/productos/entities/producto.entity';

@Injectable()
export class DetalleventaService {
  constructor(
    @InjectRepository(Detalleventa)
    private detalleventaRepository: Repository<Detalleventa>,
    @InjectRepository(Producto)
    private productoRepository: Repository<Producto>,
    @InjectRepository(Venta)
    private ventaRepository: Repository<Venta>, // Inyectamos el servicio de Venta
  ) {}

  // Crear múltiples detalles de venta
  async createBulk(
    createDetalleventaDtos: CreateDetalleventaDto[],
  ): Promise<Detalleventa[]> {
    const detallesGuardados: Detalleventa[] = [];

    for (const dto of createDetalleventaDtos) {
      const existe = await this.detalleventaRepository.findOne({
        where: {
          venta: { id: dto.idVenta },
          producto: { id: dto.idProducto },
        },
      });
      if (existe) {
        throw new ConflictException(
          `El detalle de venta ya existe para el producto con ID ${dto.idProducto}`,
        );
      }

      const producto = await this.productoRepository.findOne({
        where: { id: dto.idProducto },
      });
      if (!producto) {
        throw new NotFoundException(
          `Producto con ID ${dto.idProducto} no encontrado`,
        );
      }

      // Verificar stock disponible
      if (producto.stock < dto.cantidad) {
        throw new ConflictException(
          `No hay suficiente stock para el producto ${producto.nombre}. Solo quedan ${producto.stock} unidades.`,
        );
      }

      const venta = await this.ventaRepository.findOne({
        where: { id: dto.idVenta },
        relations: ['detalleventas'], // Asegurarnos de cargar los detalles
      });
      if (!venta) {
        throw new NotFoundException(
          `Venta con ID ${dto.idVenta} no encontrada`,
        );
      }

      const detalleventa = new Detalleventa();
      detalleventa.venta = venta;
      detalleventa.producto = producto;
      detalleventa.cantidad = dto.cantidad;
      detalleventa.precioVenta = producto.precioVenta;
      detalleventa.subtotal = dto.cantidad * producto.precioVenta;

      const savedDetalleventa =
        await this.detalleventaRepository.save(detalleventa);

      // Actualizar el stock del producto
      producto.stock -= dto.cantidad;
      await this.productoRepository.save(producto);

      // Agregar el detalle guardado a la lista
      detallesGuardados.push(savedDetalleventa);
    }

    return detallesGuardados;
  }

  // Método para crear un detalle de venta
  async create(
    createDetalleventaDto: CreateDetalleventaDto,
  ): Promise<Detalleventa> {
    const existe = await this.detalleventaRepository.findOne({
      where: {
        venta: { id: createDetalleventaDto.idVenta },
        producto: { id: createDetalleventaDto.idProducto },
      },
    });
    if (existe) throw new ConflictException('El detalle de venta ya existe');

    const producto = await this.productoRepository.findOne({
      where: { id: createDetalleventaDto.idProducto },
    });
    if (!producto) throw new NotFoundException('Producto no encontrado');

    // Verificar que haya suficiente stock disponible
    if (producto.stock < createDetalleventaDto.cantidad) {
      throw new ConflictException(
        `No hay suficiente stock para el producto ${producto.nombre}. Solo quedan ${producto.stock} unidades.`,
      );
    }

    const venta = await this.ventaRepository.findOne({
      where: { id: createDetalleventaDto.idVenta },
    });
    if (!venta) throw new NotFoundException('Venta no encontrada');

    const detalleventa = new Detalleventa();
    detalleventa.venta = venta;
    detalleventa.producto = producto;
    detalleventa.cantidad = createDetalleventaDto.cantidad;
    detalleventa.precioVenta = producto.precioVenta;
    detalleventa.subtotal =
      createDetalleventaDto.cantidad * producto.precioVenta;

    const savedDetalleventa =
      await this.detalleventaRepository.save(detalleventa);

    // Actualizar el stock del producto después de la venta
    producto.stock -= createDetalleventaDto.cantidad;
    await this.productoRepository.save(producto); // Guardar el producto con el nuevo stock

    return savedDetalleventa;
  }

  // Obtener todos los detalles de venta
  async findAll(): Promise<Detalleventa[]> {
    return this.detalleventaRepository.find({
      relations: ['venta', 'producto'],
    });
  }

  // Obtener un detalle de venta por ID
  async findOne(id: number): Promise<Detalleventa> {
    const detalleventa = await this.detalleventaRepository.findOne({
      where: { id },
      relations: ['venta', 'producto'],
    });

    if (!detalleventa) {
      throw new NotFoundException('Detalle de venta no encontrado');
    }

    return detalleventa;
  }

  // Método para actualizar parcialmente un detalle de venta
  async update(
    id: number,
    updateDetalleventaDto: CreateDetalleventaDto,
  ): Promise<Detalleventa> {
    const detalleventa = await this.detalleventaRepository.findOne({
      where: { id },
    });
    if (!detalleventa) {
      throw new NotFoundException(
        `Detalle de venta con id ${id} no encontrado`,
      );
    }

    // Actualizamos solo los campos proporcionados en el DTO
    if (updateDetalleventaDto.idProducto) {
      const producto = await this.productoRepository.findOne({
        where: { id: updateDetalleventaDto.idProducto },
      });
      if (!producto) throw new NotFoundException('Producto no encontrado');
      detalleventa.producto = producto;
      detalleventa.precioVenta = producto.precioVenta;
    }

    if (updateDetalleventaDto.cantidad) {
      detalleventa.cantidad = updateDetalleventaDto.cantidad;
      detalleventa.subtotal =
        detalleventa.cantidad * detalleventa.producto.precioVenta;
    }

    const updatedDetalleventa =
      await this.detalleventaRepository.save(detalleventa);

    return updatedDetalleventa;
  }

  // Método para eliminar lógicamente un detalle de venta
  async delete(id: number): Promise<void> {
    const detalleventa = await this.detalleventaRepository.findOne({
      where: { id },
    });
    if (!detalleventa) {
      throw new NotFoundException(
        `Detalle de venta con id ${id} no encontrado`,
      );
    }

    // Marcar el detalle como eliminado
    detalleventa.fechaEliminacion = new Date(); // Establecer la fecha de eliminación
    await this.detalleventaRepository.save(detalleventa);
  }
}
