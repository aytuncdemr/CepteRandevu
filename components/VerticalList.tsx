import { Image, Pressable, ScrollView, Text, View } from "react-native";
import { Business } from "../interfaces/Business";
import Stars from "./Stars";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { CustomerRootStackParamList } from "../navigation/CustomerNavigation";

export default function VerticalList({
    businesses,
}: {
    businesses: Business[];
}) {
    const navigation =
        useNavigation<NativeStackNavigationProp<CustomerRootStackParamList>>();

    return (
        <ScrollView className="mt-8" showsVerticalScrollIndicator={false}>
            <View className=" flex flex-col gap-6">
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
                    >
                        <View className="relative flex flex-row gap-4">
                            <Image
                                source={{ uri: business.pictures[0] }}
                                className="w-[150] h-[100] rounded-lg"
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
                        </View>
                    </Pressable>
                ))}
            </View>
        </ScrollView>
    );
}
