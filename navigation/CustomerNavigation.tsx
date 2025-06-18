import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ExploreScreen from "../screens/customer/ExploreScreen";
import AccountScreen from "../screens/customer/AccountScreen";
import NotificationsScreen from "../screens/customer/NotificationsScreen";
import FavoritesScreen from "../screens/customer/FavoritesScreen";
import AppointmentsScreen from "../screens/global/AppointmentsScreen";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
    faArrowLeft,
    faBell,
    faBookmark,
    faChevronLeft,
    faHouse,
    faListSquares,
    faUserCircle,
} from "@fortawesome/free-solid-svg-icons";
import {
    createNativeStackNavigator,
    NativeStackNavigationProp,
} from "@react-navigation/native-stack";
import { NavigatorScreenParams, useNavigation } from "@react-navigation/native";
import SearchScreen from "../screens/customer/SearchScreen";
import { Pressable } from "react-native";
import BusinessScreen from "../screens/customer/BusinessScreen";
import { Business } from "../interfaces/Business";
import GetAppointmentScreen from "../screens/customer/GetAppointmentScreen";

export type CustomerRootStackParamList = {
    CustomerBottomTab: undefined;
    CustomerStack: NavigatorScreenParams<CustomerStackParamList>;
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
                options={{
                    tabBarIcon: ({ color, size, focused }) => (
                        <FontAwesomeIcon
                            size={size}
                            color={color}
                            icon={faListSquares}
                            style={{ marginBottom: 4 }}
                        />
                    ),
                    tabBarLabel: "Randevularım",
                }}
            >
                {() => <AppointmentsScreen isCustomer={true} />}
            </Tab.Screen>
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
    BusinessScreen: { id: string; title: string };
    GetAppointmentScreen: { business: Business };
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
            <Stack.Screen
                name="BusinessScreen"
                component={BusinessScreen}
                options={() => ({
                    headerShown: true,
                    headerTitle: "", // route.params.title
                    headerLeft: () => (
                        <Pressable onPress={() => navigation.goBack()}>
                            <FontAwesomeIcon icon={faChevronLeft} size={20} />
                        </Pressable>
                    ),
                })}
            ></Stack.Screen>
            <Stack.Screen
                name="GetAppointmentScreen"
                component={GetAppointmentScreen}
                options={{
                    headerShown: true,
                    headerTitle: "Randevu Al",
                    headerLeft: () => (
                        <Pressable onPress={() => navigation.goBack()}>
                            <FontAwesomeIcon icon={faChevronLeft} size={20} />
                        </Pressable>
                    ),
                }}
            />
        </Stack.Navigator>
    );
}
