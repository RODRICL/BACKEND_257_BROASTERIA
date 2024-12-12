import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateClienteDto {
  @ApiProperty() //Swagger
  @IsNotEmpty({ message: 'El campo ci es obligatorio' })
  @IsString({ message: 'El campo ci debe ser de tipo cadena' })
  @MaxLength(10, { message: 'El campo ci no debe ser mayor a 10 caracteres' })
  readonly ci: string;

  @ApiProperty() //Swagger
  @IsNotEmpty({ message: 'El campo nombre completo es obligatorio' })
  @IsString({ message: 'El campo nombre completo debe ser de tipo cadena' })
  @MaxLength(100, {
    message: 'El campo nombre completo no debe ser mayor a 1000 caracteres',
  })
  readonly nombreCompleto: string;

  @ApiProperty() //Swagger
  @IsNotEmpty({ message: 'El campo celular es obligatorio' })
  @IsString({ message: 'El campo celular debe ser de tipo cadena' })
  @MaxLength(8, {
    message: 'El campo celular no debe ser mayor a 8 caracteres',
  })
  readonly celular: string;
}
