import type { Meta, StoryObj } from '@storybook/react-vite';
import dayjs from 'dayjs';
import { UniRangePicker } from './UniDatePicker';

const meta = {
    title: 'ANT/RangePicker',
    component: UniRangePicker,
    tags: ['autodocs'],
} satisfies Meta<typeof UniRangePicker>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    render: function Render() {
        const rangePresets = [
            { label: 'Last 7 Days', value: [dayjs().add(-7, 'd'), dayjs()] },
            { label: 'Last 14 Days', value: [dayjs().add(-14, 'd'), dayjs()] },
            { label: 'Last 30 Days', value: [dayjs().add(-30, 'd'), dayjs()] },
            { label: 'Last 90 Days', value: [dayjs().add(-90, 'd'), dayjs()] },
        ] as any;

        const disabledDate = (current: any) => current && current > dayjs().endOf('day');

        return (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', padding: '20px' }}>
                <div>
                    <h3 style={{ marginBottom: '16px' }}>Usual range picker</h3>
                    <UniRangePicker format="YYYY/MM/DD HH:mm:ss" placeholder={['Start Date', 'End Date']} showTime />
                </div>
                <div>
                    <h3 style={{ marginBottom: '16px' }}>The range picker with the presets</h3>
                    <UniRangePicker
                        format="YYYY/MM/DD HH:mm:ss"
                        presets={rangePresets}
                        placeholder={['Start Date', 'End Date']}
                        showTime
                    />
                </div>
                <div>
                    <h3 style={{ marginBottom: '16px' }}>The range picker without hours and disabled date</h3>
                    <UniRangePicker format="YYYY-MM-DD" disabledDate={disabledDate} placeholder={['Start Date', 'End Date']} />
                </div>
            </div>
        );
    },
};
