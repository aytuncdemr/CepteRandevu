import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { Pressable, Text, TextInput, View } from "react-native";
import { CustomerRootStackParamList } from "../navigation/CustomerNavigation";

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

    return (
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
                    {!isSearching && <Text className="text-gray-400">Ara</Text>}
                    {isSearching && (
                        <TextInput
                            value={query}
                            onChangeText={(e) =>
                                (
                                    setQuery as React.Dispatch<
                                        React.SetStateAction<string>
                                    >
                                )(e)
                            }
                            placeholder="Ara"
                            autoCapitalize="none"
                        ></TextInput>
                    )}
                </View>
            </View>
        </Pressable>
    );
}
