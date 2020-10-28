import express from 'express';

import {
  approveInvitation, ignoreInvitation, findUserHouseholds,
} from 'serverSrc/database/models/households';
import {
  INVITATION_APPROVE, INVITATION_IGNORE,
} from 'shared/constants/api';

const respond = (res: any, status = 200, success = true, data: any = {}): boolean => {
  res.status(status).send({ success, data });
  return true;
};

export default () => {
  const router = express.Router();
  router.post('/:action', (req, res) => {
    const { params: { action }, body } = req;
    const userId = req.session!.user;
    switch (action) {
      case INVITATION_APPROVE:
        return ignoreInvitation(userId, body)
          && approveInvitation(userId, body)
          && respond(res, 200, true, findUserHouseholds(userId));
      case INVITATION_IGNORE:
        return ignoreInvitation(userId, body) && respond(res);
      default:
        res.status(404).send('Not Found');
        return false;
    }
  });

  return router;
};
