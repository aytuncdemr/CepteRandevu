import { ActivityIndicator, View, Text } from "react-native";

export default function LoadingScreen() {
    return (
        <View className="flex items-center justify-center py-24">
            <ActivityIndicator size="large" color="#9333ea" />
            <Text className="mt-4 text-lg">Yükleniyor...</Text>
        </View>
    );
}
