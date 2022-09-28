import styled from '@emotion/styled';

import { Header } from '../components/Header';
import { Cta } from '../components/Cta';

const StyledPage = styled.div`
  .page {
  }
`;

export function Index() {
  /*
   * Replace the elements below with your own.
   *
   * Note: The corresponding styles are in the ./index.@emotion/styled file.
   */
  return (
    <StyledPage>
      <div className="wrapper">
        <div className="container">
          <Header />
          <Cta />
        </div>
      </div>
    </StyledPage>
  );
}

export default Index;
