export class BitDataView {
  private _buffer: Uint8Array = null;
  private _bitOffset = 0;
  private _bitLength = 0

  constructor(buffer: ArrayBuffer, bitOffset?: number, bitLength?: number) {
    if (buffer?.constructor?.name !== 'ArrayBuffer') {
      throw new TypeError('First argument to BitDataView constructor must be an ArrayBuffer');
    }

    this._buffer = new Uint8Array(buffer);
    this._bitOffset = isNaN(+bitOffset) ? 0 : +bitOffset;
    this._bitLength = isNaN(+bitLength) ? buffer.byteLength * 8 - this._bitOffset : +bitLength;

    if (this._bitOffset / 8 > buffer.byteLength) {
      throw new RangeError(`Start offset ${this._bitOffset} is outside the bounds of the buffer`);
    }
    if ((this._bitOffset + this._bitLength) / 8 > buffer.byteLength) {
      throw new RangeError(`Invalid BitDataView length ${this._bitLength}`);
    }
  }

  // Getter & Setter
  public get buffer(): ArrayBuffer {
    return this._buffer.buffer;
  }

  public get bitOffset(): number {
    return this._bitOffset;
  }

  public get bitLength(): number {
    return this._bitLength;
  }

  // Public methods
  // Bit
  public getBit(bitOffset: number): 0 | 1 {
    this._assertBounds(bitOffset, 1);
    return this._readBit(bitOffset);
  }

  public setBit(bitOffset: number, value: 0 | 1): void {
    this._assertBounds(bitOffset, 1);
    this._writeBit(bitOffset, value);
  }

  // Int 8
  public getUint8(bitOffset: number): number {
    this._assertBounds(bitOffset, 8);
    return this._readByte(bitOffset);
  }

  public setUint8(bitOffset: number, value: number): void {
    this._assertBounds(bitOffset, 8);
    this._writeByte(bitOffset, value);
  }

  public getInt8(bitOffset: number): number {
    return new Int8Array(new Uint8Array([this.getUint8(bitOffset)]).buffer)[0];
  }

  public setInt8(bitOffset: number, value: number): void {
    this._assertBounds(bitOffset, 8);
    throw new Error('Not implemented');
  }

  // Int 16
  public getUint16(bitOffset: number, littleEndian = false): number {
    this._assertBounds(bitOffset, 16);
    const bytes = this._readBytes(bitOffset, 2);
    if (!littleEndian) bytes.reverse();
    return new Uint16Array(new Uint8Array(bytes).buffer)[0];
  }

  public setUint16(bitOffset: number, value: number, littleEndian = false): void {
    this._assertBounds(bitOffset, 16);
    throw new Error('Not implemented');
  }

  public getInt16(bitOffset: number, littleEndian = false): number {
    return new Int16Array(
      new Uint16Array([this.getUint16(bitOffset, littleEndian)]).buffer
    )[0];
  }

  public setInt16(bitOffset: number, value: number, littleEndian = false): void {
    this._assertBounds(bitOffset, 16);
    throw new Error('Not implemented');
  }

  // Int 32
  public getUint32(bitOffset: number, littleEndian = false): number {
    this._assertBounds(bitOffset, 32);
    const bytes = this._readBytes(bitOffset, 4);
    if (!littleEndian) bytes.reverse();
    return new Uint32Array(new Uint8Array(bytes).buffer)[0];
  }

  public setUint32(bitOffset: number, value: number, littleEndian = false): void {
    this._assertBounds(bitOffset, 32);
    throw new Error('Not implemented');
  }

  public getInt32(bitOffset: number, littleEndian = false): number {
    return new Int32Array(
      new Uint32Array([this.getUint32(bitOffset, littleEndian)]).buffer
    )[0];
  }

  public setInt32(bitOffset: number, value: number, littleEndian = false): void {
    this._assertBounds(bitOffset, 32);
    throw new Error('Not implemented');
  }

  // Int 64
  public getBigUint64(bitOffset: number, littleEndian = false): any {
    this._assertBounds(bitOffset, 64);
    const bytes = this._readBytes(bitOffset, 8);
    if (!littleEndian) bytes.reverse();
    // @ts-ignore Dont know why it does not know it...
    return new BigUint64Array(new Uint8Array(bytes).buffer)[0];
  }

  public setBigUint64(bitOffset: number, value: number, littleEndian = false): void {
    this._assertBounds(bitOffset, 64);
    throw new Error('Not implemented');
  }

