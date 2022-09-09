import styled from 'styled-components';

import { DocList } from '../components/DocList';

const StyledPage = styled.div`
  .page {
  }
`;

export function Index(pageProps) {
  /*
   * Replace the elements below with your own.
   *
   * Note: The corresponding styles are in the ./index.styled-components file.
   */
  return (
    <StyledPage {...pageProps}>
      <DocList {...pageProps} />
    </StyledPage>
  );
}

export default Index;
