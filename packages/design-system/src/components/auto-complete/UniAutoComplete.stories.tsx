import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Input } from 'antd';
import { UniAutoComplete } from './UniAutoComplete';
import { UniButton } from '../button/UniButton';

const { Search } = Input;

const meta = {
  title: 'ANT/AutoComplete',
  component: UniAutoComplete,
  tags: ['autodocs'],
} satisfies Meta<typeof UniAutoComplete>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: function Render(args) {
    const [options, setOptions] = useState<{ value: string }[]>([]);
    const mockVal = (str: string, repeat = 1) => ({
      value: str.repeat(repeat),
    });
    const onSearch = (searchText: string) => {
      setOptions(
        !searchText ? [] : [mockVal(searchText), mockVal(searchText, 2), mockVal(searchText, 3)],
      );
    };
    return (
      <div style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
        <div style={{ display: 'flex', gap: '16px', flexDirection: 'column', width: '288px' }}>
          <UniAutoComplete
            {...args}
            options={options}
            onSearch={onSearch}
            placeholder="Search Text"
          />
        </div>
      </div>
    );
  },
};

export const AutoCompleteWithSearchIcon: Story = {
  render: function Render(args) {
    const [options, setOptions] = useState<{ value: string }[]>([]);
    const mockVal = (str: string, repeat = 1) => ({
      value: str.repeat(repeat),
    });
    const onSearch = (searchText: string) => {
      setOptions(
        !searchText ? [] : [mockVal(searchText), mockVal(searchText, 2), mockVal(searchText, 3)],
      );
    };
    return (
      <div style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
        <div style={{ display: 'flex', gap: '16px', flexDirection: 'column', width: '288px' }}>
          <UniAutoComplete {...args} options={options} onSearch={onSearch}>
            <Search size="small" placeholder="Input here" />
          </UniAutoComplete>
        </div>
      </div>
    );
  },
};

export const AutocompleteCustomizeOptions: Story = {
  render: function Render(args) {
    const [options, setOptions] = useState<any[]>([]);
    const getRandomInt = (max: number, min = 0) => {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    };
    const searchResult = (query: string) => {
      return new Array(getRandomInt(5))
        .join('.')
        .split('.')
        .map((_, idx) => {
          const count = getRandomInt(200, 100);
          const category = `${query}${idx}`;
          return {
            query,
            category,
            value: category,
            label: (
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>
                  Found {query} on {category}
                </span>
                <span>{count} results</span>
              </div>
            ),
          };
        });
    };
    const handleSearch = (val: string) => {
      setOptions(val ? searchResult(val) : []);
    };
    return (
      <div style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
        <div style={{ display: 'flex', gap: '16px', flexDirection: 'column', width: '288px' }}>
          <UniAutoComplete {...args} options={options} onSearch={handleSearch}>
            <Search size="large" placeholder="Input here" />
          </UniAutoComplete>
        </div>
      </div>
    );
  },
};

export const AutoCompleteWithDefaultValues: Story = {
  args: {
    options: [
      { label: 'Jack', value: 'Jack' },
      { label: 'John', value: 'John' },
      { label: 'Harry', value: 'harry' },
    ],
    placeholder: 'Search Text',
    filterOption: (input: string, option: any) =>
      (option?.value ?? '').toUpperCase().indexOf(input.toUpperCase()) >= 0,
  },
};

export const AutoCompleteWithPrefixIcon: Story = {
  render: function Render(args) {
    const [open, setOpen] = useState(false);
    const options = [
      { label: 'Jack', value: 'Jack' },
      { label: 'John', value: 'John' },
      { label: 'Harry', value: 'harry' },
    ];
    return (
      <div className="uni-ant-input-group-autocomplete">
        <Input.Group compact>
          <UniButton style={{ width: '40px' }} onClick={() => setOpen(!open)}>
            @
          </UniButton>
          <UniAutoComplete
            {...args}
            options={options}
            open={open}
            onBlur={() => setOpen(false)}
            style={{ width: '320px' }}
            placeholder="Search Text"
            filterOption={(input: string, option: any) =>
              (option?.value ?? '').toUpperCase().indexOf(input.toUpperCase()) >= 0
            }
          />
        </Input.Group>
      </div>
    );
  },
};
