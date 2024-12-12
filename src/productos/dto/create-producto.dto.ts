import { ApiProperty } from '@nestjs/swagger';
import {
  IsDefined,
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateProductoDto {
  @ApiProperty() //Swagger
  @IsNotEmpty({ message: 'El campo nombre es obligatorio' })
  @IsString({ message: 'El campo nombre debe ser de tipo cadena' })
  @MaxLength(30, {
    message: 'El campo nombre no debe ser mayor a 30 caracteres',
  })
  readonly nombre: string;

  @ApiProperty() //Swagger
  @IsNotEmpty({ message: 'El campo descripcion es obligatorio' })
  @IsString({ message: 'El campo descripcion debe ser de tipo cadena' })
  @MaxLength(50, {
    message: 'El campo descripcion no debe ser mayor a 50 caracteres',
  })
  readonly descripcion: string;

  @ApiProperty() //Swagger
  @IsNotEmpty({ message: 'El campo precioVenta es obligatorio' })
  @IsNumber({}, { message: 'El campo precioVenta debe ser de tipo numero' })
  readonly precioVenta: number;

  @ApiProperty() //Swagger
  @IsNotEmpty({ message: 'El campo stock es obligatorio' })
  @IsNumber({}, { message: 'El campo stock debe ser de tipo numero' })
  readonly stock: number;

  @ApiProperty() //Swagger
  @IsDefined({ message: 'El campo idCategoria debe estar definido' })
  @IsNumber({}, { message: 'El campo idCategoria debe ser de tipo numérico' })
  readonly idCategoria: number;
}
