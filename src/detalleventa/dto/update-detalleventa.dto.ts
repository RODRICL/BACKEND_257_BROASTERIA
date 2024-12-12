import { PartialType } from '@nestjs/swagger';
import { CreateDetalleventaDto } from './create-detalleventa.dto';

export class UpdateDetalleventaDto extends PartialType(CreateDetalleventaDto) {}
