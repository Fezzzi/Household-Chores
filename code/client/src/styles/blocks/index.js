import styled from 'styled-components';

export const ThemeWrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

export const PageWrapper = styled.section`
  background-color: var(--cThemeBack);
  color: var(--cFont);
  min-height: 100%;
  overflow: auto;
  display: flex;
  flex-direction: column;
  scrollbar-color: var(--cGreyPrimary) transparent;
  scrollbar-width: thin;
  
  > * div {
    scrollbar-width: thin;
  }
  
  > * img {
    user-select: none;
    object-fit: cover;
  }
  
  > * ::-webkit-scrollbar, ::-webkit-scrollbar {
    appearance: none;
    width: 4px;
    height: 4px;
  }
  
  > * ::-webkit-scrollbar-thumb, ::-webkit-scrollbar-thumb {
    appearance: none;
    background-color: var(--cGreyPrimary);
    border-radius: 5px;
  }
  
  > * input:-webkit-autofill {
    background-color: inherit;
  }
`;

export const PageContent = styled.main`
  order: 4;
  display: flex;
  flex-grow: 1;
`;

export const PortalAnchor = styled.div`
  height: 0;
  width: 100%;
  position: relative;
`;

export const PageFooter = styled.footer`
  order: 5;
  padding: 0 20px;
  background-color: var(--cThemeBack);
`;

export const FooterWrapper = styled.div`
  max-width: 1012px;
  padding: 10px 0;
  text-align: center;
  font-size: 12px;
  font-weight: 600;
  margin: 0 auto;
  text-transform: uppercase;
  width: 100%;
`;

export const CopyrightRow = styled.span`
  color: var(--cGreyPrimary);
`;
