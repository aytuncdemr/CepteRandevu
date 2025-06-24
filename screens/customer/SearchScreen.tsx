import { Text, View } from "react-native";
import SearchBar from "../../components/SearchBar";
import { useEffect, useState } from "react";
import { Business } from "../../interfaces/Business";
import axios from "axios";
import handleFetchError from "../../utils/handleFetchError";
import LoadingScreen from "../global/LoadingScreen";
import VerticalList from "../../components/VerticalList";
import businessQueryFilter from "../../utils/businessQueryFilter";
import { API_URL } from "../../data/API_URL";

export default function SearchScreen() {
    const [query, setQuery] = useState("");
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

        const id = setTimeout(() => fetchBusinesses(), 1000);

        return () => clearTimeout(id);
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
                            businessQueryFilter(
                                query.toLowerCase().trim(),
                                business
                            )
                        )}
                    ></VerticalList>
                )}
            </View>
        </View>
    );
}
