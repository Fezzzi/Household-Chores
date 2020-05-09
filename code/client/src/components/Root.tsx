import React from 'react';

import { formatDateTime } from 'clientSrc/helpers/example';
import { Test } from './Test';

export const Root = () => (
    <>
        <div>Household-chores at {formatDateTime(new Date())}</div>
        <Test />
    </>
);
