import { Text, View } from "react-native";
import SearchBar from "../../components/SearchBar";
import { useEffect, useState } from "react";
import { Business } from "../../interfaces/Business";
import axios from "axios";
import handleFetchError from "../../utils/handleFetchError";
import LoadingScreen from "../global/LoadingScreen";
import VerticalList from "../../components/VerticalList";
import businessQueryFilter from "../../utils/businessQueryFilter";

export default function SearchScreen() {
    const [query, setQuery] = useState("");
    const [businesses, setBusinesses] = useState<Business[] | null>(null);

    useEffect(() => {
        async function fetchBusinesses() {
            setBusinesses(null);
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
    }, [query]);

    return (
        <View className="flex-1 py-12 px-6">
            <View>
                <SearchBar
                    query={query}
                    setQuery={setQuery}
                    isSearching={true}
                ></SearchBar>
            </View>
            <View className="flex-1">
                {!businesses && <LoadingScreen></LoadingScreen>}
                {businesses && (
                    <VerticalList
                        businesses={businesses.filter((business: Business) =>
                            businessQueryFilter(query.toLowerCase().trim(), business)
                        )}
                    ></VerticalList>
                )}
            </View>
        </View>
    );
}
