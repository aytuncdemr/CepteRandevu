import { RouteProp, useRoute } from "@react-navigation/native";
import { Image, ScrollView, Text, View } from "react-native";
import { CustomerStackParamList } from "../../navigation/CustomerNavigation";
import { useEffect, useState } from "react";
import { Business } from "../../interfaces/Business";
import LoadingScreen from "../global/LoadingScreen";
import handleFetchError from "../../utils/handleFetchError";
import axios from "axios";
import BusinessCard from "../../components/BusinessCard";

export default function BusinessScreen() {
    const route =
        useRoute<RouteProp<CustomerStackParamList, "BusinessScreen">>();
    const id = route.params.id;

    const [business, setBusiness] = useState<Business | null>(null);

    useEffect(() => {
        async function fetchBusiness() {
            try {
                const { data } = await axios.get(
                    `http://127.0.0.1:3000/api/v1/businesses/${id}`
                );

                setBusiness(data);
            } catch (error) {
                handleFetchError(error);
            }
        }
        fetchBusiness();
    }, []);

    if (!business) {
        return <LoadingScreen></LoadingScreen>;
    }

    return (
        <ScrollView className="flex-1">
            <BusinessCard business={business}></BusinessCard>
        </ScrollView>
    );
}
