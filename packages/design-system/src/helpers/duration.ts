import duration from 'dayjs/plugin/duration';

export const getDurationFormat = (callDuration: duration.Duration | null) => {
  if (!callDuration) {
    return 'mm:ss';
  } else if (callDuration.asHours() > 1) {
    return 'HH:mm:ss';
  } else if (callDuration.asMinutes() > 1) {
    return 'mm:ss';
  } else {
    return 'mm:ss';
  }
};

export const generateRandomPeaks = (durationInSeconds: number, seed?: string, sparse?: boolean): [Float32Array, Float32Array] => {
  const peaksPerSecond = 50;
  const totalPeaks = Math.max(1, Math.floor(durationInSeconds * peaksPerSecond));
  const leftChannel = new Float32Array(totalPeaks);
  const rightChannel = new Float32Array(totalPeaks);

  let random = Math.random;
  if (seed) {
    let hash = 0;
    for (let i = 0; i < seed.length; i++) {
        hash = ((hash << 5) - hash) + seed.charCodeAt(i);
        hash |= 0;
    }
    random = () => {
        hash = Math.sin(hash++) * 10000;
        return hash - Math.floor(hash);
    };
  }

  for (let i = 0; i < totalPeaks; i++) {
    const isLeft = random() < 0.5;
    const val = sparse ? (random() ** 10) : random();
    
    if (isLeft) {
      leftChannel[i] = val;
      rightChannel[i] = 0;
    } else {
      leftChannel[i] = 0;
      rightChannel[i] = val;
    }
  }

  return [leftChannel, rightChannel];
};
