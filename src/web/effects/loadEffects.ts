import { API, DEFAULT_FEED_PAGE_SIZE } from 'shared/constants'

import { apiClient } from '../apiClient'
import { FeedLoadPayload } from '../actions'

export const loadState = () =>
  apiClient.get(`${API.LOAD_PREFIX}/${API.LOAD_STATE}`)

export const loadFeed = (payload: FeedLoadPayload) =>
  apiClient.get(`${API.LOAD_PREFIX}/${API.LOAD_FEED}`, {
    params: {
      page: payload.page,
      pageSize: payload.pageSize ?? DEFAULT_FEED_PAGE_SIZE,
    },
  })
