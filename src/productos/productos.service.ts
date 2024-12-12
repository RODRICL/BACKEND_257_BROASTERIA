import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Producto } from './entities/producto.entity';
import { Categoria } from 'src/categoria/entities/categoria.entity';

@Injectable()
export class ProductosService {
  constructor(
    @InjectRepository(Producto)
    private productosRepository: Repository<Producto>,
  ) {}

  async create(createProductoDto: CreateProductoDto): Promise<Producto> {
    const existe = await this.productosRepository.findOneBy({
      nombre: createProductoDto.nombre.trim(),
    });

    if (existe) {
      throw new ConflictException('El Producto ya existe');
    }

    const producto = new Producto();
    producto.nombre = createProductoDto.nombre.trim();
    producto.descripcion = createProductoDto.descripcion.trim();
    producto.precioVenta = createProductoDto.precioVenta;
    producto.stock = createProductoDto.stock;
    producto.categoria = { id: createProductoDto.idCategoria } as Categoria;
    return this.productosRepository.save(producto);
  }

  async findAll(): Promise<Producto[]> {
    return this.productosRepository.find({ relations: ['categoria'] });
  }

  async findByInterprete(idCategoria: number): Promise<Producto[]> {
    return this.productosRepository
      .createQueryBuilder('productos')
      .innerJoin('productos.categoria', 'categoria')
      .where('categoria.id = :idCategoria', { idCategoria })
      .getMany();
  }

  async findOne(id: number): Promise<Producto> {
    const producto = await this.productosRepository.findOne({
      where: { id },
      relations: ['categoria'],
    });
    if (!producto) {
      throw new NotFoundException(`El producto ${id} no existe`);
    }
    return producto;
  }

  async update(
    id: number,
    updateProductoDto: UpdateProductoDto,
  ): Promise<Producto> {
    const producto = await this.findOne(id);
    producto.nombre = updateProductoDto.nombre.trim();
    producto.descripcion = updateProductoDto.descripcion.trim();
    producto.precioVenta = updateProductoDto.precioVenta;
    producto.stock = updateProductoDto.stock;
    producto.categoria = { id: updateProductoDto.idCategoria } as Categoria;
    return this.productosRepository.save(producto);
  }

  async remove(id: number) {
    const producto = await this.findOne(id);
    return this.productosRepository.softRemove(producto);
  }
}
