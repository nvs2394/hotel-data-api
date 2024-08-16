import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ExternalSupplierService } from './external-supplier.service';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [HttpModule, CacheModule.register()],
  providers: [ExternalSupplierService],
  exports: [ExternalSupplierService],
})
export class ExternalSupplierModule {}
