import { BitDataView } from '../src/BitDataView'

describe('BitDataView', () => {
  describe('constructor', () => {
    describe('buffer argument', () => {
      test('should be a ArrayBuffer', () => {
        const badValues = [undefined, null, {}, 0, 'a', [], new Uint8Array(1)]

        for (const badValue of badValues) {
          expect(() => new BitDataView(badValue as any)).toThrow(TypeError)
        }

        expect(() => new BitDataView(new ArrayBuffer(1))).not.toThrow(TypeError)
      })
    })

    describe('bitOffset argument', () => {
      test('should be in range', () => {
        const { buffer } = new Uint8Array([0])
        for (let i = 0; i < 9; i++) {
          expect(() => new BitDataView(buffer, i)).not.toThrow(RangeError)
        }
        expect(() => new BitDataView(buffer, 9)).toThrow(RangeError)
      })
    })

    describe('bitLength argument', () => {
      test('should fit', () => {
        const { buffer } = new Uint8Array([0])
        for (let i = 0; i < 9; i++) {
          expect(() => new BitDataView(buffer, 0, i)).not.toThrow(RangeError)
        }
        expect(() => new BitDataView(buffer, 0, 9)).toThrow(RangeError)
      })
    })
  })

  describe('buffer', () => {
    test('should return the arraybuffer', () => {
      const { buffer } = new Uint8Array([0])
      const bdv = new BitDataView(buffer)
      expect(bdv.buffer).toBe(buffer)
    })
  })

  describe('bifOffset', () => {
    test('should return the bitOffset', () => {
      const { buffer } = new Uint8Array([0])
      expect(new BitDataView(buffer).bitOffset).toBe(0)
      expect(new BitDataView(buffer, 5).bitOffset).toBe(5)
    })
  })

  describe('bitLength', () => {
    test('should return the bitLength', () => {
      const { buffer } = new Uint8Array([0])
      expect(new BitDataView(buffer).bitLength).toBe(8)
      expect(new BitDataView(buffer, 0, 7).bitLength).toBe(7)
    })
  })
})
