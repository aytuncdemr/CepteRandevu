import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ExploreScreen from "../screens/customer/ExploreScreen";
import AccountScreen from "../screens/customer/AccountScreen";
import NotificationsScreen from "../screens/customer/NotificationsScreen";
import FavoritesScreen from "../screens/customer/FavoritesScreen";
import AppointmentsScreen from "../screens/global/AppointmentsScreen";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
    faBell,
    faBookmark,
    faCalendarCheck,
    faChevronLeft,
    faHouse,
    faUserCircle,
} from "@fortawesome/free-solid-svg-icons";
import {
    createNativeStackNavigator,
    NativeStackNavigationProp,
} from "@react-navigation/native-stack";
import { NavigatorScreenParams, useNavigation } from "@react-navigation/native";
import SearchScreen from "../screens/customer/SearchScreen";
import { Pressable, Text, View } from "react-native";
import BusinessScreen from "../screens/customer/BusinessScreen";
import { Business } from "../interfaces/Business";
import GetAppointmentScreen from "../screens/customer/GetAppointmentScreen";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { RootStackParamList } from "./RootNavigation";

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
    const authContext = useContext(AuthContext);
    const navigator =
        useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarActiveTintColor: "#7e22ce",
                headerShown: false,
            }}
            initialRouteName="ExploreScreen"
        >
            <Tab.Screen
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesomeIcon
                            icon={faBookmark}
                            size={size}
                            color={color}
                            style={{ marginBottom: 6 }}
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
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesomeIcon
                            size={size}
                            color={color}
                            icon={faCalendarCheck}
                            style={{ marginBottom: 6 }}
                        />
                    ),
                    tabBarLabel: "Randevular",
                }}
            >
                {() => <AppointmentsScreen isCustomer={true} />}
            </Tab.Screen>
            <Tab.Screen
                name="ExploreScreen"
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesomeIcon
                            icon={faHouse}
                            size={size}
                            color={color}
                            style={{ marginBottom: 6 }}
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
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesomeIcon
                            icon={faBell}
                            size={size}
                            color={color}
                            style={{ marginBottom: 6 }}
                        />
                    ),
                    tabBarLabel: "Bildirimler",
                }}
            />
            <Tab.Screen
                name="AccountScreen"
                component={AccountScreen}
                options={{
                    headerShown: true,
                    headerTitle: "",
                    headerShadowVisible: false,
                    headerStyle: {
                        elevation: 0,
                        shadowOpacity: 0,
                        borderBottomWidth: 0,
                    },
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesomeIcon
                            icon={faUserCircle}
                            size={size}
                            color={color}
                            style={{ marginBottom: 6 }}
                        />
                    ),
                    headerRight: () => (
                        <Pressable
                            onPress={() => {
                                authContext?.setId(null);
                                navigator.navigate("LoginScreen");
                            }}
                        >
                            <View style={{ marginRight: 12 }}>
                                <Text className="text-red-500 text-xl font-semibold">
                                    Çıkış yap
                                </Text>
                            </View>
                        </Pressable>
                    ),
                    tabBarLabel: "Hesabım",
                }}
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
                        <Pressable onPress={() => navigation.goBack()}>
                            <FontAwesomeIcon icon={faChevronLeft} size={21} />
                        </Pressable>
                    ),
                })}
            ></Stack.Screen>
            <Stack.Screen
                name="BusinessScreen"
                component={BusinessScreen}
                options={() => ({
                    headerShown: true,
                    headerTitle: "",
                    headerLeft: () => (
                        <Pressable
                            onPress={() => {
                                navigation.goBack();
                            }}
                        >
                            <FontAwesomeIcon icon={faChevronLeft} size={21} />
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
                            <FontAwesomeIcon icon={faChevronLeft} size={21} />
                        </Pressable>
                    ),
                }}
            />
        </Stack.Navigator>
    );
}
