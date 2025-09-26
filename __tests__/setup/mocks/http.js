// Mock for node-mocks-http
export const createMocks = (reqOptions = {}, resOptions = {}) => {
  const mockReq = {
    method: 'GET',
    url: '/',
    headers: {},
    body: {},
    query: {},
    params: {},
    ...reqOptions,
  };

  const mockRes = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis(),
    send: jest.fn().mockReturnThis(),
    end: jest.fn().mockReturnThis(),
    setHeader: jest.fn().mockReturnThis(),
    getHeader: jest.fn(),
    ...resOptions,
  };

  return { req: mockReq, res: mockRes };
};
