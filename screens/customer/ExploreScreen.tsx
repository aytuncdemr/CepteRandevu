import { Text, View, ScrollView } from "react-native";
import SearchBar from "../../components/SearchBar";
import { useEffect, useState } from "react";
import { Business } from "../../interfaces/Business";
import handleFetchError from "../../utils/handleFetchError";
import axios from "axios";
import LoadingScreen from "../global/LoadingScreen";
import HorizontalList from "../../components/HorizontalList";
import VerticalList from "../../components/VerticalList";

export default function ExploreScreen() {
    const [businesses, setBusinesses] = useState<Business[] | null>(null);

    useEffect(() => {
        async function fetchBusinesses() {
            try {
                const { data } = await axios.get(
                    "http://127.0.0.1:3000/api/v1/businesses"
                );

                setBusinesses(data);
            } catch (error) {
                handleFetchError(error);
            }
        }

        fetchBusinesses();
    }, []);

    if (!businesses) {
        return <LoadingScreen></LoadingScreen>;
    }

    return (
        <ScrollView showsVerticalScrollIndicator={false} className="flex-1 py-12 px-4">
            <View>
                <Text
                    className={
                        "text-5xl text-center font-semibold mb-3 text-purple-700"
                    }
                >
                    CepteRandevu
                </Text>
                <Text className="text-center text-xl text-gray-400">
                    İhtiyacın olan randevuyu kolayca bul
                </Text>
            </View>
            <View className="p-6">
                <SearchBar isSearching={false}></SearchBar>
                <View className="my-4">
                    <HorizontalList businesses={businesses}></HorizontalList>
                </View>
                <View>
                    <VerticalList businesses={businesses}></VerticalList>
                </View>
            </View>
        </ScrollView>
    );
}
