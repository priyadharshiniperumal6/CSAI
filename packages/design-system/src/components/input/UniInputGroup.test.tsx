import { Input } from 'antd';
import { render, screen } from '@testing-library/react';

import { UniInputGroup } from './UniInputGroup';

describe('UniInputGroup', () => {
  it('renders nested inputs', () => {
    render(
      <UniInputGroup>
        <Input placeholder="First" />
      </UniInputGroup>
    );

    expect(screen.getByPlaceholderText('First')).toBeInTheDocument();
  });
});
