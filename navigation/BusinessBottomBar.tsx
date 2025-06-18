import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AccountScreen from "../screens/business/AccountScreen";
import CommentsScreen from "../screens/business/CommentsScreen";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
    faBuilding,
    faBusinessTime,
    faListSquares,
    faMessage,
    faUserCircle,
} from "@fortawesome/free-solid-svg-icons";
import AppointmentsScreen from "../screens/global/AppointmentsScreen";

export type BusinessBottomTabParamList = {
    AppointmentsScreen: undefined;
    AccountScreen: undefined;
    CommentsScreen: undefined;
};

const Tab = createBottomTabNavigator<BusinessBottomTabParamList>();

export default function BusinessBottomBar() {
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
                    tabBarIcon: ({ color, size, focused }) => (
                        <FontAwesomeIcon
                            size={size}
                            color={color}
                            icon={faBuilding}
                            style={{ marginBottom: 4 }}
                        ></FontAwesomeIcon>
                    ),
                    tabBarLabel: "Hesabım",
                }}
            />
        </Tab.Navigator>
    );
}
