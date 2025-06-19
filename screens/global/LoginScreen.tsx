import { Text, View } from "react-native";
import SignInForm from "../../components/SignInForm";
import BottomSign from "../../components/BottomSign";

export default function LoginScreen() {
    return (
        <View className="flex-1">
            <View className=" flex-1 flex flex-col px-4 py-16">
                <View className="mb-16">
                    <Text
                        className={
                            "text-5xl text-center font-semibold mb-4 text-violet-800"
                        }
                    >
                        CepteRandevu
                    </Text>
                    <Text className="text-center text-gray-500 text-xl w-[85%] mx-auto">
                        Kolay ve güvenilir randevu almanın bir numaralı yolu
                    </Text>
                </View>
                <SignInForm></SignInForm>
            </View>
            <BottomSign></BottomSign>
        </View>
    );
}
