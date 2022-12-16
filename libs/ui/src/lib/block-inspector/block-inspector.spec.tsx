import { render } from '@testing-library/react';

import BlockInspector from './block-inspector';

describe('BlockInspector', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<BlockInspector />);
    expect(baseElement).toBeTruthy();
  });
});
