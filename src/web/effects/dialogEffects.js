import { API } from 'shared/constants'

import { apiClient } from '../apiClient'

export const disableDialog = dialog =>
  apiClient.put(`${API.DIALOGS_PREFIX}/${API.DIALOGS_DISABLE}`, { key: dialog })
