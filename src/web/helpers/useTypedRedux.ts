import {
  TypedUseSelectorHook,
  useSelector as useBaseSelector,
} from 'react-redux'

import { RootState } from 'web/reducers/rootReducer'

export const useSelector: TypedUseSelectorHook<RootState> = useBaseSelector
