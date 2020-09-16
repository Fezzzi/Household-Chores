import React from 'react';

import { SettingsForm } from 'clientSrc/components/settings/SettingsForm';
import { settingsConfiguration } from './settingsConfiguration';

const renderFormFromConfig = (category, tab, settings) => data =>
  <SettingsForm category={category} tab={tab} settings={settings} data={data} />;

export const settingsRenderers
  = Object.fromEntries(
    Object.keys(settingsConfiguration).map(category =>
      [category, Object.fromEntries(
        Object.keys(settingsConfiguration[category]).map(tab =>
          [tab, renderFormFromConfig(category, tab, settingsConfiguration[category][tab])]
        )
      )]
    )
  );
