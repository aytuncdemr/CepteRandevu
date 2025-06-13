import { ActivityIndicator, View, Text } from "react-native";

export default function LoadingScreen() {
    return (
        <View className="flex-1 flex items-center justify-center">
            <ActivityIndicator size="large" color="#9333ea" />
        </View>
    );
}
