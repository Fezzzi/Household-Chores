import * as SettingTypes from 'shared/constants/settingTypes';

import { getCategoryList, getTabList, validateNotificationData, validateProfileData } from 'serverSrc/helpers/settings';
import { PROFILE_DIR, uploadFiles } from 'serverSrc/helpers/files.';
import { findProfileData, updateUserData } from 'serverSrc/database/models/users';
import { findApprovedConnections, findConnections } from 'serverSrc/database/models/connections';
import { findUserHouseholds, findUserInvitations } from 'serverSrc/database/models/households';
import { CATEGORIES, TABS } from 'shared/constants/settingTypes';
import * as NotificationTypes from 'shared/constants/notificationTypes';
import { ERROR } from 'shared/constants/localeMessages';
import { PROFILE } from 'shared/constants/settingsDataKeys';

const getTabData = async (category: string, tab: string, req: any) => {
  switch (category) {
    case SettingTypes.CATEGORIES.PROFILE:
      return await findProfileData(req.session.user);
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
  const { categories, messages: categoryMessages, types: categoryTypes } = getCategoryList(data);
  const { tabs, messages: tabMessages, types: tabTypes } = getTabList(data, category);
  res.status(200).send({
    categories,
    tabs,
    data,
    messages: {
      ...categoryMessages,
      ...tabMessages,
    },
    categoryTypes,
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
          return await updateUserData(inputs, req.session.user);
        }
        const [photo] = uploadFiles([inputs[PROFILE.PHOTO] as any], PROFILE_DIR, req.session.fsKey);
        if (photo === null) {
          res.status(200).send({ [NotificationTypes.ERRORS]: [ERROR.UPLOADING_ERROR] });
          return true;
        }
        return await updateUserData({ ...inputs, [PROFILE.PHOTO]: photo }, req.session.user);
      } else if (TABS.NOTIFICATIONS) {
        return await validateNotificationData(inputs, req, res);
      }
    case CATEGORIES.CONNECTIONS:
    case CATEGORIES.HOUSEHOLDS:
    default:
      res.status(200).send({ [NotificationTypes.ERRORS]: [ERROR.INVALID_REQUEST] });
      return false;
  }
};
