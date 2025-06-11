import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ExploreScreen from "../screens/customer/ExploreScreen";
import AccountScreen from "../screens/customer/AccountScreen";
import NotificationsScreen from "../screens/customer/NotificationsScreen";
import FavoritesScreen from "../screens/customer/FavoritesScreen";
import AppointmentsScreen from "../screens/customer/AppointmentsScreen";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
    faBell,
    faBookmark,
    faHouse,
    faListSquares,
    faUserCircle,
} from "@fortawesome/free-solid-svg-icons";

export type CustomerBottomTabParamList = {
    ExploreScreen: undefined;
    AccountScreen: undefined;
    AppointmentsScreen: undefined;
    FavoritesScreen: undefined;
    NotificationsScreen: undefined;
};

const Tab = createBottomTabNavigator<CustomerBottomTabParamList>();

export default function CustomerBottomBar() {
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarActiveTintColor: "rgb(168, 85, 247)",
                headerShown: false,
                
            }}
            initialRouteName="ExploreScreen"
        >
            <Tab.Screen
                options={{
                    tabBarIcon: ({ color, size, focused }) => (
                        <FontAwesomeIcon
                            icon={faBookmark}
                            size={size}
                            color={color}
                            style={{ marginBottom: 2 }}
                        />
                    ),
                }}
                name="FavoritesScreen"
                component={FavoritesScreen}
            />
            <Tab.Screen
                name="AppointmentsScreen"
                component={AppointmentsScreen}
                options={{
                    tabBarIcon: ({ color, size, focused }) => (
                        <FontAwesomeIcon
                            icon={faListSquares}
                            size={size}
                            color={color}
                            style={{ marginBottom: 2 }}
                        />
                    ),
                }}
            />
            <Tab.Screen
                name="ExploreScreen"
                options={{
                    tabBarIcon: ({ color, size, focused }) => (
                        <FontAwesomeIcon
                            icon={faHouse}
                            size={size}
                            color={color}
                            style={{ marginBottom: 2 }}
                        />
                    ),
                }}
                component={ExploreScreen}
            />

            <Tab.Screen
                name="NotificationsScreen"
                component={NotificationsScreen}
                options={{
                    tabBarIcon: ({ color, size, focused }) => (
                        <FontAwesomeIcon
                            icon={faBell}
                            size={size}
                            color={color}
                            style={{ marginBottom: 2 }}
                        />
                    ),
                }}
            />
            <Tab.Screen
                name="AccountScreen"
                options={{
                    tabBarIcon: ({ color, size, focused }) => (
                        <FontAwesomeIcon
                            icon={faUserCircle}
                            size={size}
                            color={color}
                            style={{ marginBottom: 2 }}
                        />
                    ),
                }}
                component={AccountScreen}
            />
        </Tab.Navigator>
    );
}
