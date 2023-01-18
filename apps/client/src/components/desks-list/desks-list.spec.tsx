import { render } from '@testing-library/react';

import DesksList from './desks-list';

describe('DesksList', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<DesksList />);
    expect(baseElement).toBeTruthy();
  });
});
