import { type SetupServerApi, setupServer } from 'msw/node';
import { handlers } from '@/test/msw/handlers';

export const server: SetupServerApi = setupServer(...handlers);
