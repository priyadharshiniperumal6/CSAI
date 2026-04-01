import { render, screen } from '@testing-library/react';

import { UniInput } from './UniInput';
import { UniInputPassword } from './UniInputPassword';
import { UniInputNumber } from './UniInputNumber';
import { UniSearchInput } from './UniSearchInput';

describe('UniInput family', () => {
  it('renders text input with placeholder', () => {
    render(<UniInput placeholder="Name" />);
    expect(screen.getByPlaceholderText('Name')).toBeInTheDocument();
  });

  it('applies color picker class for type color', () => {
    render(<UniInput type="color" data-testid="color-input" />);
    expect(screen.getByTestId('color-input').className).toContain('color-picker-input');
  });

  it('renders password field', () => {
    render(<UniInputPassword placeholder="Password" />);
    expect(screen.getByPlaceholderText('Password')).toHaveAttribute('type', 'password');
  });

  it('renders number input with class', () => {
    const { container } = render(<UniInputNumber />);
    expect(container.querySelector('.uni-ant-input-number')).not.toBeNull();
  });

  it('renders search input with prefix icon', () => {
    render(<UniSearchInput placeholder="Search" />);
    expect(screen.getByPlaceholderText('Search').parentElement?.className).toContain('uni-ant-search');
    expect(document.querySelector('.material-symbols-outlined')).toBeInTheDocument();
  });
});
