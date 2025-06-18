import { useContext, useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { AuthContext } from "../../context/AuthContext";
import handleFetchError from "../../utils/handleFetchError";
import axios from "axios";
import { Business } from "../../interfaces/Business";
import LoadingScreen from "../global/LoadingScreen";

export default function AccountScreen() {
    const authContext = useContext(AuthContext);

    const [business, setBusiness] = useState<Business | null>(null);

    useEffect(() => {
        async function fetchBusiness() {
            try {
                const { data } = await axios.get(
                    "http://127.0.0.1:3000/api/v1/businesses/test"
                );
            } catch (error) {
                handleFetchError(error);
            }
        }
        fetchBusiness();
    }, []);

    if(!business){
        return <LoadingScreen></LoadingScreen>
    }

    return (
        <ScrollView className="flex-1">
            <View className="px-4 py-12">
                <Text className="big-heading text-purple-600">Hesap</Text>
            </View>
            <View className="flex flex-col gap-4 px-4 mb-6">
                <Text className="text-lg">Hesap bilgileri</Text>
                <Text className="text-lg">Güvenlik ayarları</Text>
                <Text className="text-lg">Ödeme yöntemleri</Text>
                <Text className="text-lg">Yardım ve destek</Text>
            </View>
        </ScrollView>
    );
}
