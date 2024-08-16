import { Test, TestingModule } from '@nestjs/testing';
import { ExternalSupplierService } from '../external-supplier.service';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { HttpService } from '@nestjs/axios';
import { Cache } from 'cache-manager';
import { of } from 'rxjs';
import { AxiosResponse } from 'axios';
import { HotelDto } from '../../dto/hotel.dto';

describe('ExternalSupplierService', () => {
  let service: ExternalSupplierService;
  let httpService: HttpService;
  let cacheManager: Cache;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ExternalSupplierService,
        {
          provide: CACHE_MANAGER,
          useValue: {
            get: jest.fn(),
            set: jest.fn(),
          },
        },
        {
          provide: HttpService,
          useValue: {
            get: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<ExternalSupplierService>(ExternalSupplierService);
    httpService = module.get<HttpService>(HttpService);
    cacheManager = module.get<Cache>(CACHE_MANAGER);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('fetchSupplierData', () => {
    it('should return cached data if available', async () => {
      const cachedData = [new HotelDto(), new HotelDto(), new HotelDto()];

      jest.spyOn(cacheManager, 'get').mockResolvedValue(cachedData);

      const result = await service.fetchSupplierData();

      expect(cacheManager.get).toHaveBeenCalledWith('supplierData');
      expect(result).toEqual(cachedData);
      expect(httpService.get).not.toHaveBeenCalled();
    });

    it('should fetch data from suppliers and cache the result', async () => {
      const mockResponseData = [{ id: '1', name: 'Hotel' }];
      const responseObj = {
        data: mockResponseData,
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {},
      } as AxiosResponse;

      const mockResponses: AxiosResponse[] = [
        responseObj,
        responseObj,
        responseObj,
      ];

      jest.spyOn(cacheManager, 'get').mockResolvedValue(null);
      jest.spyOn(httpService, 'get').mockImplementation(() => {
        return of(mockResponses.shift() as AxiosResponse);
      });

      const result = await service.fetchSupplierData();

      expect(cacheManager.get).toHaveBeenCalledWith('supplierData');
      expect(httpService.get).toHaveBeenCalledTimes(3);
      expect(cacheManager.set).toHaveBeenCalledWith(
        'supplierData',
        expect.any(Array),
      );

      expect(result.length).toBe(3);
      expect(result[0]).toBeInstanceOf(HotelDto);
      expect(result[1]).toBeInstanceOf(HotelDto);
      expect(result[2]).toBeInstanceOf(HotelDto);
    });

    it('should map the response data to the correct DTO', async () => {
      const mockResponseData = [{ id: '1', name: 'Hotel' }];
      const mockResponses: AxiosResponse[] = [
        {
          data: mockResponseData,
          status: 200,
          statusText: 'OK',
          headers: {},
          config: {},
        } as AxiosResponse,
      ];

      jest.spyOn(cacheManager, 'get').mockResolvedValue(null);
      jest.spyOn(httpService, 'get').mockImplementation(() => {
        return of(mockResponses[0]);
      });

      const result = await service.fetchSupplierData();

      expect(result[0]).toBeInstanceOf(HotelDto);
    });
  });
});
