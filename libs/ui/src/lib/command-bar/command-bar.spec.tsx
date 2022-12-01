import { render } from '@testing-library/react';

import CommandBar from './command-bar';

describe('CommandBar', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CommandBar />);
    expect(baseElement).toBeTruthy();
  });
});
