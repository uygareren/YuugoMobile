/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import {
  StyleSheet,
  useColorScheme
} from 'react-native';

import {
  Colors
} from 'react-native/Libraries/NewAppScreen';
import Screen1 from './src/screen/Screen1';
import Screen2 from './src/screen/Screen2';


type StackParamList = {
  Screen1:undefined,
  Screen2:undefined,
}


const Stack = createNativeStackNavigator<StackParamList>();


function App(): React.JSX.Element {

  
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <Stack.Navigator>
      <Stack.Screen component={Screen1} name="Screen1" options={{headerShown:false}}/>
      <Stack.Screen component={Screen2} name="Screen1" options={{headerShown:false}}/>
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
