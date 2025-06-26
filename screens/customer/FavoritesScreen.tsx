import { ScrollView, Text, View } from "react-native";
import { useContext, useEffect, useState } from "react";
import { Business } from "../../interfaces/Business";
import handleFetchError from "../../utils/handleFetchError";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import LoadingScreen from "../global/LoadingScreen";
import VerticalList from "../../components/VerticalList";
import { API_URL } from "../../data/API_URL";
import { useIsFocused } from "@react-navigation/native";

export default function FavoritesScreen() {
    const authContext = useContext(AuthContext);
    const isFocused = useIsFocused();

    const [businesses, setBusinesses] = useState<Business[] | null>(null);
    useEffect(() => {
        async function fetchFavoriteBusinesses() {
            try {
                const { data } = await axios.get(
                    API_URL + `/customers/${authContext?.id}/favorites`
                );
                setBusinesses(data);
            } catch (error) {
                handleFetchError(error);
            }
        }
        if (isFocused) {
            fetchFavoriteBusinesses();
        } else {
            setBusinesses(null);
        }
    }, [isFocused]);

    if (!businesses) {
        return <LoadingScreen />;
    }
    return (
        <ScrollView className="flex-1 py-12 px-4">
            <View className="mb-6 ">
                <Text className="big-heading text-violet-600">Favoriler</Text>
            </View>
            <View className="mb-4">
                <View className="mb-1">
                    <Text className="text-2xl mt-4 text-violet-600">
                        Favori işletmeler
                    </Text>
                </View>
                <VerticalList
                    isFavorites
                    setBusinesses={setBusinesses}
                    businesses={businesses}
                ></VerticalList>
            </View>
        </ScrollView>
    );
}
