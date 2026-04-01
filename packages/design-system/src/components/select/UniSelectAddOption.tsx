import { useState } from 'react';

import { UniSelect, type UniSelectProps } from './UniSelect';
import { UniDivider } from '../divider/UniDivider';
import { UniInput } from '../input/UniInput';
import { UniButton } from '../button/UniButton';

export type UniSelectAddOptionProps<T = any> = UniSelectProps<T> & {
  onAddValue?: (value: string) => void;
  addPlaceholder?: string;
  addButtonLabel?: string;
};

export const UniSelectAddOption = <T,>({
  onAddValue,
  addPlaceholder = 'Please enter item',
  addButtonLabel = 'Add item',
  ...rest
}: UniSelectAddOptionProps<T>) => {
  const [value, setValue] = useState('');

  return (
    <UniSelect
      {...rest}
      dropdownRender={menu => (
        <>
          {menu}
          <UniDivider style={{ margin: '4px 0' }} />
          <div style={{ padding: '4px 8px', display: 'flex', gap: '8px' }}>
            <UniInput value={value} onChange={event => setValue(event.target.value)} placeholder={addPlaceholder} />
            <UniButton
              type="text"
              iconOnly
              onClick={event => {
                event.preventDefault();
                if (!value) return;
                onAddValue?.(value);
                setValue('');
              }}
            >
              {addButtonLabel}
            </UniButton>
          </div>
        </>
      )}
    />
  );
};
