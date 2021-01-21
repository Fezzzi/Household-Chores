import { API } from 'shared/constants'
import { clientApi } from 'clientSrc/client-api'

export const disableDialog = dialog => clientApi.post(`${API.DIALOGS_PREFIX}/${API.DIALOGS_DISABLE}`, { key: dialog })
