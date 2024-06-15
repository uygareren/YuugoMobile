import { BottomTabNavigationProp, createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screen/Tabs/HomeScreen";
import ExploreScreen from "../screen/Tabs/ExploreScreen";
import ProfileScreen from "../screen/Tabs/ProfileScreen";
import { TabParamList } from "../types/react-navigation";

const Tab = createBottomTabNavigator<TabParamList>();

export default function TabNavigator() {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Explore" component={ExploreScreen} />
            <Tab.Screen name="Profile" component={ProfileScreen} />
        </Tab.Navigator>
    );
}