import type { Meta, StoryObj } from '@storybook/react-vite';
import { UniDatePicker } from './UniDatePicker';

const meta = {
  title: 'ANT/DatePicker',
  component: UniDatePicker,
  tags: ['autodocs'],
} satisfies Meta<typeof UniDatePicker>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  render: function Render() {
    return (
      <div style={{ display: 'flex', gap: '32px', padding: '20px' }}>
        <div>
          <h3 style={{ marginBottom: '16px' }}>Date Picker with input</h3>
          <UniDatePicker format="YYYY/MM/DD" placeholder="Pick a date" />
        </div>
        <div>
          <h3 style={{ marginBottom: '16px' }}>Date Picker without Input</h3>
          <div className="showIcon">
            <style>{`
              .showIcon .ant-picker {
                padding: 5px;
                border-radius: 2px !important;
              }
              .showIcon .ant-picker-input input {
                width: 0px !important;
                display: none;
              }
              .showIcon .ant-picker-input .ant-picker-suffix {
                margin-inline-start: 0.5px;
              }
              .showIcon .anticon-calendar {
                color: #000;
              }
            `}</style>
            <UniDatePicker format="YYYY/MM/DD" placeholder="Pick a date" allowClear={false} />
          </div>
        </div>
      </div>
    );
  },
};
