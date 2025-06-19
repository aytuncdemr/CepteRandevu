import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/global/LoginScreen";
import RegisterScreen from "../screens/global/RegisterScreen";
import BusinessBottomBar from "./BusinessBottomBar";
import { Pressable, SafeAreaView, Text } from "react-native";
import CustomerNavigation from "./CustomerNavigation";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
    faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";

export type RootStackParamList = {
    LoginScreen: undefined;
    RegisterScreen: { isCustomer: boolean };
    CustomerNavigation: undefined;
    BusinessBottomBar: undefined;
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
                        options={({ navigation }) => ({
                            headerShown: true,
                            title: "Kayıt ol",
                            headerLeft: () => (
                                <Pressable onPress={() => navigation.goBack()}>
                                    <FontAwesomeIcon
                                        icon={faChevronLeft}
                                        size={21}
                                        style={{ marginLeft: 15 }}
                                    />
                                </Pressable>
                            ),
                        })}
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
