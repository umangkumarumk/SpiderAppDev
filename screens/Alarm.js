import React from 'react';
import {StyleSheet, View, Button, Text, SafeAreaView} from 'react-native';
import TimePicker from '../components/TimePicker';
import ListAlarms from '../components/ListAlarms';

const Alarm=()=> {
  
    return (
      <View style={styles.mainContainer}>
        
        <SafeAreaView style={styles.listAlarms}>
          <ListAlarms />
        </SafeAreaView>
        <View style={styles.timePicker}>
          <TimePicker />
        </View>
      </View>
    );
  }

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    // justifyContent: 'center',
  },
  heading: {
    // fontWeight: "bold",
    fontSize: 25,
    padding: 20,
  },
  timePicker: {
    paddingTop: '10%',
    width: '50%',
    // right: '10%',
    bottom: 20,
  },
  listAlarms: {
    flex: 1,
    width: '100%',
  },
});

export default Alarm;