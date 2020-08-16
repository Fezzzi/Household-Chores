import React, { Fragment } from 'react';

import { Separator } from 'clientSrc/components/forms/Separator';

export const renderFormFromConfig = settings => (
  <>
    {settings.map((group, groupKey) => (
      <Fragment key={groupKey}>
        {groupKey !== 0
          ? <Separator />
          : ''
        }
        {group.map((config, configKey) => (
          <div key={`${groupKey}-${configKey}`}>
            lalalal
          </div>
        ))}
      </Fragment>
    ))}
  </>
);
