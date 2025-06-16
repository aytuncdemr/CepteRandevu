import { ScrollView, Text, View } from "react-native";
import { useContext, useEffect, useState } from "react";
import { Business } from "../../interfaces/Business";
import handleFetchError from "../../utils/handleFetchError";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import LoadingScreen from "../global/LoadingScreen";
import VerticalList from "../../components/VerticalList";

export default function FavoritesScreen() {
    const authContext = useContext(AuthContext);

    const [businesses, setBusinesses] = useState<Business[] | null>(null);
    useEffect(() => {
        async function fetchFavoriteBusinesses() {
            try {
                const { data } = await axios.get(
                    `http://127.0.0.1:3000/api/v1/businesses`
                );
                setBusinesses(data as Business[]);
            } catch (error) {
                handleFetchError(error);
            }
        }

        fetchFavoriteBusinesses();
    }, []);

    if (!businesses) {
        return <LoadingScreen />;
    }
    return (
        <ScrollView className="flex-1 py-12 px-4">
            <View className="mb-6 ">
                <Text className="big-heading text-purple-600">Favoriler</Text>
            </View>
            <View className="mb-4">
                <VerticalList businesses={businesses}></VerticalList>
            </View>
        </ScrollView>
    );
}
