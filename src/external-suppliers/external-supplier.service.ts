import { HttpService } from '@nestjs/axios';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { lastValueFrom } from 'rxjs';
import { HotelDto } from '../dto/hotel.dto';
import { supplierStrategies } from './strategies/external-supplier.strategies';

export class ExternalSupplierService {
  constructor(
    private readonly httpService: HttpService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async fetchSupplierData(): Promise<HotelDto[]> {
    const cacheKey = 'supplierData';
    const cachedData = await this.cacheManager.get<HotelDto[]>(cacheKey);
    if (cachedData) {
      return cachedData;
    }

    const requests = supplierStrategies.map((strategy) =>
      this.httpService.get(strategy.getUrl()),
    );

    const responses = await Promise.all(
      requests.map((req) => lastValueFrom(req)),
    );
    const data = responses
      .map((response, index) =>
        supplierStrategies[index].mapToDto(response.data),
      )
      .flat();

    await this.cacheManager.set(cacheKey, data);
    return data;
  }
}
