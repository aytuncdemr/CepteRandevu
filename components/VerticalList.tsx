import { Image, ScrollView, Text, View } from "react-native";
import { Business } from "../interfaces/Business";
import Stars from "./Stars";

export default function VerticalList({
    businesses,
}: {
    businesses: Business[];
}) {
    return (
        <ScrollView className="mt-8" showsVerticalScrollIndicator={false}>
            <View className=" flex flex-col gap-6">
                {businesses.map((business) => (
                    <View
                        key={business.id}
                        className="relative flex flex-row gap-4"
                    >
                        <Image
                            source={{ uri: business.pictures[0] }}
                            style={{
                                width: 150,
                                height: 100,
                                borderRadius: 12,
                            }}
                        />
                        <View className="py-2 ">
                            <Text className="mt-2 mb-3 font-semibold">
                                {business.name}
                            </Text>
                            <Stars averageStar={business.averageStar}></Stars>
                        </View>
                        <View className="absolute bottom-0 right-0">
                            <Text className="text-base text-gray-400">
                                {business.category}, {business.city}
                            </Text>
                        </View>
                    </View>
                ))}
                {businesses.map((business) => (
                    <View
                        key={business.id}
                        className="relative flex flex-row gap-4"
                    >
                        <Image
                            source={{ uri: business.pictures[0] }}
                            style={{
                                width: 150,
                                height: 100,
                                borderRadius: 12,
                            }}
                        />
                        <View className="py-2 ">
                            <Text className="mt-2 mb-3 font-semibold">
                                {business.name}
                            </Text>
                            <Stars averageStar={business.averageStar}></Stars>
                        </View>
                        <View className="absolute bottom-0 right-0">
                            <Text className="text-base text-gray-400">
                                {business.category}, {business.city}
                            </Text>
                        </View>
                    </View>
                ))}
                {businesses.map((business) => (
                    <View
                        key={business.id}
                        className="relative flex flex-row gap-4"
                    >
                        <Image
                            source={{ uri: business.pictures[0] }}
                            style={{
                                width: 150,
                                height: 100,
                                borderRadius: 12,
                            }}
                        />
                        <View className="py-2 ">
                            <Text className="mt-2 mb-3 font-semibold">
                                {business.name}
                            </Text>
                            <Stars averageStar={business.averageStar}></Stars>
                        </View>
                        <View className="absolute bottom-0 right-0">
                            <Text className="text-base text-gray-400">
                                {business.category}, {business.city}
                            </Text>
                        </View>
                    </View>
                ))}
            </View>
        </ScrollView>
    );
}
