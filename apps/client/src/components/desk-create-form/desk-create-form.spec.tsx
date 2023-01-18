import { render } from '@testing-library/react';

import DeskCreateForm from './desk-create-form';

describe('DeskCreateForm', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <DeskCreateForm
        onClose={() => {
          return;
        }}
      />
    );
    expect(baseElement).toBeTruthy();
  });
});
