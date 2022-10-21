import { render } from '@testing-library/react';

import Canvas from './canvas';

describe('Canvas', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Canvas />);
    expect(baseElement).toBeTruthy();
  });
});
