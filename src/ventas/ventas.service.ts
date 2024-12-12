import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Venta } from './entities/venta.entity';
import { Repository } from 'typeorm';
import { Usuario } from 'src/usuarios/entities/usuario.entity';
import { Cliente } from 'src/clientes/entities/cliente.entity';
import { CreateVentaDto } from './dto/create-venta.dto';

@Injectable()
export class VentasService {
  constructor(
    @InjectRepository(Venta) private ventasRepository: Repository<Venta>,
  ) {}

  // Método para crear una venta, ya recibiendo el montoTotal desde el frontend
  async create(createVentaDto: CreateVentaDto): Promise<Venta> {
    // Crear la venta sin calcular montoTotal, solo recibiendo los valores
    const venta = new Venta();
    venta.usuarios = { id: createVentaDto.idUsuario } as Usuario;
    venta.cliente = { id: createVentaDto.idCliente } as Cliente;
    venta.montoTotal = createVentaDto.montoTotal; // Recibir el montoTotal directamente

    // Guardamos la venta con el monto total enviado
    return this.ventasRepository.save(venta);
  }

  // Método para obtener todas las ventas
  async findAll(): Promise<Venta[]> {
    const ventas = await this.ventasRepository.find({
      relations: ['usuarios', 'cliente'],
    });

    // Mapear las ventas para asegurar que la fecha esté en formato ISO si es necesario
    return ventas.map((venta) => ({
      ...venta,
      fecha_creacion: venta.fechaCreacion.toISOString(), // Formatear la fecha de creación a formato ISO
    }));
  }

  // Método para obtener una venta por su ID
  async findOne(id: number): Promise<Venta> {
    const venta = await this.ventasRepository.findOne({
      where: { id },
      relations: [
        'usuarios',
        'cliente',
        'detalleventas',
        'detalleventas.producto',
        'detalleventas.producto.categoria',
      ],
    });
    if (!venta) {
      throw new NotFoundException(`La venta ${id} no existe`);
    }
    return venta;
  }

  // Método para actualizar parcialmente una venta existente (usando PATCH)
  async update(id: number, updateVentaDto: CreateVentaDto): Promise<Venta> {
    const venta = await this.ventasRepository.findOne({ where: { id } });
    if (!venta) {
      throw new NotFoundException(`Venta con id ${id} no encontrada`);
    }

    // Actualizar los campos que vengan en el DTO
    if (updateVentaDto.idUsuario) {
      venta.usuarios = { id: updateVentaDto.idUsuario } as Usuario;
    }
    if (updateVentaDto.idCliente) {
      venta.cliente = { id: updateVentaDto.idCliente } as Cliente;
    }
    if (updateVentaDto.montoTotal) {
      venta.montoTotal = updateVentaDto.montoTotal; // Actualizar el montoTotal si lo envían
    }

    // Guardar la venta con los cambios parciales
    return this.ventasRepository.save(venta);
  }

  // Método para eliminar lógicamente una venta
  async remove(id: number): Promise<void> {
    const venta = await this.ventasRepository.findOne({ where: { id } });
    if (!venta) {
      throw new NotFoundException(`Venta con id ${id} no encontrada`);
    }

    // Marcar la venta como eliminada
    venta.fechaEliminacion = new Date(); // Establecemos la fecha de eliminación

    // Guardamos la venta con la fecha de eliminación
    await this.ventasRepository.save(venta);
  }
}
