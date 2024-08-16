import { Test, TestingModule } from '@nestjs/testing';
import { HotelController } from '../hotels.controller';
import { HotelService } from '../hotels.service';
import { GetHotelsResponseDto } from '../dto/get-hotels-response.dto';
import { GetHotelsQueryDto } from '../dto/get-hotels-query.dto';

describe('HotelController', () => {
  let controller: HotelController;
  let service: HotelService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HotelController],
      providers: [
        {
          provide: HotelService,
          useValue: {
            getHotels: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<HotelController>(HotelController);
    service = module.get<HotelService>(HotelService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getHotels', () => {
    it('should call HotelService with correct parameters', async () => {
      const mockHotels: GetHotelsResponseDto[] = [
        {
          id: '1',
          destinationId: 100,
          name: 'Hotel One',
        } as GetHotelsResponseDto,
        {
          id: '2',
          destinationId: 100,
          name: 'Hotel Two',
        } as GetHotelsResponseDto,
      ];

      jest.spyOn(service, 'getHotels').mockResolvedValue(mockHotels);

      const requestQuery = new GetHotelsQueryDto();
      requestQuery.destinationId = 100;
      requestQuery.hotelIds = ['1', '2'];

      const result = await controller.getHotels(requestQuery);

      expect(service.getHotels).toHaveBeenCalledWith(
        requestQuery.destinationId,
        requestQuery.hotelIds,
      );
      expect(result).toEqual(mockHotels);
    });

    it('should return an empty array if no hotels are found', async () => {
      jest.spyOn(service, 'getHotels').mockResolvedValue([]);
      const requestQuery = new GetHotelsQueryDto();
      requestQuery.hotelIds = ['100'];

      const result = await controller.getHotels({});

      expect(result).toEqual([]);
    });

    it('should handle cases where only destinationId is provided', async () => {
      const mockHotels: GetHotelsResponseDto[] = [
        {
          id: '1',
          destinationId: 100,
          name: 'Hotel One',
        } as GetHotelsResponseDto,
      ];

      const requestQuery = new GetHotelsQueryDto();
      requestQuery.destinationId = 100;

      jest.spyOn(service, 'getHotels').mockResolvedValue(mockHotels);

      const result = await controller.getHotels(requestQuery);

      expect(service.getHotels).toHaveBeenCalledWith(100, undefined);
      expect(result).toEqual(mockHotels);
    });

    it('should handle cases where only hotelIds are provided', async () => {
      const mockHotels: GetHotelsResponseDto[] = [
        {
          id: '1',
          destinationId: 100,
          name: 'Hotel One',
        } as GetHotelsResponseDto,
      ];

      const requestQuery = new GetHotelsQueryDto();
      requestQuery.hotelIds = ['1'];

      jest.spyOn(service, 'getHotels').mockResolvedValue(mockHotels);

      const result = await controller.getHotels(requestQuery);

      expect(service.getHotels).toHaveBeenCalledWith(
        undefined,
        requestQuery.hotelIds,
      );
      expect(result).toEqual(mockHotels);
    });
  });
});
