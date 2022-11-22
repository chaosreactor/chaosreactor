import { render } from '@testing-library/react';

import PasswordInput from './password-input';

describe('PasswordInput', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<PasswordInput />);
    expect(baseElement).toBeTruthy();
  });
});
