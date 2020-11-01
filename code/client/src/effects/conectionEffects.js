import { clientApi } from 'clientSrc/client-api';
import {
  CONNECTIONS_PREFIX, CONNECTION_FIND, CONNECTION_REQUEST, CONNECTION_APPROVE,
  CONNECTION_BLOCK, CONNECTION_IGNORE, CONNECTION_REMOVE, CONNECTION_UNBLOCK,
} from 'shared/constants/api';

export const findUsers = query =>
  clientApi.post(`${CONNECTIONS_PREFIX}/${CONNECTION_FIND}`, { query });

export const connectionRequest = data =>
  clientApi.post(`${CONNECTIONS_PREFIX}/${CONNECTION_REQUEST}`, data);

export const connectionApprove = targetId =>
  clientApi.post(`${CONNECTIONS_PREFIX}/${CONNECTION_APPROVE}`, { targetId });

export const connectionBlock = targetId =>
  clientApi.post(`${CONNECTIONS_PREFIX}/${CONNECTION_BLOCK}`, { targetId });

export const connectionIgnore = targetId =>
  clientApi.post(`${CONNECTIONS_PREFIX}/${CONNECTION_IGNORE}`, { targetId });

export const connectionRemove = targetId =>
  clientApi.post(`${CONNECTIONS_PREFIX}/${CONNECTION_REMOVE}`, { targetId });

export const connectionUnblock = targetId =>
  clientApi.post(`${CONNECTIONS_PREFIX}/${CONNECTION_UNBLOCK}`, { targetId });
