import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import NativeBaseProvider from './src/provider/NativeBaseProvider';
import { store } from './src/store/store';
import type { RootStackParamList } from './src/types/react-navigation';

// Providers
import { Provider } from 'react-redux';
import I18nProvider from './src/provider/I18nProvider';
import AuthProvider from './src/provider/AuthProvider';

// Screens
import LoginScreen from './src/screen/Auth/LoginScreen';
import ForgetPasswordCodeScreen from './src/screen/ForgetPasswordScreens/ForgetPasswordCodeScreen';
import ForgetPasswordConfirmPassword from './src/screen/ForgetPasswordScreens/ForgetPasswordConfirmPassword';
import ForgetPasswordEmailScreen from './src/screen/ForgetPasswordScreens/ForgetPasswordEmailScreen';
import RegisterEmailScreen from './src/screen/RegisterScreens/RegisterEmailScreen';
import RegisterConfirmCodeScreen from './src/screen/RegisterScreens/RegisterConfirmCodeScreen';
import RegisterConfirmPasswordScreen from './src/screen/RegisterScreens/RegisterConfirmPasswordScreen';
import RegisterInfoScreen from './src/screen/RegisterScreens/RegisterInfoScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

function App(): React.JSX.Element {
    return (
        <NativeBaseProvider>
            <Provider store={store}>
                <I18nProvider>
                    <NavigationContainer>
                        <AuthProvider>
                            <Stack.Navigator>
                                <Stack.Screen component={RegisterInfoScreen} name="RegisterInfo" options={{headerShown:false}} />
                                <Stack.Screen component={LoginScreen} name="Login" options={{headerShown:false}} />
                                
                                <Stack.Screen component={RegisterEmailScreen} name="RegisterEmail" options={{headerShown:false}} />
                                <Stack.Screen component={RegisterConfirmPasswordScreen} name="RegisterConfirmPassword" options={{headerShown:false}} />
                                <Stack.Screen component={RegisterConfirmCodeScreen} name="RegisterConfirmCode" options={{headerShown:false}} />

                                <Stack.Screen component={ForgetPasswordConfirmPassword} name="ForgetPasswordConfirmPassword" options={{headerShown:false}} />
                                <Stack.Screen component={ForgetPasswordCodeScreen} name="ForgetPasswordCode" options={{headerShown:false}} />
                                <Stack.Screen component={ForgetPasswordEmailScreen} name="ForgetPasswordEmail" options={{headerShown:false}} />

                            </Stack.Navigator>
                        </AuthProvider>
                    </NavigationContainer>
                </I18nProvider>
            </Provider>
        </NativeBaseProvider>
    );
}

export default App;
