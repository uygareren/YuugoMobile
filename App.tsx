import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import NativeBaseProvider from './src/provider/NativeBaseProvider';
import type { RootStackParamList } from './src/types/react-navigation';
import { store } from './src/store/store';

// Screens
import Screen1 from './src/screen/Login';
import Screen2 from './src/screen/Screen2';
import { Provider } from 'react-redux';

const Stack = createNativeStackNavigator<RootStackParamList>();

function App(): React.JSX.Element {
    return (
        <NativeBaseProvider>
            <Provider store={store}>
                <NavigationContainer>
                    <Stack.Navigator>
                        <Stack.Screen component={Screen1} name="Login" options={{headerShown:false}} />
                        <Stack.Screen component={Screen2} name="Screen2" options={{headerShown:false}} />
                    </Stack.Navigator>
                </NavigationContainer>
            </Provider>
        </NativeBaseProvider>
    );
}

export default App;
