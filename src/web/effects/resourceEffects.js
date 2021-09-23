import { API } from 'shared/constants'

import { apiClient } from '../apiClient'

export const loadResource = ({ resourceId, locale }) =>
  apiClient.get(`${API.RESOURCES_PREFIX}/${resourceId}`, { params: { locale } })
