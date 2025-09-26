// Mock for mongoose
const mockSchema = {
  add: jest.fn(),
  pre: jest.fn(),
  post: jest.fn(),
  methods: {},
  statics: {},
  virtual: jest.fn(),
  index: jest.fn(),
  plugin: jest.fn(),
};

const mockModel = jest.fn(() => ({
  find: jest.fn(),
  findOne: jest.fn(),
  findById: jest.fn(),
  create: jest.fn(),
  save: jest.fn(),
  updateOne: jest.fn(),
  updateMany: jest.fn(),
  deleteOne: jest.fn(),
  deleteMany: jest.fn(),
  aggregate: jest.fn(),
  countDocuments: jest.fn(),
  distinct: jest.fn(),
}));

const mockConnection = {
  readyState: 1,
  close: jest.fn(),
  on: jest.fn(),
  once: jest.fn(),
};

module.exports = {
  Schema: jest.fn(() => mockSchema),
  model: mockModel,
  connect: jest.fn(() => Promise.resolve(mockConnection)),
  connection: mockConnection,
  disconnect: jest.fn(() => Promise.resolve()),
  Types: {
    ObjectId: jest.fn(),
  },
  default: {
    Schema: jest.fn(() => mockSchema),
    model: mockModel,
    connect: jest.fn(() => Promise.resolve(mockConnection)),
    connection: mockConnection,
    disconnect: jest.fn(() => Promise.resolve()),
    Types: {
      ObjectId: jest.fn(),
    },
  },
};
