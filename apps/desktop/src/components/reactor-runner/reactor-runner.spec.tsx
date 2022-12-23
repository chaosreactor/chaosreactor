import { render } from '@testing-library/react';

import ReactorRunner from './reactor-runner';

describe('ReactorRunner', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ReactorRunner />);
    expect(baseElement).toBeTruthy();
  });
});
