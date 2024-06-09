import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import NativeBaseProvider from './src/provider/NativeBaseProvider';
import { store } from './src/store/store';
import type { RootStackParamList } from './src/types/react-navigation';

// Screens
import { Provider } from 'react-redux';
import I18nProvider from './src/provider/I18nProvider';
import RegisterEmailScreen from './src/screen/RegisterScreens/RegisterEmailScreen';
import Screen2 from './src/screen/Screen2';

// Screens
import LoginScreen from './src/screen/Auth/LoginScreen';
import ForgetPasswordCodeScreen from './src/screen/ForgetPasswordScreens/ForgetPasswordCodeScreen';
import ForgetPasswordConfirmPassword from './src/screen/ForgetPasswordScreens/ForgetPasswordConfirmPassword';
import ForgetPasswordEmailScreen from './src/screen/ForgetPasswordScreens/ForgetPasswordEmailScreen';
import RegisterConfirmCodeScreen from './src/screen/RegisterScreens/RegisterConfirmCodeScreen';
import RegisterConfirmPasswordScreen from './src/screen/RegisterScreens/RegisterConfirmPasswordScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

function App(): React.JSX.Element {
    return (
        <NativeBaseProvider>
            <Provider store={store}>
                <I18nProvider>
                    <NavigationContainer>
                        <Stack.Navigator>
                            <Stack.Screen component={ForgetPasswordConfirmPassword} name="ForgetPasswordConfirmPassword" options={{headerShown:false}} />
                            <Stack.Screen component={ForgetPasswordCodeScreen} name="ForgetPasswordCode" options={{headerShown:false}} />
                            <Stack.Screen component={ForgetPasswordEmailScreen} name="ForgetPasswordEmail" options={{headerShown:false}} />
                            
                            <Stack.Screen component={RegisterConfirmPasswordScreen} name="RegisterConfirmPassword" options={{headerShown:false}} />
                            <Stack.Screen component={RegisterConfirmCodeScreen} name="RegisterConfirmCode" options={{headerShown:false}} />
                            <Stack.Screen component={LoginScreen} name="Login" options={{headerShown:false}} />

                            <Stack.Screen component={RegisterEmailScreen} name="RegisterEmail" options={{headerShown:false}} />
                            <Stack.Screen component={Screen2} name="Screen2" options={{headerShown:false}} />
                        </Stack.Navigator>
                    </NavigationContainer>
                </I18nProvider>
            </Provider>
        </NativeBaseProvider>
    );
}

export default App;
