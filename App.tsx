import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import NativeBaseProvider from './src/provider/NativeBaseProvider';
import { store } from './src/store/store';
import type { RootStackParamList } from './src/types/react-navigation';

// Providers
import { Provider } from 'react-redux';
import AuthProvider from './src/provider/AuthProvider';
import I18nProvider from './src/provider/I18nProvider';

// Screens
import TabNavigator from './src/navigators/TabNavigator';
import LoginScreen from './src/screen/Auth/LoginScreen';
import CreateRoomScreen from './src/screen/CreateRoomScreen';
import ForgetPasswordCodeScreen from './src/screen/ForgetPasswordScreens/ForgetPasswordCodeScreen';
import ForgetPasswordConfirmPassword from './src/screen/ForgetPasswordScreens/ForgetPasswordConfirmPassword';
import ForgetPasswordEmailScreen from './src/screen/ForgetPasswordScreens/ForgetPasswordEmailScreen';
import KvkkModalScreen from './src/screen/Modal/KvkkModalScreen';
import AddNewLanguageScreen from './src/screen/ProfileScreens/AddNewLanguageScreen';
import EditWordScreen from './src/screen/ProfileScreens/EditWordScreen';
import FriendRequestScreen from './src/screen/ProfileScreens/FriendRequestScreen';
import FriendScreen from './src/screen/ProfileScreens/FriendScreen';
import UserProfileScreen from './src/screen/ProfileScreens/UserProfileScreen';
import WordsScreen from './src/screen/ProfileScreens/WordsScreen';
import RegisterConfirmCodeScreen from './src/screen/RegisterScreens/RegisterConfirmCodeScreen';
import RegisterConfirmPasswordScreen from './src/screen/RegisterScreens/RegisterConfirmPasswordScreen';
import RegisterEmailScreen from './src/screen/RegisterScreens/RegisterEmailScreen';
import RegisterInfoScreen from './src/screen/RegisterScreens/RegisterInfoScreen';
import RoomDetailScreen from './src/screen/RoomDetailScreen';
import SearchScreen from './src/screen/SearchScreen';
import AccountScreen from './src/screen/SettingsScreens/AccountScreen';
import BlockedScreen from './src/screen/SettingsScreens/BlockedScreen';
import CloseAccountConfirmPasswordScreen from './src/screen/SettingsScreens/CloseAccountScreens/CloseAccountConfirmPasswordScreen';
import CloseAccountConfirmScreen from './src/screen/SettingsScreens/CloseAccountScreens/CloseAccountConfirmScreen';
import CloseAccountScreen from './src/screen/SettingsScreens/CloseAccountScreens/CloseAccountScreen';
import CloseAccountSelectionScreen from './src/screen/SettingsScreens/CloseAccountScreens/CloseAccountSelectionScreen';
import ComplaimentScreen from './src/screen/SettingsScreens/ComplaimentScreen';
import SettingsScreen from './src/screen/SettingsScreens/SettingsScreen';
import UpdatePasswordScreen from './src/screen/SettingsScreens/UpdatePasswordScreen';
import UpdateProfileScreen from './src/screen/SettingsScreens/UpdateProfileScreen';
import ExploreScreen from './src/screen/Tabs/ExploreScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

function App(): React.JSX.Element {
    return (
        <NativeBaseProvider>
            <Provider store={store}>
                <I18nProvider>
                    <NavigationContainer>
                        <AuthProvider>
                            <Stack.Navigator>
                                <Stack.Screen component={CreateRoomScreen} name="CreateRoom" options={{headerShown:false}} />
                                <Stack.Screen component={RoomDetailScreen} name="RoomDetail" options={{headerShown:false}} />
                                <Stack.Screen component={LoginScreen} name="Login" options={{headerShown:false}} />
                                <Stack.Screen component={ExploreScreen} name="Explore" options={{headerShown:false}} />
                                <Stack.Screen component={SettingsScreen} name="Settings" options={{headerShown:false}} />
                                
                                <Stack.Screen component={RegisterEmailScreen} name="RegisterEmail" options={{headerShown:false}} />
                                <Stack.Screen component={RegisterConfirmPasswordScreen} name="RegisterConfirmPassword" options={{headerShown:false}} />
                                <Stack.Screen component={RegisterConfirmCodeScreen} name="RegisterConfirmCode" options={{headerShown:false}} />
                                <Stack.Screen component={RegisterInfoScreen} name="RegisterInfo" options={{headerShown:false}} />

                                <Stack.Screen component={ForgetPasswordConfirmPassword} name="ForgetPasswordConfirmPassword" options={{headerShown:false}} />
                                <Stack.Screen component={ForgetPasswordCodeScreen} name="ForgetPasswordCode" options={{headerShown:false}} />
                                <Stack.Screen component={ForgetPasswordEmailScreen} name="ForgetPasswordEmail" options={{headerShown:false}} />

                                <Stack.Screen component={TabNavigator} name="Tab" options={{ headerShown:false }} />
                                <Stack.Screen component={AddNewLanguageScreen} name="AddNewLanguage" options={{headerShown:false}} />

                                <Stack.Screen component={AccountScreen} name="Account" options={{headerShown:false}} />
                                <Stack.Screen component={FriendScreen} name="Friend" options={{headerShown:false}} />
                                <Stack.Screen component={FriendRequestScreen} name="FriendRequest" options={{headerShown:false}} />
                                <Stack.Screen component={ComplaimentScreen} name="Complaiment" options={{headerShown:false}} />
                                <Stack.Screen component={BlockedScreen} name="Blocked" options={{headerShown:false}} />
                                <Stack.Screen component={UpdatePasswordScreen} name="UpdatePassword" options={{headerShown:false}} />

                                <Stack.Screen component={WordsScreen} name="Words" options={{headerShown:false}} />
                                <Stack.Screen component={EditWordScreen} name="EditWord" options={{headerShown:false}} />

                                <Stack.Screen component={UserProfileScreen} name="UserProfile" options={{headerShown:false}} />
                                <Stack.Screen component={UpdateProfileScreen} name="UpdateProfile" options={{headerShown:false}} />
                                <Stack.Screen component={CloseAccountScreen} name="CloseAccount" options={{headerShown:false}} />
                                <Stack.Screen component={CloseAccountSelectionScreen} name="CloseAccountSelection" options={{headerShown:false}} />
                                <Stack.Screen component={CloseAccountConfirmPasswordScreen} name="CloseAccountConfirmPassword" options={{headerShown:false}} />
                                <Stack.Screen component={CloseAccountConfirmScreen} name="CloseAccountConfirm" options={{headerShown:false}} />
                                
                                
                                <Stack.Screen component={SearchScreen} name="Search" options={{headerShown:false}} />

                                <Stack.Group screenOptions={{presentation: "modal"}}>
                                    <Stack.Screen component={KvkkModalScreen} name='KvkkModal' options={{headerShown:false}}/>

                                </Stack.Group>
                            </Stack.Navigator>
                        </AuthProvider>
                    </NavigationContainer>
                </I18nProvider>
            </Provider>
        </NativeBaseProvider>
    );
}

export default App;
