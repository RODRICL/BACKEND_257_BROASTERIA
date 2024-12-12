import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch, // Cambiar a PATCH en lugar de PUT
  Delete,
  UseGuards,
} from '@nestjs/common';
import { DetalleventaService } from './detalleventa.service';
import { CreateDetalleventaDto } from './dto/create-detalleventa.dto';
import { Detalleventa } from './entities/detalleventa.entity';

import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@ApiTags('detalleventa') // Swagger
@ApiBearerAuth() // Para la documentación y autenticación JWT
@UseGuards(JwtAuthGuard) // Protege las rutas con JWT
@Controller('detalleventa')
export class DetalleventaController {
  constructor(private readonly detalleventaService: DetalleventaService) {}

  // Crear un nuevo detalle de venta
  @Post()
  async create(
    @Body() createDetalleventaDto: CreateDetalleventaDto[],
  ): Promise<Detalleventa[]> {
    console.log('Recibido en el backend:', createDetalleventaDto);
    return this.detalleventaService.createBulk(createDetalleventaDto);
  }

  // Obtener todos los detalles de venta
  @Get()
  async findAll(): Promise<Detalleventa[]> {
    return this.detalleventaService.findAll();
  }

  // Obtener un detalle de venta específico por ID
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Detalleventa> {
    return this.detalleventaService.findOne(+id); // Convertir el id a número
  }

  // Actualizar un detalle de venta por ID (con PATCH para actualización parcial)
  @Patch(':id') // Cambiar a PATCH en lugar de PUT
  async update(
    @Param('id') id: string,
    @Body() updateDetalleventaDto: CreateDetalleventaDto, // Usamos el mismo DTO
  ): Promise<Detalleventa> {
    return this.detalleventaService.update(+id, updateDetalleventaDto); // Llamar al servicio con PATCH
  }

  // Eliminar un detalle de venta por ID (lógicamente)
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    return this.detalleventaService.delete(+id);
  }
}
