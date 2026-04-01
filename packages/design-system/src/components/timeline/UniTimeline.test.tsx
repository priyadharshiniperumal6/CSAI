import { render, screen } from '@testing-library/react';

import { UniTimeline, UniTimelineItem } from './UniTimeline';

describe('UniTimeline', () => {
  it('renders items', () => {
    render(
      <UniTimeline>
        <UniTimelineItem>One</UniTimelineItem>
      </UniTimeline>
    );
    expect(screen.getByText('One')).toBeInTheDocument();
  });
});
