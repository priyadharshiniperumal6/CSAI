import { test, expect } from '@playwright/experimental-ct-react';

import { UniButton } from './UniButton';

test('UniButton renders label', async ({ mount }) => {
  const component = await mount(<UniButton>Click Me</UniButton>);
  await expect(component).toContainText('Click Me');
});
