import {
  CONNECTIONS_PREFIX, CONNECTION_FIND, CONNECTION_REQUEST, CONNECTION_APPROVE,
  CONNECTION_BLOCK, CONNECTION_IGNORE, CONNECTION_REMOVE, CONNECTION_UNBLOCK,
} from 'shared/constants/api';
import { clientApi } from 'clientSrc/client-api';

export const findUsers = query => clientApi.post(`${CONNECTIONS_PREFIX}/${CONNECTION_FIND}`, { query });
export const connectionRequest = data => clientApi.post(`${CONNECTIONS_PREFIX}/${CONNECTION_REQUEST}`, data);
export const connectionApprove = data => clientApi.post(`${CONNECTIONS_PREFIX}/${CONNECTION_APPROVE}`, data);
export const connectionBlock = data => clientApi.post(`${CONNECTIONS_PREFIX}/${CONNECTION_BLOCK}`, data);
export const connectionIgnore = data => clientApi.post(`${CONNECTIONS_PREFIX}/${CONNECTION_IGNORE}`, data);
export const connectionRemove = data => clientApi.post(`${CONNECTIONS_PREFIX}/${CONNECTION_REMOVE}`, data);
export const connectionUnblock = data => clientApi.post(`${CONNECTIONS_PREFIX}/${CONNECTION_UNBLOCK}`, data);
