/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import { View, StatusBar, SafeAreaView } from 'react-native';

import HomeScreen from './app/container/HomeScreen/HomeScreen';

const App = () => {
  return (
    <View style={{ flex: 1 }}>
      <StatusBar barStyle='dark-content' />
      <HomeScreen />
    </View>
  );
};

export default App;
