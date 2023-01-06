import { render } from '@testing-library/react';

import SettingsDrawer from './settings-drawer';

describe('SettingsDrawer', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SettingsDrawer />);
    expect(baseElement).toBeTruthy();
  });
});
