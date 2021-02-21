import { API } from 'shared/constants'
import { clientApi } from 'clientSrc/client-api'

export const loadResource = ({ resourceId, locale }) =>
  clientApi.get(`${API.RESOURCES_PREFIX}/${resourceId}`, { params: { locale } })
