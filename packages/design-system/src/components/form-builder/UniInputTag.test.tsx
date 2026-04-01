import { fireEvent, render, screen } from '@testing-library/react';
import { useState } from 'react';

import { UniInputTag } from './UniInputTag';

const Wrapper = () => {
  const [value, setValue] = useState(['Initial']);
  return <UniInputTag value={value} onChange={setValue} />;
};

describe('UniInputTag', () => {
  it('allows adding and removing tags', () => {
    render(<Wrapper />);

    expect(screen.getByText('Initial')).toBeInTheDocument();

    fireEvent.click(screen.getByText('New Tag'));
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'New Value' } });
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });
    expect(screen.getByText('New Value')).toBeInTheDocument();

    const closeButtons = document.querySelectorAll('.ant-tag .anticon-close');
    fireEvent.click(closeButtons[0]);
    expect(screen.queryByText('Initial')).not.toBeInTheDocument();
  });
});
