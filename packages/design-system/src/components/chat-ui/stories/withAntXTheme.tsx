import React from 'react';
import { ConfigProvider } from 'antd';

import { ANTX_THEME_TOKEN } from '../antXTheme';

type StoryRender = () => React.ReactElement;

export const withAntXTheme = (Story: StoryRender) => (
  <ConfigProvider theme={ANTX_THEME_TOKEN}>
    <Story />
  </ConfigProvider>
);
