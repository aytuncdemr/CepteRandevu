import { useContext, useEffect, useState } from "react";
import { ScrollView } from "react-native";
import { AuthContext } from "../../context/AuthContext";
import handleFetchError from "../../utils/handleFetchError";
import axios from "axios";
import { Business } from "../../interfaces/Business";
import LoadingScreen from "../global/LoadingScreen";
import { API_URL } from "../../data/API_URL";
import BusinessCard from "../../components/BusinessCard";

export default function AccountScreen() {
    const authContext = useContext(AuthContext);
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
        fetchBusiness();
    }, []);

    if (!business) {
        return <LoadingScreen></LoadingScreen>;
    }

    return (
        <ScrollView className="flex-1">
            <BusinessCard isAccount={true} business={business}></BusinessCard>
        </ScrollView>
    );
}
