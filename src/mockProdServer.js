import { createProdMockServer } from 'vite-plugin-mock/es/createProdMockServer';
import authMock from '../mock/auth';
import userMock from '../mock/user';

export function setupProdMockServer() {
  createProdMockServer([...authMock, ...userMock]);
}
