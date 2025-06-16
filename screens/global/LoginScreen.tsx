import { Platform, Text, View } from "react-native";
import SignInForm from "../../components/SignInForm";

export default function LoginScreen() {
    return (
        <View className="flex-1">
            <View
                className=" flex-1 flex flex-col px-4"
                style={{
                    paddingVertical: Platform.select({ ios: 48, android: 96 }),
                }}
            >
                <View className="mb-16">
                    <Text
                        className={"text-5xl text-center font-semibold mb-4 text-purple-700"}
                    >
                        CepteRandevu
                    </Text>
                    <Text className="text-center text-xl w-[85%] mx-auto">
                        Kolay ve güvenilir randevu almanın bir numaralı yolu
                    </Text>
                </View>

                <SignInForm></SignInForm>
            </View>
            <View className="mt-auto mb-4">
                <Text className="text-center text-gray-400">
                    @2025 - CepteRandevu
                </Text>
                <Text className="text-center text-gray-400">
                    Tüm hakları saklıdır.
                </Text>
            </View>
        </View>
    );
}
