import { Text, View, ScrollView } from "react-native";
import SearchBar from "../../components/SearchBar";
import { useEffect, useState } from "react";
import { Business } from "../../interfaces/Business";
import handleFetchError from "../../utils/handleFetchError";
import axios from "axios";
import LoadingScreen from "../global/LoadingScreen";
import HorizontalList from "../../components/HorizontalList";
import VerticalList from "../../components/VerticalList";
import { API_URL } from "../../data/API_URL";
import { useIsFocused } from "@react-navigation/native";

export default function ExploreScreen() {
    const isFocused = useIsFocused();

    const [businesses, setBusinesses] = useState<Business[] | null>(null);

    useEffect(() => {
        async function fetchBusinesses() {
            try {
                const { data } = await axios.get(API_URL + "/businesses");
                setBusinesses(data);
            } catch (error) {
                handleFetchError(error);
            }
        }
        if (isFocused) {
            fetchBusinesses();
        } else {
            setBusinesses(null);
        }
    }, [isFocused]);

    if (!businesses) {
        return <LoadingScreen></LoadingScreen>;
    }

    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            className="flex-1 py-12 px-4"
        >
            <View>
                <Text
                    className={
                        "text-5xl text-center font-semibold mb-3 text-violet-700"
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
                    <View className="mb-4">
                        <Text className="text-2xl text-violet-600">
                            En çok ziyaret edilenler
                        </Text>
                    </View>
                    <HorizontalList businesses={businesses}></HorizontalList>
                </View>
                <View>
                    <View className="mb-2">
                        <Text className="text-2xl text-violet-600">
                            Yakınımdakiler
                        </Text>
                    </View>
                    <VerticalList businesses={businesses}></VerticalList>
                </View>
            </View>
        </ScrollView>
    );
}
