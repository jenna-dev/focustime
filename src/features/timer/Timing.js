import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';

import {RoundedButton} from "../../components/RoundedButton";

export const Timing = ({onChnageTime}) => {
  return(
    <>
      <View style={styles.timingButton}>
        <RoundedButton size={75} title="10" onPress={() => onChnageTime(10)} />
      </View>
      <View style={styles.timingButton}>
        <RoundedButton size={75} title="15" onPress={() => onChnageTime(15)} />
      </View>
      <View style={styles.timingButton}>
        <RoundedButton size={75} title="20" onPress={() => onChnageTime(20)} />
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  timingButton: {
    flex: 1,
    alignItems: "center"
  }
})
