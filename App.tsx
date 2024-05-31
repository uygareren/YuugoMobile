import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

// Screens
import Screen1 from './src/screen/Screen1';
import Screen2 from './src/screen/Screen2';
import NativeBaseProvider from './src/provider/NativeBaseProvider';

type StackParamList = {
    Screen1: undefined;
    Screen2: undefined;
};

const Stack = createNativeStackNavigator<StackParamList>();

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
