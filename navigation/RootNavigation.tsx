import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/global/LoginScreen";
import RegisterScreen from "../screens/global/RegisterScreen";
import CustomerBottomBar from "./CustomerBottomBar";
import BusinessBottomBar from "./BusinessBottomBar";
import { SafeAreaView } from "react-native";

export type RootStackParamList = {
    LoginScreen: undefined;
    CustomerScreens: undefined;
    BusinessScreens: undefined;
    RegisterScreen: { isCustomer: boolean };
    ResetPasswordModal: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigation() {
    return (
        <SafeAreaView className="flex-1">
            <NavigationContainer
                theme={{
                    ...DefaultTheme,
                    colors: {
                        ...DefaultTheme.colors,
                        background: "white",
                    },
                }}
            >
                <Stack.Navigator
                    screenOptions={{
                        headerShown: false,
                    }}
                >
                    <Stack.Screen name="LoginScreen" component={LoginScreen} />
                    <Stack.Screen
                        name="RegisterScreen"
                        component={RegisterScreen}
                    />

                    <Stack.Screen
                        name="CustomerScreens"
                        component={CustomerBottomBar}
                    ></Stack.Screen>
                    <Stack.Screen
                        name="BusinessScreens"
                        component={BusinessBottomBar}
                    ></Stack.Screen>
                </Stack.Navigator>
            </NavigationContainer>
        </SafeAreaView>
    );
}
