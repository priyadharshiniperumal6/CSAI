import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import { UniFormBuilder } from './UniFormBuilder';
import type { UniFormElementMeta } from './types';

const meta: UniFormElementMeta[] = [
  {
    key: 'name',
    label: 'Name',
    type: 'input',
    rules: [{ required: true, message: 'Name is required' }],
    bindProps: { placeholder: 'Enter name' },
  },
  {
    key: 'role',
    label: 'Role',
    type: 'select',
    options: [
      { label: 'Agent', value: 'agent' },
      { label: 'Supervisor', value: 'supervisor' },
    ],
  },
];

describe('UniFormBuilder', () => {
  it('validates required fields and shows helper text', async () => {
    render(<UniFormBuilder uniFormMeta={meta} uniFormData={{ name: '', role: undefined }} />);

    fireEvent.blur(screen.getByPlaceholderText('Enter name'));
    expect(await screen.findByText('Name is required')).toBeInTheDocument();

    fireEvent.change(screen.getByPlaceholderText('Enter name'), { target: { value: 'Alex' } });
    fireEvent.blur(screen.getByPlaceholderText('Enter name'));
    await waitFor(() => expect(screen.queryByText('Name is required')).not.toBeInTheDocument());
  });
});
