import {
  HOUSEHOLD_CREATE, HOUSEHOLDS_PREFIX, INVITATION_APPROVE, INVITATION_IGNORE,
} from 'shared/constants/api';
import { clientApi } from 'clientSrc/client-api';

export const invitationApprove = data => clientApi.post(`${HOUSEHOLDS_PREFIX}/${INVITATION_APPROVE}`, data);
export const invitationIgnore = data => clientApi.post(`${HOUSEHOLDS_PREFIX}/${INVITATION_IGNORE}`, data);
export const createHousehold = data => clientApi.post(`${HOUSEHOLDS_PREFIX}/${HOUSEHOLD_CREATE}`, data);
