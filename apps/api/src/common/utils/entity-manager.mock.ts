import { EntityManager } from 'typeorm';

export class MockEntityManager extends EntityManager {
  async query(query: string): Promise<any> {
    if (query === 'SELECT 1') {
      return Promise.resolve([{ result: 'mocked result' }]);
    }
    return Promise.reject(new Error('Unsupported query'));
  }
}
