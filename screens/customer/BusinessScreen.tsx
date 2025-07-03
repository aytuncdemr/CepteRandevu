import { RouteProp, useIsFocused, useRoute } from "@react-navigation/native";
import { ScrollView } from "react-native";
import { CustomerStackParamList } from "../../navigation/CustomerNavigation";
import { useEffect, useState } from "react";
import { Business } from "../../interfaces/Business";
import LoadingScreen from "../global/LoadingScreen";
import handleFetchError from "../../utils/handleFetchError";
import axios from "axios";
import BusinessCard from "../../components/BusinessCard";
import { API_URL } from "../../data/API_URL";

export default function BusinessScreen() {
    const route =
        useRoute<RouteProp<CustomerStackParamList, "BusinessScreen">>();
    const isFocused = useIsFocused();
    const id = route.params.id;

    const [business, setBusiness] = useState<Business | null>(null);

    useEffect(() => {
        async function fetchBusiness() {
            try {
                const { data } = await axios.get(API_URL + `/businesses/${id}`);
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
    }, [isFocused]);

    if (!business) {
        return <LoadingScreen></LoadingScreen>;
    }

    return (
        <ScrollView className="flex-1">
            <BusinessCard business={business}></BusinessCard>
        </ScrollView>
    );
}
