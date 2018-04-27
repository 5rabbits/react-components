import {
  padLeft,
  minutesToString,
  stringToMinutes,
  isValidString,
} from '../helpers'

describe('helpers', () => {
  describe('padLeft(string, padCharacter, padLength)', () => {
    it('should fill `string` with `padCharacter` until the string length is `padLength`', () => {
      expect(padLeft('1', '0', 3)).toBe('001')
      expect(padLeft('23', 'X', 10)).toBe('XXXXXXXX23')
      expect(padLeft('123', '0', 2)).toBe('123')
    })

    it('should cast the initial value to string', () => {
      expect(padLeft(1, '0', 3)).toBe('001')
    })
  })

  describe('minutesToString(value)', () => {
    it('should convert the specified value (in minutes) to format XXh XXm', () => {
      const tests = [
        [0, '00h 00m'],
        [60, '01h 00m'],
        [65, '01h 05m'],
        [70, '01h 10m'],
        [185, '03h 05m'],
        [1440, '24h 00m'],
        [6000, '100h 00m'],
      ]

      tests.forEach(testCase => {
        expect(minutesToString(testCase[0])).toBe(testCase[1])
      })
    })
  })

  describe('isValidString(value)', () => {
    it('should return true if the value is in a valid XXh XXm format', () => {
      const tests = [
        'h m',
        '0h',
        '0m',
        '0h   m',
        '2H     23m  ',
        '00h 00M',
        '123h 00m',
        '0H 0M',
        '00h 59m',
        '0h 120m',
      ]

      tests.forEach(testCase => {
        expect(isValidString(testCase)).toBe(true)
      })
    })

    it('should return false if the value is not in a valid XXh XXm format', () => {
      const tests = ['123', 'asd', '   ']

      tests.forEach(testCase => {
        expect(isValidString(testCase)).toBe(false)
      })
    })
  })

  describe('stringToMinutes(value)', () => {
    it('should convert a XXh XXm formatted string to minutes', () => {
      const tests = [
        [0, '00h 00m'],
        [60, '01h 00m'],
        [65, '01h 05m'],
        [70, '01h 10m'],
        [185, '03h 05m'],
        [1440, '24h 00m'],
        [6000, '100h 00m'],
      ]

      tests.forEach(testCase => {
        expect(stringToMinutes(testCase[1])).toBe(testCase[0])
      })
    })
  })
})
