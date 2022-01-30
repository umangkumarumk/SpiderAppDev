// import React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { View } from 'react-native';
// import LottieView from 'lottie-react-native'
// import StopWatch from './screens/StopWatch';
// import Alarms from './screens/Alarm';
// import Tabs from './navigation/tabs'
// export default function App(){
//   return (
//     // <NavigationContainer>
//     //   <Tabs />
//     // </NavigationContainer>
//     <View>
//         <LottieView source={require('./assets/1.json')}
//         autoPlay 
//         loop={false}
//         />
//     </View>
//   );
// }
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import SplashScreen from './components/Splash';

export default function App() {
  return (
    <SafeAreaProvider>
      <SplashScreen></SplashScreen>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
