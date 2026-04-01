import { render, screen } from '@testing-library/react';

import { UniTree } from './UniTree';

describe('UniTree', () => {
  it('renders nodes', () => {
    render(
      <UniTree
        treeData={[
          {
            title: 'Parent',
            key: '0',
            children: [{ title: 'Child', key: '0-0' }],
          },
        ]}
        defaultExpandAll
      />
    );

    expect(screen.getByText('Parent')).toBeInTheDocument();
    expect(screen.getByText('Child')).toBeInTheDocument();
  });
});
