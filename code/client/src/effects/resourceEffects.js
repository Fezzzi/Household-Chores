import { API } from 'shared/constants'
import { clientApi } from 'clientSrc/client-api'

export const loadResource = ({ resourceId, localeData }) =>
  clientApi.get(`${API.RESOURCES_PREFIX}/${resourceId}`, { params: localeData })
