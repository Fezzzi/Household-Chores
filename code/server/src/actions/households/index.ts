import express from 'express';

import {
  approveInvitation, deleteInvitation, findUserHouseholds, findUserInvitations,
} from 'serverSrc/database/models/households';
import {
  HOUSEHOLD_CREATE, INVITATION_APPROVE, INVITATION_IGNORE,
} from 'shared/constants/api';
import * as NotificationTypes from 'shared/constants/notificationTypes';
import { ERROR } from 'shared/constants/localeMessages';

import { handleCreateHousehold } from "./handlers";

export default () => {
  const router = express.Router();
  router.post('/:action', async (req, res) => {
    const { params: { action }, body } = req;
    const userId = req.session!.user;
    switch (action) {
      case HOUSEHOLD_CREATE: {
        return handleCreateHousehold(body.inputs, body.invitations, userId, req, res);
      }
      case INVITATION_APPROVE: {
        // todo: Use transaction there
        const success = await deleteInvitation(userId, body) && await approveInvitation(userId, body);
        if (success) {
          res.status(200).send({
            invitations: await findUserInvitations(userId),
            households: await findUserHouseholds(userId),
          });
        } else {
          res.status(200).send({ [NotificationTypes.ERRORS]: [ERROR.ACTION_ERROR] });
        }
        return true;
      }
      case INVITATION_IGNORE: {
        const success = await deleteInvitation(userId, body);
        if (success) {
          res.status(200).send(body);
        } else {
          res.status(200).send({ [NotificationTypes.ERRORS]: [ERROR.ACTION_ERROR] });
        }
        return true;
      }
      default:
        res.status(404).send('Not Found');
        return false;
    }
  });

  return router;
};
