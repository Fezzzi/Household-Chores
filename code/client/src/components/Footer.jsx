import React from 'react';

import { PageFooter, FooterWrapper, CopyrightRow } from 'clientSrc/styles/blocks/footer';
import ThemeSwitch from 'clientSrc/components/navbar/ThemeSwitch';
import LocaleSwitch from 'clientSrc/components/navbar/LocaleSwitch';

export default () => (
  <PageFooter>
    <FooterWrapper>
      <CopyrightRow>
        © 2020 ...
      </CopyrightRow>
      <ThemeSwitch />
      <LocaleSwitch />
    </FooterWrapper>
  </PageFooter>
);
