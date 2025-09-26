// Mock for bson
module.exports = {
  BSON: {},
  BSONError: Error,
  BSONOffsetError: Error,
  BSONRegExp: RegExp,
  BSONRuntimeError: Error,
  BSONSymbol: Symbol,
  BSONType: Object,
  BSONValue: Object,
  BSONVersionError: Error,
  Binary: class Binary {},
  Code: class Code {},
  DBRef: class DBRef {},
  Decimal128: class Decimal128 {},
  Double: class Double {},
  EJSON: {},
  Int32: class Int32 {},
  Long: class Long {},
  MaxKey: class MaxKey {},
  MinKey: class MinKey {},
  ObjectId: class ObjectId {
    constructor(id) {
      this.id = id || 'mock-object-id';
    }
    toString() {
      return this.id;
    }
  },
  Timestamp: class Timestamp {},
  UUID: class UUID {},
  calculateObjectSize: jest.fn(),
  deserialize: jest.fn(),
  deserializeStream: jest.fn(),
  onDemand: jest.fn(),
  serialize: jest.fn(),
  serializeWithBufferAndIndex: jest.fn(),
  setInternalBufferSize: jest.fn(),
};
