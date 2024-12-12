import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsDefined,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateEmpleadoDto {
  @ApiProperty() //Swagger
  @IsNotEmpty({ message: 'El campo ci es obligatorio' })
  @IsString({ message: 'El campo ci debe ser de tipo cadena' })
  @MaxLength(10, {
    message: 'El campo ci no debe ser mayor a 10 caracteres',
  })
  readonly ci: string;

  @ApiProperty() //Swagger
  @IsNotEmpty({ message: 'El campo nombres es obligatorio' })
  @IsString({ message: 'El campo nombres debe ser de tipo cadena' })
  @MaxLength(50, {
    message: 'El campo nombres no debe ser mayor a 50 caracteres',
  })
  readonly nombres: string;

  @ApiProperty() //Swagger
  @IsNotEmpty({ message: 'El campo apellidoPaterno es obligatorio' })
  @IsString({ message: 'El campo apellidoPaterno debe ser de tipo cadena' })
  @MaxLength(30, {
    message: 'El campo apellidoPaterno no debe ser mayor a 30 caracteres',
  })
  readonly apellidoPaterno: string;

  @ApiProperty() //Swagger
  @IsNotEmpty({ message: 'El campo apellidoMaterno es obligatorio' })
  @IsString({ message: 'El campo apellidoMaterno debe ser de tipo cadena' })
  @MaxLength(30, {
    message: 'El campo apellidoMaterno no debe ser mayor a 30 caracteres',
  })
  readonly apellidoMaterno: string;

  @ApiProperty() //Swagger
  @IsNotEmpty({ message: 'El campo cargo es obligatorio' })
  @IsString({ message: 'El campo cargo debe ser de tipo cadena' })
  @MaxLength(20, {
    message: 'El campo cargo no debe ser mayor a 20 caracteres',
  })
  readonly cargo: string;

  @ApiProperty({ required: false }) //Swagger
  @IsOptional()
  @IsNumber({}, { message: 'El campo idUsuarios debe ser de tipo numérico' })
  readonly idUsuarios?: number = 0;

  @ApiProperty() //Swagger
  @IsNotEmpty({ message: 'El campo email es obligatorio' })
  @IsString({ message: 'El campo email debe ser de tipo cadena' })
  @MaxLength(30, {
    message: 'El campo email no debe ser mayor a 30 caracteres',
  })
  readonly email: string;

  @ApiProperty() //Swagger
  @IsNotEmpty({ message: 'El campo direccion es obligatorio' })
  @IsString({ message: 'El campo direccion debe ser de tipo cadena' })
  @MaxLength(50, {
    message: 'El campo direccion no debe ser mayor a 50 caracteres',
  })
  readonly direccion: string;

  @ApiProperty() //Swagger
  @IsNotEmpty({ message: 'El campo celular es obligatorio' })
  @IsString({ message: 'El campo celular debe ser de tipo cadena' })
  @MaxLength(8, {
    message: 'El campo celular no debe ser mayor a 8 caracteres',
  })
  readonly celular: string;

  @ApiProperty() //Swagger
  @IsDefined({ message: 'El campo fechaLanzamiento debe estar definido' })
  @IsDateString(
    {},
    { message: 'El campo fechaContratacion debe ser de tipo fecha' },
  )
  readonly fechaContratacion: Date;
}
