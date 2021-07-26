# BitDataView

With BitDataView you can parse ArrayBuffer.

Inspired by JavaScripts [DataView](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DataView) API.  

---
## Install
###### Using npm
```
npm install bit-data-view
```
###### Using yarn
```
yarn add bit-data-view
```

---
## API
#### Constructor
BitDataView(buffer: ArrayBuffer, bitOffset?: number, bitLength?: number)  
> Creates a new BitDataView object

#### Instance properties
- buffer  
> The ArrayBuffer referenced by this view. Fixed at construction time and thus **read only**.

- bitOffset  
> The offset (in bits) of this view from the start of its ArrayBuffer. Fixed at construction time and thus **read only**.

- bitLength  
> The length (in bits) of this view from the start of its ArrayBuffer. Fixed at construction time and thus **read only**.

#### Instance methods
- getBit(bitOffset: number)
> Gets a bit integer at the specified bit offset from the start of the view.

- setBit(bitOffset: number, value: 0 | 1)
> Stores a bit integer value at the specified bit offset from the start of the view.

- getUint8(bitOffset: number)
> Gets a unsigned 8bit integer at the specified bit offset from the start of the view.

- setUint8(bitOffset: number, value: number)
> Stores a unsigned 8bit integer value at the specified bit offset from the start of the view.

- getInt8(bitOffset: number)
> Gets a signed 8bit integer at the specified bit offset from the start of the view.

- setInt8(bitOffset: number, value: number)
> Stores a signed 8bit integer value at the specified bit offset from the start of the view.

- getUint16(bitOffset: number, littleEndian = false)
> Gets a unsigned 16bit integer at the specified bit offset from the start of the view.

- setUint16(bitOffset: number,
    value: number,
    littleEndian = false)
> Stores a unsigned 16bit integer value at the specified bit offset from the start of the view.

- getInt16(bitOffset: number, littleEndian = false)
> Gets a signed 16bit integer at the specified bit offset from the start of the view.

- setInt16(bitOffset: number,
    value: number,
    littleEndian = false)
> Stores a signed 16bit integer value at the specified bit offset from the start of the view.

- getUint32(bitOffset: number, littleEndian = false)
> Gets a unsigned 32bit integer at the specified bit offset from the start of the view.

- setUint32(bitOffset: number,
    value: number,
    littleEndian = false)
> Stores a unsigned 32bit integer value at the specified bit offset from the start of the view.

- getInt32(bitOffset: number, littleEndian = false)
> Gets a signed 32bit integer at the specified bit offset from the start of the view.

- setInt32(bitOffset: number,
    value: number,
    littleEndian = false)
> Stores a signed 32bit integer value at the specified bit offset from the start of the view.

- getBigUint64(bitOffset: number, littleEndian = false)
> Gets a unsigned 64bit integer at the specified bit offset from the start of the view.

- setBigUint64(bitOffset: number,
    value: number,
    littleEndian = false)
> Stores a unsigned 64bit integer value at the specified bit offset from the start of the view.

- getBigInt64(bitOffset: number, littleEndian = false)
> Gets a signed 64bit integer at the specified bit offset from the start of the view.

- setBigInt64(bitOffset: number,
    value: number,
    littleEndian = false)
> Stores a signed 64bit integer value at the specified bit offset from the start of the view.

- getFloat32(bitOffset: number, littleEndian = false)
> Gets a signed 32bit float at the specified bit offset from the start of the view.

- setFloat32(bitOffset: number,
    value: number,
    littleEndian = false)
> Stores a signed 32bit float value at the specified bit offset from the start of the view.

- getFloat64(bitOffset: number, littleEndian = false)
> Gets a signed 64bit float at the specified bit offset from the start of the view.

- setFloat64(bitOffset: number,
    value: number,
    littleEndian = false)
> Stores a signed 64bit float value at the specified bit offset from the start of the view.

---
## Progress
| Function             | Implemented | Tested  |
| :------------------- | :---------- | :------ |
| constructor          | 100%        | 100%    |
| *buffer (getter)*    | 100%        | 100%    |
| *bitOffset (getter)* | 100%        | 100%    |
| *bitLength (getter)* | 100%        | 100%    |
| getBit               | 100%        | 100%    |
| setBit               | 100%        | 100%    |
| getUint8             | 100%        | 100%    |
| setUint8             | 100%        | 100%    |
| getInt8              | 100%        | 100%    |
| setInt8              | 100%        | 100%    |
| getUint16            | 100%        | 100%    |
| setUint16            | 0%          | 0%      |
| getInt16             | 100%        | 0%      |
| setInt16             | 0%          | 0%      |
| getUint32            | 100%        | 0%      |
| setUint32            | 0%          | 0%      |
| getInt32             | 100%        | 0%      |
| setInt32             | 0%          | 0%      |
| getBigUint64         | 100%        | 0%      |
| setBigUint64         | 0%          | 0%      |
| getBigInt64          | 0%          | 0%      |
| setBigInt64          | 0%          | 0%      |
| getFloat32           | 100%        | 0%      |
| setFloat32           | 100%        | 0%      |
| getFloat64           | 0%          | 0%      |
| setFloat64           | 0%          | 0%      |