  public getBigInt64(bitOffset: number, littleEndian = false): number {
    this._assertBounds(bitOffset, 64);
    throw new Error('Not implemented');
  }

  public setBigInt64(bitOffset: number, value: number, littleEndian = false): void {
    this._assertBounds(bitOffset, 64);
    throw new Error('Not implemented');
  }

  // Float 32
  public getFloat32(bitOffset: number, littleEndian = false): number {
    return new Float32Array(
      new Uint32Array([this.getUint32(bitOffset, littleEndian)]).buffer
    )[0];
  }

  public setFloat32(bitOffset: number, value: number, littleEndian = false): void {
    this.setUint32(
      bitOffset,
      new Uint32Array(new Float32Array([value]).buffer)[0],
      littleEndian
    );
  }

    // Float 64
    public getFloat64(bitOffset: number, littleEndian = false): number {
      this._assertBounds(bitOffset, 64);
      throw new Error('Not implemented');
    }
  
    public setFloat64(bitOffset: number, value: number, littleEndian = false): void {
      this._assertBounds(bitOffset, 64);
      throw new Error('Not implemented');
    }

  // Private methods
  private _assertBounds(bitOffset: number, bitSize: number): void {
    if (bitOffset + bitSize > this._bitLength) {
      throw new RangeError('Offset is outside the bounds of the BitDataView');
    }
  }

  private _readBit(bitOffset: number): 0 | 1 {
    const realBitOffset = this._bitOffset + bitOffset;
    const realByteOffset = ~~(realBitOffset / 8);
    const byteBitOffset = realBitOffset % 8;
    return this._buffer[realByteOffset] & (1 << byteBitOffset) && 1;
  }

  private _writeBit(bitOffset: number, value: 0 | 1): void {
    const realBitOffset = this._bitOffset + bitOffset;
    const realByteOffset = ~~(realBitOffset / 8);
    const byteBitOffset = realBitOffset % 8;
    const mask = 1 << byteBitOffset;

    if (value) this._buffer[realByteOffset] |= mask;
    else this._buffer[realByteOffset] &= ~mask;
  }

  private _readByte(bitOffset: number): number {
    const realBitOffset = this._bitOffset + bitOffset;
    const realByteOffset = ~~(realBitOffset / 8);
    const byteBitOffset = realBitOffset % 8;
    const byte = this._buffer[realByteOffset];

    if (byteBitOffset === 0) return byte;

    const nextByte = this._buffer[realByteOffset + 1];
    return (
      (byte >>> byteBitOffset) +
      ((nextByte & (255 >>> (8 - byteBitOffset))) << (8 - byteBitOffset))
    );
  }

  private _writeByte(bitOffset: number, value: number): void {
    const realBitOffset = this._bitOffset + bitOffset;
    const realByteOffset = ~~(realBitOffset / 8);
    const byteBitOffset = realBitOffset % 8;

    if (byteBitOffset === 0) {
      this._buffer[realByteOffset] = value;
      return;
    }

    const byte = this._buffer[realByteOffset];
    const nextByte = this._buffer[realByteOffset + 1];

    this._buffer[realByteOffset] =
      ((value & (255 >>> (8 - byteBitOffset))) << byteBitOffset) +
      (byte & (255 >>> byteBitOffset));
    this._buffer[realByteOffset + 1] =
      ((nextByte >>> byteBitOffset) << byteBitOffset) +
      (value >>> (8 - byteBitOffset));
  }

  private _readBytes(bitOffset: number, byteLength: number): number[] {
    const bytes = new Array(byteLength);
    for (let i = 0; i < byteLength; i++) {
      bytes[i] = this._readByte(bitOffset + i * 8);
    }
    return bytes;
  }

  private _writeBytes(bitOffset: number, bytes: number[]): void {
    for (let i = 0; i < bytes.length; i++) {
      this._writeByte(bitOffset + i * 8, bytes[i]);
    }
  }

  /*_readBuffer(bitOffset, bitLength) {
    const byteLength = Math.ceil(bitLength/8)
    const realBitOffset = this._bitOffset + bitOffset
    const realByteOffset = ~~(realBitOffset / 8)
    const byteBitOffset = realBitOffset % 8

    if (byteBitOffset === 0) return this._buffer.slice(realByteOffset, realByteOffset+byteLength).buffer

    const data = new Uint8Array(byteLength)
    for (let i=0; i<byteLength; i++) {
      data[i] = this._readByte(bitOffset + i*8)
    }

    return data.buffer
  }*/
}
