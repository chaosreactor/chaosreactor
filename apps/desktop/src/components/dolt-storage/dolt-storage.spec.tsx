import { render } from '@testing-library/react';

import DoltStorage from './dolt-storage';

describe('DoltStorage', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<DoltStorage />);
    expect(baseElement).toBeTruthy();
  });
});
