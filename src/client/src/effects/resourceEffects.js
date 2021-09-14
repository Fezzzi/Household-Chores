import { API } from 'shared/constants'
import { apiClient } from 'clientSrc/apiClient'

export const loadResource = ({ resourceId, locale }) =>
  apiClient.get(`${API.RESOURCES_PREFIX}/${resourceId}`, { params: { locale } })
