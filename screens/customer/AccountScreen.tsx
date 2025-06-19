import { Text, View, ScrollView } from "react-native";
import AccountInformation from "../../components/AccountInformation";

export default function AccountScreen() {
    return (
        <ScrollView
            className="flex-1 px-4 py-12"
            contentContainerStyle={{ flexGrow: 1 }}
        >
            <View>
                <Text className="text-center text-4xl font-semibold text-violet-700">
                    Hesabım
                </Text>
            </View>
            <View className="flex-1">
                <AccountInformation></AccountInformation>
            </View>
        </ScrollView>
    );
}
