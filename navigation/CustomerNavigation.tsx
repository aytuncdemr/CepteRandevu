import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ExploreScreen from "../screens/customer/ExploreScreen";
import AccountScreen from "../screens/customer/AccountScreen";
import NotificationsScreen from "../screens/customer/NotificationsScreen";
import FavoritesScreen from "../screens/customer/FavoritesScreen";
import AppointmentsScreen from "../screens/customer/AppointmentsScreen";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
    faArrowLeft,
    faBell,
    faBookmark,
    faHouse,
    faListSquares,
    faUserCircle,
} from "@fortawesome/free-solid-svg-icons";
import {
    createNativeStackNavigator,
    NativeStackNavigationProp,
} from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import SearchScreen from "../screens/customer/SearchScreen";
import { Pressable } from "react-native";

export type CustomerRootStackParamList = {
    CustomerBottomTab: undefined;
    CustomerStack: undefined;
};

const CustomerRootStack =
    createNativeStackNavigator<CustomerRootStackParamList>();

export default function CustomerNavigation() {
    return (
        <CustomerRootStack.Navigator screenOptions={{ headerShown: false }}>
            <CustomerRootStack.Screen
                name="CustomerBottomTab"
                component={CustomerBottomTab}
            ></CustomerRootStack.Screen>
            <CustomerRootStack.Screen
                name="CustomerStack"
                component={CustomerStack}
            ></CustomerRootStack.Screen>
        </CustomerRootStack.Navigator>
    );
}

export type CustomerBottomTabParamList = {
    ExploreScreen: undefined;
    AccountScreen: undefined;
    AppointmentsScreen: undefined;
    FavoritesScreen: undefined;
    NotificationsScreen: undefined;
};

const Tab = createBottomTabNavigator<CustomerBottomTabParamList>();

function CustomerBottomTab() {
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
                            style={{ marginBottom: 4 }}
                        />
                    ),
                    tabBarLabel: "Favoriler",
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
                            style={{ marginBottom: 4 }}
                        />
                    ),
                    tabBarLabel: "Randevular",
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
                            style={{ marginBottom: 4 }}
                        />
                    ),
                    tabBarLabel: "Keşfet",
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
                            style={{ marginBottom: 4 }}
                        />
                    ),
                    tabBarLabel: "Bildirimler",
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
                            style={{ marginBottom: 4 }}
                        />
                    ),
                    tabBarLabel: "Hesabım",
                }}
                component={AccountScreen}
            />
        </Tab.Navigator>
    );
}

export type CustomerStackParamList = {
    SearchScreen: undefined;
};

const Stack = createNativeStackNavigator<CustomerStackParamList>();

function CustomerStack() {
    const navigation =
        useNavigation<NativeStackNavigationProp<CustomerRootStackParamList>>();

    return (
        <Stack.Navigator>
            <Stack.Screen
                name="SearchScreen"
                component={SearchScreen}
                options={() => ({
                    headerShown: true,
                    headerTitle: "Arama yap",
                    headerLeft: () => (
                        <Pressable
                            onPress={() =>
                                navigation.navigate("CustomerBottomTab")
                            }
                        >
                            <FontAwesomeIcon
                                icon={faArrowLeft}
                                size={14}
                                style={{ marginLeft: 15 }}
                            />
                        </Pressable>
                    ),
                })}
            ></Stack.Screen>
        </Stack.Navigator>
    );
}
