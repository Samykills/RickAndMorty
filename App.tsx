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
import { StatusBar } from 'react-native';
import {Router, Stack, Scene} from "react-native-router-flux";

import HomeScreen from './app/container/HomeScreen/HomeScreen';

class App extends React.Component {
  render = () => {
    return (
      <>
        <StatusBar barStyle='dark-content' />
        <Router>
          <Stack key='root'>
            <Scene key='login' component={HomeScreen} hideNavBar />
          </Stack>
        </Router>
      </>
    );
  };
}

export default App;
