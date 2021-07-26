import { BitDataView } from '../src/BitDataView'

const mockData = [[]]

describe('BitDataView', () => {
  describe('int8', () => {
    /**
     * Unsigned
     */
    describe('getUint8', () => {
      test('should expect 8 bit allocation', () => {
        const bdv = new BitDataView(new ArrayBuffer(1))

        expect(() => bdv.getUint8(0)).not.toThrow(RangeError)
        expect(() => bdv.getUint8(1)).toThrow(RangeError)
      })

      test('should return correct number', () => {
        const bdv = new BitDataView(new Uint8Array([0xff, 0x00]).buffer)
        expect(bdv.getUint8(0)).toBe(0b11111111)
        expect(bdv.getUint8(1)).toBe(0b1111111)
        expect(bdv.getUint8(2)).toBe(0b111111)
        expect(bdv.getUint8(3)).toBe(0b11111)
        expect(bdv.getUint8(4)).toBe(0b1111)
        expect(bdv.getUint8(5)).toBe(0b111)
        expect(bdv.getUint8(6)).toBe(0b11)
        expect(bdv.getUint8(7)).toBe(0b1)
        expect(bdv.getUint8(8)).toBe(0)
      })
    })

    describe('setUint8', () => {
      test('should expect 8 bit allocation', () => {
        const bdv = new BitDataView(new ArrayBuffer(1))

        expect(() => bdv.setUint8(0, 1)).not.toThrow(RangeError)
        expect(() => bdv.setUint8(1, 1)).toThrow(RangeError)
      })

      test('should set number correctly', () => {
        const bdv = new BitDataView(new ArrayBuffer(2))

        for (let i = 0; i < 8; i++) {
          expect(bdv.getUint8(i)).toBe(0)
          bdv.setUint8(i, 1)
          expect(bdv.getUint8(i)).toBe(1)
        }
      })
    })

    /**
     * Signed
     */
    describe('getInt8', () => {
      test('should expect 8 bit allocation', () => {
        const bdv = new BitDataView(new ArrayBuffer(1))

        expect(() => bdv.getInt8(0)).not.toThrow(RangeError)
        expect(() => bdv.getInt8(8)).toThrow(RangeError)
      })

      test('should return correct number', () => {
        const bdv = new BitDataView(new ArrayBuffer(2))

        for (let i = 0; i < 8; i++) {
          console.log(i)
          bdv.setUint8(i, 156)
          expect(bdv.getInt8(i)).toBe(-100)
        }
      })
    })

    describe('setInt8', () => {
      test('should expect 8 bit allocation', () => {
        const bdv = new BitDataView(new ArrayBuffer(1))

        expect(() => bdv.setInt8(0, 1)).not.toThrow(RangeError)
        expect(() => bdv.setInt8(1, 1)).toThrow(RangeError)
      })
    })
  })
})
