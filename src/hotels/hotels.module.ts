import { Module } from '@nestjs/common';
import { HotelService } from './hotels.service';
import { HotelController } from './hotels.controller';
import { HttpModule } from '@nestjs/axios';
import { ExternalSupplierModule } from '../external-suppliers/external-supplier.module';

@Module({
  imports: [HttpModule, ExternalSupplierModule],
  providers: [HotelService],
  controllers: [HotelController],
})
export class HotelModule {}
