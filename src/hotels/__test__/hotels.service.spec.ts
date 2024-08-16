import { Test, TestingModule } from '@nestjs/testing';
import { HotelService } from '../hotels.service';
import { ExternalSupplierService } from '../../external-suppliers/external-supplier.service';
import { HotelDto } from '../../dto/hotel.dto';

describe('HotelService', () => {
  let service: HotelService;
  let externalSupplierService: ExternalSupplierService;

  const createMockData = (): HotelDto[] => {
    const hotel1 = new HotelDto();
    hotel1.id = '1';
    hotel1.destinationId = 100;

    const hotel2 = new HotelDto();
    hotel2.id = '2';
    hotel2.destinationId = 100;

    const hotel3 = new HotelDto();
    hotel3.id = '3';
    hotel3.destinationId = 100;

    return [hotel1, hotel2, hotel3];
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        HotelService,
        {
          provide: ExternalSupplierService,
          useValue: {
            fetchSupplierData: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<HotelService>(HotelService);
    externalSupplierService = module.get<ExternalSupplierService>(
      ExternalSupplierService,
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getHotels', () => {
    it('should return a list of hotels based on supplier data', async () => {
      jest
        .spyOn(externalSupplierService, 'fetchSupplierData')
        .mockResolvedValue(createMockData());

      const result = await service.getHotels(100, null);

      expect(result).toBeDefined();
      expect(result.length).toBe(3);
      expect(result[0].destinationId).toBe(100);
    });

    it('should filter hotels by destinationId', async () => {
      jest
        .spyOn(externalSupplierService, 'fetchSupplierData')
        .mockResolvedValue(createMockData());

      const result = await service.getHotels(100, null);

      expect(result.length > 0).toBe(true);
      expect(result.every((hotel) => hotel.destinationId === 100)).toBe(true);
    });

    it('should filter hotels by hotelIds', async () => {
      jest
        .spyOn(externalSupplierService, 'fetchSupplierData')
        .mockResolvedValue(createMockData());

      const result = await service.getHotels(null, ['1', '2']);

      expect(result).toBeDefined();
      expect(result.length).toBe(2);
      expect(result[0].id).toBe('1');
    });
  });
});
