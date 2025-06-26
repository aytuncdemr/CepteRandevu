import { ScrollView, View } from "react-native";
import Comments from "../../components/Comments";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Business } from "../../interfaces/Business";
import handleFetchError from "../../utils/handleFetchError";
import { API_URL } from "../../data/API_URL";
import axios from "axios";
import LoadingScreen from "../global/LoadingScreen";
import { useIsFocused } from "@react-navigation/native";

export default function CommentsScreen() {
    const authContext = useContext(AuthContext);
    const isFocused = useIsFocused();

    const [business, setBusiness] = useState<Business | null>(null);

    useEffect(() => {
        async function fetchBusiness() {
            try {
                const { data } = await axios.get(
                    API_URL + "/businesses/" + authContext?.id
                );
                setBusiness(data);
            } catch (error) {
                handleFetchError(error);
            }
        }
        if (isFocused) {
            fetchBusiness();
        } else {
            setBusiness(null);
        }
    }, [authContext, isFocused]);

    if (!business) {
        return <LoadingScreen></LoadingScreen>;
    }

    return (
        <View className="flex-1">
            <ScrollView className="flex-1 py-12 px-4">
                <Comments business={business} />
            </ScrollView>
        </View>
    );
}
