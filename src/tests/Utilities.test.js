import { Utility, colorMapping, parseDate, isValidDateFormat } from '../utils/utilities';

describe('Utility functions', () => {
  describe('isEmpty', () => {
    it('should return true for undefined', () => {
      expect(Utility.isEmpty(undefined)).toBe(true);
    });

    it('should return true for null', () => {
      expect(Utility.isEmpty(null)).toBe(true);
    });

    it('should return true for empty string', () => {
      expect(Utility.isEmpty('')).toBe(true);
    });

    it('should return true for empty array', () => {
      expect(Utility.isEmpty([])).toBe(true);
    });

    it('should return true for empty object', () => {
      expect(Utility.isEmpty({})).toBe(true);
    });

    it('should return false for non-empty string', () => {
      expect(Utility.isEmpty('Hello')).toBe(false);
    });

    it('should return false for non-empty array', () => {
      expect(Utility.isEmpty([1, 2, 3])).toBe(false);
    });

    it('should return false for non-empty object', () => {
      expect(Utility.isEmpty({ key: 'value' })).toBe(false);
    });

    it('should return false for boolean value', () => {
      expect(Utility.isEmpty(true)).toBe(false);
    });

    it('should return false for function', () => {
      expect(Utility.isEmpty(() => {})).toBe(false);
    });
  });
});

describe('colorMapping function', () => {
  it('should return "green" for cardType "VISA"', () => {
    expect(colorMapping('VISA')).toBe('green');
  });

  it('should return "orange" for cardType "MasterCard"', () => {
    expect(colorMapping('MasterCard')).toBe('orange');
  });

  it('should return "blue" for cardType "American Express"', () => {
    expect(colorMapping('American Express')).toBe('blue');
  });

  it('should return "red" for unknown cardType', () => {
    expect(colorMapping('Unknown')).toBe('red');
  });
});

describe("isValidDateFormat function", () => {
  it("should return true for valid date formats", () => {
    const validFormats = [
      "2021-04-24 12:42:12+00:00",
      "1989-05-23 13:25:14",
    ];

    validFormats.forEach((format) => {
      expect(isValidDateFormat(format)).toBe(true);
    });
  });

  it("should return false for invalid date formats", () => {
    const invalidFormats = [
      "2021-04-24T12:42:12Z", // Invalid separator
      "1989-05-23 13:25:14+00", // Incomplete timezone
      "2021-04-24 12:42:12Z00:00", // Invalid timezone format
      "2021-04-24 12:42:12Z+0012:00", // Invalid timezone offset
      "invalid-date-format", // Not a date format
    ];

    invalidFormats.forEach((format) => {
      expect(isValidDateFormat(format)).toBe(false);
    });
  });
});

describe("parseDate function", () => {
  it("should parse and format valid date strings", () => {
    const inputDateString1 = "2021-04-24 12:42:12+00:00";
    const expectedFormattedDate1 = "24-Apr-2021";

    const inputDateString2 = "1989-05-23 13:25:14";
    const expectedFormattedDate2 = "23-May-1989";

    expect(parseDate(inputDateString1)).toBe(expectedFormattedDate1);
    expect(parseDate(inputDateString2)).toBe(expectedFormattedDate2);
  });

  it("should return the original string for invalid date formats", () => {
    const invalidDateString = "invalid-date-format";

    expect(parseDate(invalidDateString)).toBe(invalidDateString);
  });
});
