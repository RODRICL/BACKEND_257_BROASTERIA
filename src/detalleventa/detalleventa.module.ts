import { Module, forwardRef } from '@nestjs/common';
import { DetalleventaService } from './detalleventa.service';
import { DetalleventaController } from './detalleventa.controller';
import { Detalleventa } from './entities/detalleventa.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductosModule } from 'src/productos/productos.module';
import { VentasModule } from 'src/ventas/ventas.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Detalleventa]),
    forwardRef(() => ProductosModule), // Manejo de dependencias circulares
    forwardRef(() => VentasModule), // Manejo de dependencias circulares
  ],
  controllers: [DetalleventaController],
  providers: [DetalleventaService],
  exports: [DetalleventaService], // Exportar el servicio
})
export class DetalleventaModule {}
