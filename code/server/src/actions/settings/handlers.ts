import * as SettingTypes from 'shared/constants/settingTypes';

import { getTabList, validateNotificationData, validateProfileData } from 'serverSrc/helpers/settings';
import { PROFILE_DIR, uploadFiles } from 'serverSrc/helpers/files.';
import { findProfileData, updateUserData } from 'serverSrc/database/models/users';
import { findApprovedConnections, findConnections } from 'serverSrc/database/models/connections';
import { findUserHouseholds, findUserInvitations } from 'serverSrc/database/models/households';
import { findNotificationSettings, updateNotificationSettings } from 'serverSrc/database/models/notifications';
import { CATEGORIES, TABS } from 'shared/constants/settingTypes';
import * as NotificationTypes from 'shared/constants/notificationTypes';
import { ERROR } from 'shared/constants/localeMessages';
import { PROFILE } from 'shared/constants/settingsDataKeys';

const getTabData = async (category: string, tab: string, req: any) => {
  switch (category) {
    case SettingTypes.CATEGORIES.PROFILE:
      if (tab === TABS.NOTIFICATIONS) {
        return findNotificationSettings(req.session.user);
      }
      return findProfileData(req.session.user);
    case SettingTypes.CATEGORIES.HOUSEHOLDS:
      return {
        invitations: await findUserInvitations(req.session.user),
        households: await findUserHouseholds(req.session.user),
        connections: await findApprovedConnections(req.session.user),
      };
    case SettingTypes.CATEGORIES.CONNECTIONS:
      return findConnections(req.session.user);
    default:
      return {};
  }
};

export const handleSettingsDataFetch = async (category: string, tab: string, req: any, res: any): Promise<void> => {
  const data = await getTabData(category, tab, req);
  if (!data) {
    res.status(200).send({ [NotificationTypes.ERRORS]: [ERROR.CONNECTION_REQUEST_ERROR] });
    return;
  }
  const { tabs, messages: tabMessages, types: tabTypes } = getTabList(data, category);
  res.status(200).send({
    tabs,
    data,
    tabMessages,
    tabTypes,
  });
};

export const handleSettingsDataUpdate = async (
  category: string, tab: string, inputs: Record<string, string | number>, req: any, res: any
): Promise<boolean> => {
  switch (category) {
    case CATEGORIES.PROFILE:
      if (tab === TABS.GENERAL) {
        const valid = await validateProfileData(inputs, req, res);
        if (!valid) {
          return true;
        }
        if (!inputs[PROFILE.PHOTO]) {
          return updateUserData(inputs, req.session.user);
        }
        const [photo] = uploadFiles([inputs[PROFILE.PHOTO] as any], PROFILE_DIR, req.session.fsKey);
        if (photo === null) {
          res.status(200).send({ [NotificationTypes.ERRORS]: [ERROR.UPLOADING_ERROR] });
          return true;
        }
        return updateUserData({ ...inputs, [PROFILE.PHOTO]: photo }, req.session.user);
      } else if (TABS.NOTIFICATIONS) {
        const valid = validateNotificationData(inputs, req, res);
        if (!valid) {
          return true;
        }
        return updateNotificationSettings(inputs, req.session.user);
      }
    default:
      res.status(200).send({ [NotificationTypes.ERRORS]: [ERROR.INVALID_REQUEST] });
      return false;
  }
};
