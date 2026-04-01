import { render } from '@testing-library/react';

import { UniUpload } from './UniUpload';
import { UniDragUpload } from './UniDragUpload';

describe('UniUpload', () => {
  it('renders upload wrapper', () => {
    const { container } = render(<UniUpload />);
    expect(container.querySelector('.ant-upload')).toBeInTheDocument();
  });
});

describe('UniDragUpload', () => {
  it('renders dragger', () => {
    const { container } = render(
      <UniDragUpload>
        <div>Drag</div>
      </UniDragUpload>
    );
    expect(container.querySelector('.ant-upload-drag')).toBeInTheDocument();
  });
});
