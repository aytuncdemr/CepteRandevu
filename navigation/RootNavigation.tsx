import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/global/LoginScreen";
import RegisterScreen from "../screens/global/RegisterScreen";
import BusinessBottomBar from "./BusinessBottomBar";
import { SafeAreaView } from "react-native";
import CustomerNavigation from "./CustomerNavigation";

export type RootStackParamList = {
    LoginScreen: undefined;
    CustomerNavigation: undefined;
    BusinessBottomBar: undefined;
    RegisterScreen: { isCustomer: boolean };
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
                        name="CustomerNavigation"
                        component={CustomerNavigation}
                    ></Stack.Screen>

                    <Stack.Screen
                        name="BusinessBottomBar"
                        component={BusinessBottomBar}
                    ></Stack.Screen>
                </Stack.Navigator>
            </NavigationContainer>
        </SafeAreaView>
    );
}
