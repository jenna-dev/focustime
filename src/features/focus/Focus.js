import React, { useState } from 'react';
import { TextInput } from 'react-native-paper';
import { View, StyleSheet, Text } from 'react-native';
import { RoundedButton } from '../../components/RoundedButton';
import { fontSizes, paddingSizes } from '../../utils/sizes';
import { colors } from '../../utils/colors';

export const Focus = ({ addSubject }) => {
  // {addSubject} = props
  const [subject, setSubject] = useState(null);
  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={styles.title}>What would you like to focus on?</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={{ flex: 1 }}
            maxLength={50}
            value={subject}
            // immediately happen when pressing return
            // need to press "return" => "+"
            // if put addSubject -> will submit the press return, but need press "+" to submit
            // add state to track enter in text input
            onSubmitEditing={({ nativeEvent: { text } }) => setSubject(text)}
          />
          <RoundedButton
            style={styles.addSubject}
            size={50}
            title="+"
            // setFocusSubject to focusItem
            // press "+" to submit
            onPress={() => addSubject(subject)}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0.5,
  },
  innerContainer: {
    flex: 1,
    padding: paddingSizes.md,
    justifyContent: 'center',
  },
  title: {
    color: colors.white,
    fontWeight: 'bold',
    fontSize: fontSizes.lg,
  },
  inputContainer: {
    paddingTop: paddingSizes.md,
    flexDirection: "row",
    alignItems: "center"
  },
  addSubject: {
    marginLeft: 10,
    alignSelf: 'center',
  },
});
