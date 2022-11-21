import { render } from '@testing-library/react';

import Playfield from './playfield';

describe('Playfield', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Playfield />);
    expect(baseElement).toBeTruthy();
  });
});
