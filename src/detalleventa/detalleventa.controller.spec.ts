import { Test, TestingModule } from '@nestjs/testing';
import { DetalleventaController } from './detalleventa.controller';
import { DetalleventaService } from './detalleventa.service';

describe('DetalleventaController', () => {
  let controller: DetalleventaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DetalleventaController],
      providers: [DetalleventaService],
    }).compile();

    controller = module.get<DetalleventaController>(DetalleventaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
