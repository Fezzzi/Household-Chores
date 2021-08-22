import { API } from 'shared/constants'
import { apiClient } from 'clientSrc/apiClient'

export const disableDialog = dialog =>
  apiClient.put(`${API.DIALOGS_PREFIX}/${API.DIALOGS_DISABLE}`, { key: dialog })
