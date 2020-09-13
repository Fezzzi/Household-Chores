import { renderFormFromConfig } from 'clientSrc/helpers/settings';

import { settingsConfiguration } from './settingsConfiguration';

export const settingsRenderers =
  Object.fromEntries(
    Object.keys(settingsConfiguration).map(category =>
      [category, Object.fromEntries(
        Object.keys(settingsConfiguration[category]).map(tab =>
          [tab, renderFormFromConfig(category, tab, settingsConfiguration[category][tab])]
        )
      )]
    )
  );
