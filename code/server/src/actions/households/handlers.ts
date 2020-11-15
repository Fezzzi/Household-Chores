import { HOUSEHOLD_DIR, uploadFiles } from "serverSrc/helpers/files.";
import { addHouseholdInvitations, createHousehold } from "serverSrc/database/models/households";
import * as NotificationTypes from "shared/constants/notificationTypes";
import {HOUSEHOLD_KEYS, PROFILE} from "shared/constants/settingsDataKeys";
import { ERROR } from "shared/constants/localeMessages";
import * as InputTypes from "shared/constants/inputTypes";
import { validateField } from "serverSrc/helpers/settings";

const validateCreateData = async (
  inputs: Record<string, string | number>,
  invitations: Array<Record<string, string | number>>,
  res: any
): Promise<boolean> => {
  if (!inputs[HOUSEHOLD_KEYS.NAME] || !inputs[HOUSEHOLD_KEYS.USER_NAME]
    || !inputs[HOUSEHOLD_KEYS.PHOTO] || !inputs[HOUSEHOLD_KEYS.USER_PHOTO]
  ) {
    return false;
  }

  if(!(validateField(res, inputs[HOUSEHOLD_KEYS.NAME], InputTypes.TEXT)
    && validateField(res, inputs[HOUSEHOLD_KEYS.USER_NAME], InputTypes.TEXT)
    && validateField(res, inputs[HOUSEHOLD_KEYS.PHOTO], InputTypes.PHOTO)
    && validateField(res, inputs[HOUSEHOLD_KEYS.USER_PHOTO], InputTypes.PHOTO)
  )){
    return false;
  }

  if (invitations.length > 0) {

  }

  return true;
}

export const handleCreateHousehold = async (
  inputs: Record<string, string | number>,
  invitations: Array<Record<string, string | number>>,
  userId: number,
  req: any,
  res: any,
): Promise<boolean> => {
  const valid = await validateCreateData(inputs, invitations, res);
  if (!valid) {
    res.status(200).send({ [NotificationTypes.ERRORS]: [ERROR.INVALID_DATA] });
    return true;
  }
  const [photo, userPhoto] = uploadFiles([
    inputs[HOUSEHOLD_KEYS.PHOTO] as any,
    inputs[HOUSEHOLD_KEYS.USER_PHOTO] as any,
  ], HOUSEHOLD_DIR, req.session!.fsKey);

  if (photo === null || userPhoto === null) {
    res.status(200).send({ [NotificationTypes.ERRORS]: [ERROR.UPLOADING_ERROR] });
    return true;
  }

  const householdId = await createHousehold({
    ...inputs,
    [HOUSEHOLD_KEYS.PHOTO]: photo,
    [HOUSEHOLD_KEYS.USER_PHOTO]: userPhoto,
  }, userId);

  if (householdId === null) {
    res.status(200).send({ [NotificationTypes.ERRORS]: [ERROR.ACTION_ERROR] });
    return true;
  }
  const success = await addHouseholdInvitations(householdId, invitations, userId);
  res.status(200).send(success
    ? { url: `/settings/households?tab=household-${householdId}` }
    : { [NotificationTypes.ERRORS]: [ERROR.ACTION_ERROR] });
  return true;
}
