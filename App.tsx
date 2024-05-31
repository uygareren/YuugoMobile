import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import NativeBaseProvider from './src/provider/NativeBaseProvider';
import type { RootStackParamList } from './src/types/react-navigation';

// Screens
import Screen1 from './src/screen/Screen1';
import Screen2 from './src/screen/Screen2';

const Stack = createNativeStackNavigator<RootStackParamList>();

function App(): React.JSX.Element {
    return (
        <NativeBaseProvider>
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen component={Screen1} name="Screen1" options={{headerShown:false}} />
                    <Stack.Screen component={Screen2} name="Screen1" options={{headerShown:false}} />
                </Stack.Navigator>
            </NavigationContainer>
        </NativeBaseProvider>
    );
}

export default App;
