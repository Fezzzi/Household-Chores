import { findUser, isCorrectPassword } from 'serverSrc/database/models/users';
import HOUSEHOLDS_TABLE from 'serverSrc/database/models/tables/households';
import NOTIFICATION_SETTINGS_TABLE from 'serverSrc/database/models/tables/notification_settings';
import * as SettingTypes from 'shared/constants/settingTypes';
import * as InputTypes from 'shared/constants/inputTypes';
import * as NotificationTypes from 'shared/constants/notificationTypes';
import { CATEGORIES, TABS } from 'shared/constants/settingTypes';
import { PROFILE } from 'shared/constants/settingsDataKeys';
import { isInputValid } from 'shared/helpers/validation';
import { ERROR, INFO } from 'shared/constants/localeMessages';
import USER_VISIBILITY_TYPE from 'shared/constants/userVisibilityType';

export const getTabList = (data: any, category: string): { tabs: string[]; messages: object; types: object } => {
  switch (category) {
    case CATEGORIES.HOUSEHOLDS: return {
      tabs: [
        ...SettingTypes.TAB_ROWS[category],
        ...data.households.map((household: any) => household.key),
      ],
      messages: Object.fromEntries(
        data.households.map((household: any) => [
          household.key,
          household[HOUSEHOLDS_TABLE.columns.name],
        ]),
      ),
      types: Object.fromEntries(
        data.households.map((household: any) => [
          household.key,
          TABS._HOUSEHOLD,
        ]),
      ),
    };
    default: return { tabs: SettingTypes.TAB_ROWS[category], messages: {}, types: {} };
  }
};

export const validateField = (res: any, field: string | number | undefined, type: string, constraints?: any): boolean => {
  if (field !== undefined) {
    const validity = isInputValid(type, field, constraints);
    if (!validity.valid) {
      res.status(200).send({ [NotificationTypes.ERRORS]: [validity.message || ERROR.INVALID_DATA] });
      return false;
    }
  }
  return true;
};

export const validateProfileData = async (
  inputs: Record<string, string | number>,
  req: any,
  res: any
): Promise<boolean> => {
  const update = inputs[PROFILE.NAME] !== undefined
    || inputs[PROFILE.EMAIL] !== undefined
    || (inputs[PROFILE.OLD_PASSWORD] !== undefined && inputs[PROFILE.NEW_PASSWORD] !== undefined)
    || inputs[PROFILE.PHOTO] !== undefined
    || inputs[PROFILE.CONNECTION_VISIBILITY] !== undefined;

  if (!update) {
    res.status(200).send({ [NotificationTypes.ERRORS]: [INFO.NOTHING_TO_UPDATE] });
    return false;
  }

  const valid = validateField(res, inputs[PROFILE.NAME], InputTypes.TEXT)
    && validateField(res, inputs[PROFILE.PHOTO], InputTypes.PHOTO)
    && validateField(res, inputs[PROFILE.EMAIL], InputTypes.EMAIL)
    && validateField(res, inputs[PROFILE.OLD_PASSWORD], InputTypes.PASSWORD)
    && validateField(res, inputs[PROFILE.NEW_PASSWORD], InputTypes.PASSWORD)
    && validateField(res, inputs[PROFILE.CONNECTION_VISIBILITY], InputTypes.SWITCH, [
      USER_VISIBILITY_TYPE.ALL, USER_VISIBILITY_TYPE.FOF,
    ]);

  if (!valid) {
    res.status(200).send({ [NotificationTypes.ERRORS]: [ERROR.INVALID_DATA] });
    return false;
  }

  if (inputs[PROFILE.EMAIL] !== undefined && await findUser(inputs[PROFILE.EMAIL] as string) !== null) {
    res.status(200).send({ [NotificationTypes.ERRORS]: [ERROR.EMAIL_USED] });
    return false;
  }

  if (inputs[PROFILE.OLD_PASSWORD] && !await isCorrectPassword(inputs[PROFILE.OLD_PASSWORD] as string, req.session.user)) {
    res.status(200).send({ [NotificationTypes.ERRORS]: [ERROR.INCORRECT_PASS] });
    return false;
  }

  return true;
};

export const validateNotificationData = (
  inputs: Record<string, string | number>,
  req: any,
  res: any
): boolean => {
  const inputKeys = Object.keys(inputs);
  if (inputKeys.length === 0) {
    res.status(200).send({ [NotificationTypes.ERRORS]: [INFO.NOTHING_TO_UPDATE] });
    return false;
  }

  if (!inputKeys.every(input =>
    NOTIFICATION_SETTINGS_TABLE.columns[input as keyof typeof NOTIFICATION_SETTINGS_TABLE.columns] !== undefined
  ) && inputs[NOTIFICATION_SETTINGS_TABLE.columns.id_user] === undefined
  ) {
    res.status(200).send({ [NotificationTypes.ERRORS]: [ERROR.INVALID_DATA] });
    return false;
  }
  return true;
};
