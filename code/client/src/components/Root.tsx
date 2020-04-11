import React from 'react';

import { formatDateTime } from 'clientSrc/helpers/example';

export const Root = () =>
  <div>Household-chores at {formatDateTime(new Date())}</div>;
