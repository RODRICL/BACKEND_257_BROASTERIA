import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch, // Cambiar de Put a Patch
  Delete,
  UseGuards,
} from '@nestjs/common';
import { VentasService } from './ventas.service';
import { CreateVentaDto } from './dto/create-venta.dto'; // Usamos el mismo DTO de creación
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@ApiTags('ventas') // Swagger
@ApiBearerAuth() // Documentación para loguear
@UseGuards(JwtAuthGuard) // Protege las rutas con JWT
@Controller('ventas')
export class VentasController {
  constructor(private readonly ventasService: VentasService) {}

  // Crear una nueva venta
  @Post()
  create(@Body() createVentaDto: CreateVentaDto) {
    return this.ventasService.create(createVentaDto);
  }

  // Obtener todas las ventas
  @Get()
  findAll() {
    return this.ventasService.findAll();
  }

  // Obtener una venta específica por ID
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ventasService.findOne(+id); // Convertir el id a número
  }

  // Actualizar parcialmente una venta (PATCH en lugar de PUT)
  @Patch(':id') // Usamos PATCH para actualizaciones parciales
  async update(
    @Param('id') id: string,
    @Body() createVentaDto: CreateVentaDto, // Usamos el mismo DTO de creación
  ) {
    return this.ventasService.update(+id, createVentaDto); // Llamar al servicio de actualización
  }

  // Eliminar lógicamente una venta
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.ventasService.remove(+id); // Llamar al servicio de eliminación lógica
  }
}
