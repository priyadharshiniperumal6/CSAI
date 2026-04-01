export enum ScreenRecordingMode {
  PIP = 'pictureInPicture',
  Preview = 'preview',
  Theatre = 'theatre',
  FullScreen = 'fullScreen',
}

export enum ScreenRecordingAction {
  exitPIP = 'exitPIP',
  enterPIP = 'enterPIP',
  enterTheatreMode = 'enterTheatreMode',
  enterFullScreen = 'enterFullScreen',
}

export type ScreenRecordingButton = {
  tooltip: string;
  materialIcon?: string;
  uIcon?: string;
  action: ScreenRecordingAction;
};

export const SCREEN_RECORDING_MODE_BUTTONS = (mode: ScreenRecordingMode): ScreenRecordingButton[] | null => {
  const exitPIP: ScreenRecordingButton = {
    tooltip: 'Exit picture-in-picture',
    materialIcon: 'pip_exit',
    action: ScreenRecordingAction.exitPIP,
  };

  const enterPIP: ScreenRecordingButton = {
    tooltip: 'Enter picture-in-picture',
    materialIcon: 'pip',
    action: ScreenRecordingAction.enterPIP,
  };

  const theatreMode: ScreenRecordingButton = {
    tooltip: 'Theatre mode',
    uIcon: 'uni-theatre',
    action: ScreenRecordingAction.enterTheatreMode,
  };

  const fullScreen: ScreenRecordingButton = {
    tooltip: 'Full screen',
    materialIcon: 'fullscreen',
    action: ScreenRecordingAction.enterFullScreen,
  };

  if (mode === ScreenRecordingMode.PIP) {
    return [exitPIP, theatreMode];
  }

  if (mode === ScreenRecordingMode.Preview) {
    return [enterPIP, theatreMode, fullScreen];
  }

  if (mode === ScreenRecordingMode.Theatre) {
    return [fullScreen];
  }

  return null;
};
