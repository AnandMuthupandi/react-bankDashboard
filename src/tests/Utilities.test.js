import { Utility, colorMapping } from '../utils/utilities';

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
