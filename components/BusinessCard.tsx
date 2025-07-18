import { Image, Pressable, Text, View } from "react-native";
import { Business } from "../interfaces/Business";
import Stars from "./Stars";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
    faBookmark,
    faEnvelope,
    faMapLocation,
    faMapPin,
    faPhone,
    faUserTie,
} from "@fortawesome/free-solid-svg-icons";
import Comments from "./Comments";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { CustomerStackParamList } from "../navigation/CustomerNavigation";
import { useNavigation } from "@react-navigation/native";
import Toast from "react-native-toast-message";
import { API_URL } from "../data/API_URL";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import handleFetchError from "../utils/handleFetchError";
import BusinessUpdateModal from "./BusinessUpdateModal";

export default function BusinessCard({
    business,
    isAccount,
}: {
    isAccount?: boolean;
    business: Business;
}) {
    const navigation =
        useNavigation<NativeStackNavigationProp<CustomerStackParamList>>();
    const authContext = useContext(AuthContext);
    const [isFavorited, setIsFavorited] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    async function addFavoriteHandler(id: string) {
        try {
            const { data } = await axios.post(
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
        <>
            <View className="relative flex flex-col gap-2">
                <View>
                    <Image
                        className="w-full h-64 "
                        source={{ uri: business.picture }}
                    ></Image>

                    <Pressable
                        onPress={() => {
                            if (!isAccount) {
                                navigation.push("GetAppointmentScreen", {
                                    business: business,
                                });
                            } else {
                                setIsVisible(true);
                            }
                        }}
                    >
                        <View
                            className="max-w-[1/3] w-1/3 rounded-xl absolute -bottom-3 right-4 "
                            style={{ backgroundColor: "rgb(255, 126, 42)" }}
                        >
                            <Text className="text-white text-center py-3 text-xl font-semibold">
                                {isAccount ? "Düzenle" : "Randevu Al"}
                            </Text>
                        </View>
                    </Pressable>
                    {!isAccount && (
                        <View className="absolute top-4 right-4">
                            <Pressable
                                onPress={() => {
                                    if (!isFavorited) {
                                        addFavoriteHandler(business.id);
                                        setIsFavorited(true);
                                    }
                                }}
                            >
                                <View style={{ zIndex: 10000 }}>
                                    <FontAwesomeIcon
                                        color={
                                            isFavorited ? "#ff7e2a" : "white"
                                        }
                                        size={27}
                                        icon={faBookmark}
                                    ></FontAwesomeIcon>
                                </View>
                            </Pressable>
                        </View>
                    )}
                </View>
                <View className="px-4 py-6">
                    <Text className="text-4xl text-violet-800">
                        {business.name}
                    </Text>
                    <Stars
                        isHorizontal={true}
                        averageStar={business.averageStar}
                    ></Stars>
                    <View className="mt-2 flex flex-row items-center gap-2">
                        <FontAwesomeIcon
                            style={{ color: "red" }}
                            icon={faMapPin}
                        ></FontAwesomeIcon>
                        <Text>{business.city}</Text>
                    </View>
                    <View className="mt-4">
                        <Text className="text-2xl font-semibold">Hakkında</Text>
                        <Text className="text-gray-700 text-lg">
                            {business.description}
                        </Text>
                    </View>
                    <View className="mt-4">
                        <Text className="text-2xl font-semibold">
                            Çalışma Günleri
                        </Text>
                        <View className="flex flex-row flex-wrap gap-2 mt-2">
                            {business.workDays.map((day, index) => {
                                return (
                                    <Text
                                        className=" bg-green-500 text-white font-bold p-3 rounded-lg"
                                        key={index}
                                    >
                                        {day}
                                    </Text>
                                );
                            })}
                        </View>
                    </View>
                    <View className="mt-4">
                        <Text className="text-2xl font-semibold">
                            İletişim Bilgileri
                        </Text>
                        <View className="flex flex-row items-center gap-2 mt-2">
                            <FontAwesomeIcon
                                style={{ color: "purple" }}
                                icon={faPhone}
                            ></FontAwesomeIcon>
                            <Text className="text-lg text-gray-500">
                                {business.phone}
                            </Text>
                        </View>
                        <View className=" flex flex-row items-center gap-2 mt-2">
                            <FontAwesomeIcon
                                style={{ color: "purple" }}
                                icon={faEnvelope}
                            ></FontAwesomeIcon>
                            <Text className="text-lg text-gray-500">
                                {business.email}
                            </Text>
                        </View>
                        <View className="flex flex-row items-center gap-2 mt-2">
                            <FontAwesomeIcon
                                style={{ color: "purple" }}
                                icon={faMapLocation}
                            ></FontAwesomeIcon>
                            <Text className="text-lg text-gray-500">
                                {business.address}
                            </Text>
                        </View>
                    </View>

                    <View className="mt-4">
                        <Text className="text-2xl font-semibold">
                            Hizmetler
                        </Text>
                        <View className="flex flex-row flex-wrap gap-2 mt-2">
                            {business.services.map((service, index) => {
                                return (
                                    <Text
                                        className=" bg-green-500 text-white font-bold p-3 rounded-lg"
                                        key={index}
                                    >
                                        {service.title} - {service.price}TL
                                    </Text>
                                );
                            })}
                        </View>
                    </View>
                    <View className="mt-4">
                        <Text className="text-2xl font-semibold">
                            Çalışanlar
                        </Text>
                        <View className="flex flex-row flex-wrap gap-2 mt-2">
                            {business.workers.map((worker, index) => {
                                return (
                                    <View
                                        key={index}
                                        className=" bg-orange-100 rounded-lg py-1 px-2 flex flex-row items-center gap-3 mt-2"
                                    >
                                        <FontAwesomeIcon
                                            color="#f97316"
                                            icon={faUserTie}
                                        />
                                        <Text className="text-lg text-orange-500 font-bold">
                                            {worker}
                                        </Text>
                                    </View>
                                );
                            })}
                        </View>
                    </View>
                </View>

                {!isAccount && (
                    <View>
                        <Comments
                            isCustomer={true}
                            business={business}
                        ></Comments>
                    </View>
                )}
            </View>
            {isAccount && (
                <BusinessUpdateModal
                    isVisible={isVisible}
                    setIsVisible={setIsVisible}
                    business={business}
                ></BusinessUpdateModal>
            )}
        </>
    );
}
