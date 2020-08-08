import { RESOURCES_PREFIX } from 'shared/constants/api';
import { clientApi } from 'clientSrc/client-api';

export const loadResource = ({ resourceId, localeData }) =>
  clientApi.get(`${RESOURCES_PREFIX}/${resourceId}`, { params: localeData });
