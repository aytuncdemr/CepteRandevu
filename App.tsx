import "./global.css";

import { StatusBar } from "expo-status-bar";
import { View } from "react-native";
import AuthContextProvider from "./context/AuthContext";
import Toast from "react-native-toast-message";
import RootNavigation from "./navigation/RootNavigation";

export default function App() {
    return (
        <View className="flex-1">
            <StatusBar style="dark" />
            <AuthContextProvider>
                <RootNavigation></RootNavigation>
            </AuthContextProvider>
            <Toast />
        </View>
    );
}
