import { notification } from 'antd';

import { useNotification } from './useNotification';

describe('useNotification', () => {
  it('opens notification with mapped classes and placement', () => {
    const spy = vi.spyOn(notification, 'open').mockImplementation(() => {});
    const { openNotification } = useNotification();

    openNotification({ message: 'Saved', type: 'success' });

    expect(spy).toHaveBeenCalledWith(
      expect.objectContaining({
        message: 'Saved',
        placement: 'bottomRight',
        className: expect.stringContaining('uni-ant-notification'),
      })
    );
    spy.mockRestore();
  });
});
