import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { GetHotelsQueryDto } from '../get-hotels-query.dto';

describe('GetHotelsQueryDto', () => {
  it('should pass validation with valid data', async () => {
    const dto = plainToClass(GetHotelsQueryDto, {
      destinationId: 1234,
      hotelIds: ['1234', '5678'],
    });

    const errors = await validate(dto);
    expect(errors.length).toBe(0);
  });

  it('should fail if destinationId is not a 4-digit number', async () => {
    const dto = plainToClass(GetHotelsQueryDto, {
      destinationId: 12345, // This should fail
      hotelIds: ['1234'],
    });

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].constraints?.min || errors[0].constraints?.max).toBe(
      'Destination ID must be a 4-digit number.',
    );
  });

  it('should fail if hotelIds is an empty array', async () => {
    const dto = plainToClass(GetHotelsQueryDto, {
      destinationId: 1234,
      hotelIds: [],
    });

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].constraints?.arrayNotEmpty).toBe(
      'hotelIds must not be an empty array',
    );
  });

  it('should fail if any hotelId exceeds 4 characters', async () => {
    const dto = plainToClass(GetHotelsQueryDto, {
      destinationId: 1234,
      hotelIds: ['12345'],
    });

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].constraints?.maxLength).toBe(
      'Each hotel ID must not exceed 4 characters.',
    );
  });

  it('should fail if any hotelId is not a string', async () => {
    const dto = plainToClass(GetHotelsQueryDto, {
      destinationId: 1234,
      hotelIds: [1234],
    });

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].constraints?.isString).toBe(
      'Each hotel ID must be a string',
    );
  });
});
