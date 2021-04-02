import React, { useState, useEffect } from 'react'; //JSX
import { Text, View, StyleSheet, Platform } from 'react-native';
import Constants from 'expo-constants';
import { Focus } from './src/features/focus/Focus';
import { FocusHistory } from './src/features/focus/FocusHistory';
import { Timer } from './src/features/timer/Timer';
import { fontSizes, paddingSizes } from './src/utils/sizes';
import { colors } from './src/utils/colors';

// store information async
import AsyncStorage from '@react-native-async-storage/async-storage';

const STATUSES = {
  COMPLETE: 1,
  CANCELLED: 2,
};

export default function App() {
  // store focus subject
  // setFocusSubject = function that set null to value
  const [focusSubject, setFocusSubject] = useState(null);
  const [focusHistory, setFocusHistory] = useState([]);

  const addFocusSubjectWithStatus = (subject, status) => {
    // {subject, status } = {subject: subject, status: status }
    // add key for FlatList (key: String(focusHistory.length + 1) / uid/ random/ keyExtractor)
    setFocusHistory([...focusHistory, { key: String(focusHistory.length + 1), subject, status }]);
  };

  const onClear = () => {
    setFocusHistory([]);
  };

  const saveFocusHistory = async () => {
    try {
      //  AsyncStorage.setItem("key for storage", JSON.stringify(array of history))
      // need to add JSON.stringify as it is array
      await AsyncStorage.setItem('focusHistory', JSON.stringify(focusHistory));
    } catch (e) {
      console.lgo(e);
    }
  };

  const loadFocusHistory = async () => {
    try {
      // AsyncStorage.getItem("key of storgae")
      const history = await AsyncStorage.getItem('focusHistory');
      if (history && JSON.parse(history).length) {
        setFocusHistory(JSON.parse(history));
      }
    } catch (e) {
      console.log(e);
    }
  };

  // run when the app first loaded
  useEffect(() => {
    loadFocusHistory();
  }, []);

  useEffect(() => {
    saveFocusHistory();
  }, [focusHistory]);

  // watch every focusSubject changed
  // add focusSubject to focusHistory
  useEffect(() => {
    if (focusSubject) {
      setFocusHistory([...focusHistory, focusSubject]);
    }
  }, [focusSubject]);

  return (
    <View style={styles.container}>
      {focusSubject ? (
        // parent need to clear up
        <Timer
          focusSubject={focusSubject}
          onTimerEnd={() => {
            // update status to complete
            addFocusSubjectWithStatus(focusSubject, STATUSES.COMPLETE);
            setFocusSubject(null);
          }}
          clearSubject={() => {
            addFocusSubjectWithStatus(focusSubject, STATUSES.CANCELLED);
            setFocusSubject(null);
          }}
        />
      ) : (
        <View style={{ flex: 1 }}>
          {/*wrap content without using view*/}
          <Focus addSubject={setFocusSubject} />
          <FocusHistory focusHistory={focusHistory} onClear={onClear} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? paddingSizes.md : paddingSizes.lg,
    backgroundColor: colors.darkBlue,
  },
});
