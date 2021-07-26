import { BitDataView } from '../src/BitDataView'

describe('BitDataView', () => {
  describe('getBit', () => {
    test('should expect 1 bit allocation', () => {
      const bdv = new BitDataView(new ArrayBuffer(1))

      for (let i = 0; i < 8; i++) {
        expect(() => bdv.getBit(i)).not.toThrow(RangeError)
      }

      expect(() => bdv.getBit(8)).toThrow(RangeError)
    })

    test('should return correct bit', () => {
      const bdv = new BitDataView(new Uint8Array([0b10110010, 0b00011111]).buffer)
      expect(bdv.getBit(0)).toBe(0)
      expect(bdv.getBit(1)).toBe(1)
      expect(bdv.getBit(2)).toBe(0)
      expect(bdv.getBit(3)).toBe(0)
      expect(bdv.getBit(4)).toBe(1)
      expect(bdv.getBit(5)).toBe(1)
      expect(bdv.getBit(6)).toBe(0)
      expect(bdv.getBit(7)).toBe(1)
      expect(bdv.getBit(8)).toBe(1)
      expect(bdv.getBit(9)).toBe(1)
      expect(bdv.getBit(10)).toBe(1)
      expect(bdv.getBit(11)).toBe(1)
      expect(bdv.getBit(12)).toBe(1)
      expect(bdv.getBit(13)).toBe(0)
      expect(bdv.getBit(14)).toBe(0)
      expect(bdv.getBit(15)).toBe(0)
    })
  })

  describe('setBit', () => {
    test('should expect 1 bit allocation', () => {
      const bdv = new BitDataView(new ArrayBuffer(1))

      for (let i = 0; i < 8; i++) {
        expect(() => bdv.setBit(i, 1)).not.toThrow(RangeError)
      }

      expect(() => bdv.setBit(8, 1)).toThrow(RangeError)
    })

    test('should set bits correctly', () => {
      const bdv = new BitDataView(new ArrayBuffer(2))
      for (let i = 0; i < 16; i++) {
        expect(bdv.getBit(i)).toBe(0)
        bdv.setBit(i, 1)
        expect(bdv.getBit(i)).toBe(1)
      }
    })
  })
})
