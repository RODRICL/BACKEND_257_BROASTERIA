import { Module } from '@nestjs/common';
import { VentasService } from './ventas.service';
import { VentasController } from './ventas.controller';
import { Venta } from './entities/venta.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Detalleventa } from 'src/detalleventa/entities/detalleventa.entity'; // Importa la entidad de Detalleventa

@Module({
  imports: [
    TypeOrmModule.forFeature([Venta, Detalleventa]), // Incluye Detalleventa aquí
  ],
  controllers: [VentasController],
  providers: [VentasService],
  exports: [TypeOrmModule.forFeature([Venta, Detalleventa])], // Exporta también Detalleventa
})
export class VentasModule {}
