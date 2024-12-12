import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateEmpleadoDto } from './dto/create-empleado.dto';
import { UpdateEmpleadoDto } from './dto/update-empleado.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Empleado } from './entities/empleado.entity';
import { Repository } from 'typeorm';
import { Usuario } from 'src/usuarios/entities/usuario.entity';

@Injectable()
export class EmpleadosService {
  constructor(
    @InjectRepository(Empleado)
    private empleadosRepository: Repository<Empleado>,
  ) {}
  async create(createEmpleadoDto: CreateEmpleadoDto): Promise<Empleado> {
    const existe = await this.empleadosRepository.findOneBy({
      ci: createEmpleadoDto.ci.trim(),
      nombres: createEmpleadoDto.nombres.trim(),
      apellidoPaterno: createEmpleadoDto.apellidoPaterno.trim(),
      apellidoMaterno: createEmpleadoDto.apellidoMaterno.trim(),
    });
    if (existe) {
      throw new ConflictException('El empleado ya existe');
    }
    const empleado = new Empleado();
    empleado.ci = createEmpleadoDto.ci.trim();
    empleado.nombres = createEmpleadoDto.nombres.trim();
    empleado.apellidoPaterno = createEmpleadoDto.apellidoPaterno.trim();
    empleado.apellidoMaterno = createEmpleadoDto.apellidoMaterno.trim();
    empleado.cargo = createEmpleadoDto.cargo.trim();
    empleado.email = createEmpleadoDto.email.trim();
    empleado.direccion = createEmpleadoDto.direccion.trim();
    empleado.celular = createEmpleadoDto.celular.trim();
    empleado.fechaContratacion = createEmpleadoDto.fechaContratacion;
    if (
      createEmpleadoDto.idUsuarios === 0 ||
      createEmpleadoDto.idUsuarios === null
    ) {
      empleado.usuarios = null; // Si no se selecciona un usuario, asignar null
    } else {
      empleado.usuarios = { id: createEmpleadoDto.idUsuarios } as Usuario;
    }

    // Guardar el nuevo empleado
    return this.empleadosRepository.save(empleado);
  }

  async findAll(): Promise<Empleado[]> {
    return this.empleadosRepository.find({ relations: ['usuarios'] });
  }

  async findByInterprete(idUsuarios: number): Promise<Empleado[]> {
    return this.empleadosRepository
      .createQueryBuilder('empleados')
      .innerJoin('empleados.usuarios', 'usuarios')
      .where('usuarios.id = :idUsuarios', { idUsuarios })
      .getMany();
  }

  async findOne(id: number): Promise<Empleado> {
    const empleado = await this.empleadosRepository.findOne({
      where: { id },
      relations: ['usuarios'],
    });
    if (!empleado) {
      throw new NotFoundException(`El empleado ${id} no existe`);
    }
    return empleado;
  }

  async update(
    id: number,
    updateEmpleadoDto: UpdateEmpleadoDto,
  ): Promise<Empleado> {
    const empleado = await this.findOne(id);
    empleado.ci = updateEmpleadoDto.ci;
    empleado.nombres = updateEmpleadoDto.nombres.trim();
    empleado.apellidoPaterno = updateEmpleadoDto.apellidoPaterno.trim();
    empleado.apellidoMaterno = updateEmpleadoDto.apellidoMaterno.trim();
    empleado.cargo = updateEmpleadoDto.cargo;
    empleado.email = updateEmpleadoDto.email;
    empleado.direccion = updateEmpleadoDto.direccion;
    empleado.celular = updateEmpleadoDto.celular;
    empleado.fechaContratacion = updateEmpleadoDto.fechaContratacion;
    if (
      updateEmpleadoDto.idUsuarios === 0 ||
      updateEmpleadoDto.idUsuarios === null
    ) {
      empleado.usuarios = null; // Si no se selecciona un usuario, asignar null
    } else {
      empleado.usuarios = { id: updateEmpleadoDto.idUsuarios } as Usuario;
    }

    // Guardar el empleado actualizado
    return this.empleadosRepository.save(empleado);
  }
  async remove(id: number) {
    const empleado = await this.findOne(id);
    return this.empleadosRepository.softRemove(empleado);
  }
}
