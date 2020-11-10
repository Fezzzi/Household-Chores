import { SETTINGS_PREFIX } from 'shared/constants/api';
import { clientApi } from 'clientSrc/client-api';

export const loadSettings = (category, tab) =>
  clientApi.get(SETTINGS_PREFIX, { params: { category, tab } });

export const updateSettings = (category, tab, inputs) =>
  clientApi.post(SETTINGS_PREFIX, { category, tab, inputs });
