import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateProveedorDto {
  @ApiProperty() //Swagger
  @IsNotEmpty({ message: 'El campo nit es obligatorio' })
  @IsString({ message: 'El campo nit debe ser tipo cadena' })
  @MaxLength(10, {
    message: 'El campo nit no debe ser mayor a 10 caracteres',
  })
  readonly nit: string;

  @ApiProperty() //Swagger
  @IsNotEmpty({ message: 'El campo razonSocial es obligatorio' })
  @IsString({ message: 'El campo razonSocial debe ser tipo cadena' })
  @MaxLength(150, {
    message: 'El campo razonSocial no debe ser mayor a 150 caracteres',
  })
  readonly razonSocial: string;

  @ApiProperty() //Swagger
  @IsNotEmpty({ message: 'El campo direccion es obligatorio' })
  @IsString({ message: 'El campo direccion debe ser tipo cadena' })
  @MaxLength(200, {
    message: 'El campo direccion no debe ser mayor a 200 caracteres',
  })
  readonly direccion: string;

  @ApiProperty() //Swagger
  @IsNotEmpty({ message: 'El campo telefono es obligatorio' })
  @IsString({ message: 'El campo telefono debe ser tipo cadena' })
  @MaxLength(10, {
    message: 'El campo telefono no debe ser mayor a 10 caracteres',
  })
  readonly telefono: string;

  @ApiProperty() //Swagger
  @IsNotEmpty({ message: 'El campo email es obligatorio' })
  @IsString({ message: 'El campo email debe ser tipo cadena' })
  @MaxLength(30, {
    message: 'El campo email no debe ser mayor a 30 caracteres',
  })
  readonly email: string;
}
