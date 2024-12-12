import { Usuario } from 'src/usuarios/entities/usuario.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('empleados')
export class Empleado {
  @PrimaryGeneratedColumn('identity')
  id: number;

  @Column('varchar', { length: 10 })
  ci: string;

  @Column('varchar', { length: 50 })
  nombres: string;

  @Column('varchar', { length: 30 })
  apellidoPaterno: string;

  @Column('varchar', { length: 30 })
  apellidoMaterno: string;

  @Column('integer', { name: 'id_usuarios' }) // adiionado
  idUsuarios: number;

  @Column('varchar', { length: 20 })
  cargo: string;

  @Column('varchar', { length: 30 })
  email: string;

  @Column('varchar', { length: 50 })
  direccion: string;

  @Column('varchar', { length: 8 })
  celular: string;

  @Column('date', { name: 'fecha_Contratacion' })
  fechaContratacion: Date;

  @CreateDateColumn({ name: 'fecha_creacion', nullable: true })
  fechaCreacion: Date;

  @UpdateDateColumn({ name: 'fecha_modificacion' })
  fechaModificacion: Date;

  @DeleteDateColumn({ name: 'fecha_elimanacion', select: false })
  fechaEliminacion: Date;

  @ManyToOne(() => Usuario, (usuario) => usuario.empleados)
  @JoinColumn({ name: 'id_usuarios', referencedColumnName: 'id' })
  usuarios: Usuario;
}
