import { Image, Pressable, ScrollView, Text, View } from "react-native";
import { Business } from "../interfaces/Business";
import Stars from "./Stars";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { CustomerRootStackParamList } from "../navigation/CustomerNavigation";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faSquareXmark } from "@fortawesome/free-solid-svg-icons";
import handleFetchError from "../utils/handleFetchError";
import { API_URL } from "../data/API_URL";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import Toast from "react-native-toast-message";

export default function VerticalList({
    businesses,
    isFavorites,
    setBusinesses,
}: {
    businesses: Business[];
    setBusinesses?: React.Dispatch<React.SetStateAction<Business[] | null>>;
    isFavorites?: boolean;
}) {
    const navigation =
        useNavigation<NativeStackNavigationProp<CustomerRootStackParamList>>();
    const authContext = useContext(AuthContext);
    async function deleteFavoriteHandler(id: string) {
        try {
            if (setBusinesses) {
                setBusinesses((prevBusinesses) =>
                    prevBusinesses
                        ? prevBusinesses?.filter(
                              (business) => business.id !== id
                          )
                        : null
                );
            }
            const { data } = await axios.delete(
                API_URL + `/customers/${authContext?.id}/favorites/${id}`
            );

            Toast.hide();

            Toast.show({
                type: "success",
                text1: "Başarılı",
                text2: data.message,
            });
        } catch (error) {
            handleFetchError(error);
        }
    }

    return (
        <ScrollView className="mt-4" showsVerticalScrollIndicator={false}>
            <View className=" flex flex-col gap-8">
                {businesses.map((business) => (
                    <Pressable
                        onPress={() => {
                            navigation.navigate("CustomerStack", {
                                screen: "BusinessScreen",
                                params: {
                                    id: business.id,
                                    title: business.name,
                                },
                            });
                        }}
                        key={business.id}
                        className="relative"
                    >
                        <View className="flex flex-row gap-4">
                            <Image
                                source={{ uri: business.pictures[0] }}
                                className="w-[165] h-[100] rounded-lg"
                            />
                            <View className="py-2 ">
                                <Text className="mt-2 mb-3 font-semibold">
                                    {business.name}
                                </Text>
                                <Stars
                                    averageStar={business.averageStar}
                                ></Stars>
                            </View>
                            <View className="absolute bottom-0 right-0">
                                <Text className="text-base text-gray-400">
                                    {business.category}, {business.city}
                                </Text>
                            </View>
                            {isFavorites && (
                                <View className="absolute top-2 right-2">
                                    <Pressable
                                        onPress={() =>
                                            deleteFavoriteHandler(business.id)
                                        }
                                    >
                                        <View>
                                            <FontAwesomeIcon
                                                color="red"
                                                size={21}
                                                icon={faSquareXmark}
                                            ></FontAwesomeIcon>
                                        </View>
                                    </Pressable>
                                </View>
                            )}
                        </View>
                    </Pressable>
                ))}
            </View>
        </ScrollView>
    );
}
