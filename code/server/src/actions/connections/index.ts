import express from 'express';

import { queryUsers } from 'serverSrc/database/models/users';
import {
  approveConnection, createConnection, blockConnection, removeConnection, findBlockedConnections,
} from 'serverSrc/database/models/connections';
import {
  CONNECTION_FIND, CONNECTION_REQUEST, CONNECTION_APPROVE,
  CONNECTION_BLOCK, CONNECTION_IGNORE, CONNECTION_REMOVE, CONNECTION_UNBLOCK,
} from 'shared/constants/api';
import * as CONNECTION_STATE_TYPE from 'shared/constants/connectionStateType';

const findUsers = async (req: any, res: any, { query }: { query: string }) => {
  const foundUsers = await queryUsers(query, req.session.user);
  res.status(200).send({ [CONNECTION_STATE_TYPE.FOUND]: foundUsers });
  return true;
};

const performConnectionAction = async (
  req: any,
  res: any,
  { id }: { id: number },
  action: (currentUser: number, targetUser: number) => Promise<boolean>
) => {
  const success = await action(req.session.user, id);
  res.status(200).send({ success });
  return true;
};

const handleConnectionRequest = async (
  req: any,
  res: any,
  { id, message }: { id: number; message: string | null },
) => {
  const currentUser = req.session.user;
  const isRequestValid = !(await findBlockedConnections(id)).find(blockedUser => blockedUser === currentUser);
  let success = false;
  if (isRequestValid) {
    success = await createConnection(currentUser, id, message || null);
  }
  res.status(200).send({ success });
  return true;
};

export default () => {
  const router = express.Router();
  router.post('/:action', (req, res) => {
    const { params: { action }, body } = req;
    switch (action) {
      case CONNECTION_FIND:
        return findUsers(req, res, body);
      case CONNECTION_REQUEST:
        return handleConnectionRequest(req, res, body);
      case CONNECTION_APPROVE:
        return performConnectionAction(req, res, body, approveConnection);
      case CONNECTION_BLOCK:
        return performConnectionAction(req, res, body, blockConnection);
      case CONNECTION_IGNORE:
        return performConnectionAction(req, res, body, removeConnection);
      case CONNECTION_REMOVE:
        return performConnectionAction(req, res, body, removeConnection);
      case CONNECTION_UNBLOCK:
        return performConnectionAction(req, res, body, removeConnection);
      default:
        res.status(404).send('Not Found');
        return false;
    }
  });

  return router;
};
