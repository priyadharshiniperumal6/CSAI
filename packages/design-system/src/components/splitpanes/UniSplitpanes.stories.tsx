import type { Meta, StoryObj } from '@storybook/react-vite';
import { ConfigProvider } from 'antd';
import { ANT_THEME_TOKEN } from '../../theme/themeAntDesign';

import { UniSplitpanes } from './UniSplitpanes';
import { UniPane } from './UniPane';

const meta = {
  title: 'Components/Splitpanes/UniSplitpanes',
  component: UniSplitpanes,
  tags: ['autodocs'],
  parameters: {
    theme: ANT_THEME_TOKEN,
  }
} satisfies Meta<typeof UniSplitpanes>;

export default meta;

type Story = StoryObj<typeof meta>;

const paneWrapperStyle = {
  boxShadow: '0 0 3px #0003 inset',
  justifyContent: 'center',
  alignItems: 'center',
  display: 'flex',
  position: 'relative',
  height: '100%',
  width: '100%',
};

const spanStyle = {
  fontFamily: 'Helvetica, Arial, sans-serif',
  color: '#4d4c4c',
  fontSize: '5em',
  opacity: 0.7,
};

export const Basic: Story = {
  args: {} as any,
  render: (args) => (
    <ConfigProvider theme={ANT_THEME_TOKEN}>
      <UniSplitpanes 
        {...args} 
        horizontal={true} 
        className="default-theme exp" 
        style={{ height: 400 }}
      >
        <UniPane minSize={20} maxSize={70}>
          <div style={paneWrapperStyle as any}>
            <span style={spanStyle as any}>1</span>
          </div>
        </UniPane>
        <UniPane>
          <div style={paneWrapperStyle as any}>
            <span style={spanStyle as any}>2</span>
          </div>
        </UniPane>
        <UniPane maxSize={70}>
          <div style={paneWrapperStyle as any}>
            <span style={spanStyle as any}>3</span>
          </div>
        </UniPane>
      </UniSplitpanes>
    </ConfigProvider>
  ),
};

export const MixLayoutWithNestedSplitpanes: Story = {
  args: {} as any,
  render: (args) => (
    <ConfigProvider theme={ANT_THEME_TOKEN}>
      <UniSplitpanes 
        {...args} 
        horizontal={true} 
        pushOtherPanes={false} 
        className="default-theme exp" 
        style={{ height: 400 }}
      >
        <UniPane>
          <div style={paneWrapperStyle as any}>
            <span style={spanStyle as any}>1</span>
          </div>
        </UniPane>
        <UniPane>
          <UniSplitpanes horizontal={false} pushOtherPanes={false}>
            <UniPane>
              <div style={paneWrapperStyle as any}>
                <span style={spanStyle as any}>2</span>
              </div>
            </UniPane>
            <UniPane>
              <div style={paneWrapperStyle as any}>
                <span style={spanStyle as any}>3</span>
              </div>
            </UniPane>
            <UniPane>
              <div style={paneWrapperStyle as any}>
                <span style={spanStyle as any}>4</span>
              </div>
            </UniPane>
          </UniSplitpanes>
        </UniPane>
        <UniPane>
          <div style={paneWrapperStyle as any}>
            <span style={spanStyle as any}>5</span>
          </div>
        </UniPane>
      </UniSplitpanes>
    </ConfigProvider>
  ),
};
