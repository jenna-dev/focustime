import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { fontSizes, paddingSizes } from '../utils/sizes';
import { colors } from '../utils/colors';

const minutesToMillis = (min) => min * 1000 * 60;
// if time < 10, return 0 + seconds
const formatTime = (time) => (time < 10 ? `0${time}` : time);

export const Countdown = ({
  // props
  minutes = 1,
  // isPaused = !isStart
  isPaused,
  onProgress,
  onEnd,
}) => {
  const interval = React.useRef(null);
  const [millis, setMillis] = useState(null);

  const countDown = () => {
    setMillis((time) => {
      if (time === 0) {
        // don't keep counting
        clearInterval(interval.current);
        // end focus time on count down
        // parent: tell parent do what, children: tell certain state

        return time;
      }
      // time - 1000 = 1s
      const timeLeft = time - 1000;
      // report the progress

      return timeLeft;
    });
  };

  // keep watching the minutes change
  useEffect(() => {
    setMillis(minutesToMillis(minutes));
  }, [minutes]);

  useEffect(() => {
    onProgress(millis / minutesToMillis(minutes));
    if (millis === 0) {
      onEnd();
    }
  }, [millis]);

  // run only when it is not Pasused
  // watch is Paused changed
  useEffect(() => {
    // if is Paused, do nothing
    if (isPaused) {
      // clean up the ref
      if (interval.current) {
        clearInterval(interval.current);
      }
      return;
    }
    interval.current = setInterval(countDown, 1000);

    // clear interval
    return () => clearInterval(interval.current);
  }, [isPaused]);

  const minute = Math.floor(millis / 1000 / 60) % 60;
  const seconds = Math.floor(millis / 1000) % 60;

  return (
    <Text style={styles.text}>
      {formatTime(minute)} : {formatTime(seconds)}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: fontSizes.xxxl,
    fontWeight: 'bold',
    color: colors.white,
    padding: paddingSizes.lg,
    backgroundColor: 'rgba(94, 132,226,0.3)',
  },
});
