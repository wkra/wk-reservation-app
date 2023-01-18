import { render } from '@testing-library/react';
import DesksListItem from './desks-list-item';

describe('DesksListItem', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <DesksListItem id={1} name="name" description="description" />
    );
    expect(baseElement).toBeTruthy();
  });
});
