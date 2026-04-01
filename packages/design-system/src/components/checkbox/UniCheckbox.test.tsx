import { fireEvent, render, screen } from '@testing-library/react';

import { UniCheckbox } from './UniCheckbox';
import { UniCheckboxGroup } from './UniCheckboxGroup';

describe('UniCheckbox', () => {
  it('renders label and toggles', () => {
    render(<UniCheckbox>Option</UniCheckbox>);
    const checkbox = screen.getByRole('checkbox', { name: /option/i });
    expect(checkbox).not.toBeChecked();
    fireEvent.click(checkbox);
    expect(checkbox).toBeChecked();
  });

  it('applies disabled styles', () => {
    render(
      <UniCheckbox disabled className="test-checkbox">
        Disabled
      </UniCheckbox>
    );
    expect(screen.getByText('Disabled').parentElement).toHaveClass('ant-checkbox-wrapper-disabled');
  });
});

describe('UniCheckboxGroup', () => {
  it('renders options', () => {
    render(<UniCheckboxGroup options={['One', 'Two']} defaultValue={['Two']} />);
    expect(screen.getByRole('checkbox', { name: 'One' })).not.toBeChecked();
    expect(screen.getByRole('checkbox', { name: 'Two' })).toBeChecked();
  });
});
