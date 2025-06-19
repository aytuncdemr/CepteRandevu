import { Image, Pressable, Text, View } from "react-native";
import { Business } from "../interfaces/Business";
import Stars from "./Stars";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
    faEnvelope,
    faMapLocation,
    faMapPin,
    faPhone,
} from "@fortawesome/free-solid-svg-icons";
import Comments from "./Comments";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { CustomerStackParamList } from "../navigation/CustomerNavigation";
import { useNavigation } from "@react-navigation/native";

export default function BusinessCard({ business }: { business: Business }) {
    // IMPORTANT: Change this to use CustomerStackParamList directly
    const navigation =
        useNavigation<NativeStackNavigationProp<CustomerStackParamList>>(); // <--- CHANGE THIS LINE

    return (
        <View>
            <View>
                <Image
                    className="w-full h-64 "
                    source={{ uri: business.pictures[0] }}
                ></Image>
                <Pressable
                    onPress={() => {
                        // Navigate directly to GetAppointmentScreen, as both are in CustomerStack
                        navigation.push("GetAppointmentScreen", {
                            business: business, // Pass the entire business object
                        });
                    }}
                >
                    <View
                        className="max-w-[1/3] w-1/3 rounded-xl absolute -bottom-3 right-4 "
                        style={{ backgroundColor: "rgb(255, 126, 42)" }}
                    >
                        <Text className="text-white text-center py-3 text-xl font-semibold">
                            Randevu Al
                        </Text>
                    </View>
                </Pressable>
            </View>
            <View className="px-4 py-6">
                <Text className="text-4xl text-purple-800">
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
                                    className="border border-gray-200 p-3 rounded-lg"
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
                    <View className="flex flex-row items-center gap-2 mt-2">
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
            </View>
            <View>
                <Comments isCustomer={false} business={business}></Comments>
            </View>
        </View>
    );
}
