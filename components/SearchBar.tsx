import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { Pressable, Text, TextInput, View } from "react-native";
import { CustomerRootStackParamList } from "../navigation/CustomerNavigation";
import VerticalList from "./VerticalList";
import { useEffect, useState } from "react";
import handleFetchError from "../utils/handleFetchError";
import axios from "axios";
import { Business } from "../interfaces/Business";
import { API_URL } from "../data/API_URL";

export default function SearchBar({
    isSearching,
    query,
    setQuery,
}: {
    query?: string;
    setQuery?: React.Dispatch<React.SetStateAction<string>>;
    isSearching: boolean;
}) {
    const navigator =
        useNavigation<NavigationProp<CustomerRootStackParamList>>();

    const [AICategories, setAICategories] = useState<string[] | null>(null);
    const [businesses, setBusiness] = useState<Business[] | null>(null);

    useEffect(() => {
        if (isSearching && query) {
            const id = setTimeout(async () => {
                try {
                    const { data } = await axios.post(
                        "https://son-u6p2.onrender.com/api/v1/search",
                        { query }
                    );

                    setAICategories(data);
                } catch (error) {
                    handleFetchError(error);
                }
            }, 1000);

            return () => clearTimeout(id);
        }
    }, [query, isSearching]);

    useEffect(() => {
        async function fetchBusiness() {
            try {
                const { data } = await axios.get(API_URL + "/businesses");
                setBusiness(data);
            } catch (error) {
                handleFetchError(error);
            }
        }
        fetchBusiness();
    }, [AICategories]);

    return (
        <View>
            <Pressable
                onPress={() => {
                    if (!isSearching) {
                        navigator.navigate("CustomerStack", {
                            screen: "SearchScreen",
                        });
                    }
                }}
            >
                <View className="flex flex-row items-center border border-gray-200 p-3 rounded-xl gap-2">
                    <View>
                        <FontAwesomeIcon
                            color="#bbb"
                            icon={faSearch}
                        ></FontAwesomeIcon>
                    </View>

                    <View className="flex-1">
                        {!isSearching && (
                            <Text className="text-gray-400">Ara</Text>
                        )}
                        {isSearching && setQuery && (
                            <TextInput
                                value={query}
                                onChangeText={(e) => setQuery(e)}
                                placeholder="Ara"
                                autoCapitalize="none"
                            ></TextInput>
                        )}
                    </View>
                </View>
            </Pressable>
            {isSearching && (
                <View>
                    <View className="mt-4">
                        <Text className="text-gray-400 text-lg border border-gray-200 rounded-lg p-2 self-start">
                            AI önerileri
                        </Text>
                    </View>
                    <View>
                        {businesses && AICategories && (
                            <VerticalList
                                businesses={businesses?.filter(
                                    (business: Business) =>
                                        AICategories?.includes(
                                            business.category
                                        )
                                )}
                            ></VerticalList>
                        )}
                    </View>
                </View>
            )}
        </View>
    );
}
