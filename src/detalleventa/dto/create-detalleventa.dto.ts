import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsNumber } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateDetalleventaDto {
  @ApiProperty()
  @IsNumber({}, { message: 'El campo cantidad debe ser de tipo numérico' })
  @IsDefined({ message: 'La cantidad es obligatoria' })
  @Transform(({ value }) => Number(value)) // Asegura que el valor sea un número
  readonly cantidad: number;

  @ApiProperty()
  @IsNumber({}, { message: 'El campo idProducto debe ser de tipo numérico' })
  @IsDefined({ message: 'El campo idProducto es obligatorio' })
  @Transform(({ value }) => Number(value)) // Asegura que el valor sea un número
  readonly idProducto: number;

  @ApiProperty()
  @IsNumber({}, { message: 'El campo idVenta debe ser de tipo numérico' })
  @IsDefined({ message: 'El campo idVenta es obligatorio' })
  @Transform(({ value }) => Number(value)) // Asegura que el valor sea un número
  readonly idVenta: number; // Añadido idVenta para asociar el detalle a una venta
}
