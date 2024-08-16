import { getCountryNameByAlpha2 } from 'country-locale-map';
import { getCountryName } from '../locale.utils';

jest.mock('country-locale-map', () => ({
  getCountryNameByAlpha2: jest.fn(),
}));

describe('getCountryName', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test.each`
    input     | mockReturnValue    | expectedOutput
    ${'US'}   | ${'United States'} | ${'United States'}
    ${'CA'}   | ${'Canada'}        | ${'Canada'}
    ${'U'}    | ${undefined}       | ${'U'}
    ${''}     | ${undefined}       | ${''}
    ${'USA'}  | ${undefined}       | ${'USA'}
    ${'FR'}   | ${'France'}        | ${'France'}
    ${'####'} | ${undefined}       | ${'####'}
  `(
    'should return $expectedOutput when input is $input',
    ({ input, mockReturnValue, expectedOutput }) => {
      if (input.length === 2) {
        (getCountryNameByAlpha2 as jest.Mock).mockReturnValue(mockReturnValue);
      }

      const result = getCountryName(input);

      if (input.length === 2) {
        expect(getCountryNameByAlpha2).toHaveBeenCalledWith(input);
      } else {
        expect(getCountryNameByAlpha2).not.toHaveBeenCalled();
      }

      expect(result).toBe(expectedOutput);
    },
  );

  it('should return empty string when input is undefined', () => {
    const result = getCountryName();
    expect(result).toBe('');
  });
});
