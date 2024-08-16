import { AcmeSupplierStrategy } from './acme.strategy';
import { HotelDto } from '../../dto/hotel.dto';
import { PaperfliesSupplierStrategy } from './paperflies.strategy';
import { PatagoniaSupplierStrategy } from './patagonia.strategy';

export interface SupplierStrategy {
  mapToDto(data: object): HotelDto[];
  getUrl(): string;
}

export const supplierStrategies = [
  new AcmeSupplierStrategy(),
  new PatagoniaSupplierStrategy(),
  new PaperfliesSupplierStrategy(),
];
