import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AccountScreen from "../screens/business/AccountScreen";
import CommentsScreen from "../screens/business/CommentsScreen";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
    faBuilding,
    faListSquares,
    faMessage,
} from "@fortawesome/free-solid-svg-icons";
import AppointmentsScreen from "../screens/global/AppointmentsScreen";
import { Pressable, Text, View } from "react-native";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "./RootNavigation";

export type BusinessBottomTabParamList = {
    AppointmentsScreen: undefined;
    AccountScreen: undefined;
    CommentsScreen: undefined;
};

const Tab = createBottomTabNavigator<BusinessBottomTabParamList>();

export default function BusinessBottomBar() {
    const authContext = useContext(AuthContext);
    const navigator =
        useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    return (
        <Tab.Navigator
            screenOptions={{
                tabBarActiveTintColor: "rgb(168, 85, 247)",
                headerShown: false,
            }}
            initialRouteName="AppointmentsScreen"
        >
            <Tab.Screen
                name="CommentsScreen"
                component={CommentsScreen}
                options={{
                    tabBarIcon: ({ color, size, focused }) => (
                        <FontAwesomeIcon
                            size={size}
                            color={color}
                            icon={faMessage}
                            style={{ marginBottom: 2 }}
                        ></FontAwesomeIcon>
                    ),
                    tabBarLabel: "Yorumlar",
                }}
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
                    tabBarLabel: "Randevular",
                }}
            >
                {() => <AppointmentsScreen isCustomer={false} />}
            </Tab.Screen>

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
                            icon={faBuilding}
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
