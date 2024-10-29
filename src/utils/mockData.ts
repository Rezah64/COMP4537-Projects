export const mockUserStats = [
  {
    email: 'john@john.com',
    apiCalls: 15,
    lastActive: new Date().toISOString(),
  },
  {
    email: 'test@test.com',
    apiCalls: 8,
    lastActive: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    email: 'alice@example.com',
    apiCalls: 20,
    lastActive: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    email: 'bob@example.com',
    apiCalls: 3,
    lastActive: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
  },
];