import styled from 'styled-components';

export const PageWrapper = styled.section`
  background-color: var(--cThemeBack);
  color: var(--cFont);
  min-height: 100%;
  overflow: auto;
  display: flex;
  flex-direction: column;
`;

export const PageContent = styled.main`
  order: 4;
  display: flex;
  flex-grow: 1;
`;
