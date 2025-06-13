import { Image, ScrollView, Text, View } from "react-native";
import { Business } from "../interfaces/Business";
import Stars from "./Stars";

export default function HorizontalList({
    businesses,
}: {
    businesses: Business[];
}) {
    return (
        <>
            <View className="mb-4">
                <Text className="text-2xl text-purple-600">
                    Popüler işletmeler
                </Text>
            </View>
            <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                className="gap-4"
            >
                {businesses.map((business) => (
                    <View key={business.id} className="mr-4 max-w-[132px]">
                        <Image
                            source={{ uri: business.pictures[0] }}
                            style={{
                                width: 124,
                                height: 100,
                                borderRadius: 12,
                            }}
                        />
                        <Text className="mt-2 font-semibold">
                            {business.name}
                        </Text>
                        <Stars averageStar={business.averageStar}></Stars>
                    </View>
                ))}
                {businesses.map((business) => (
                    <View key={business.id} className="mr-4 max-w-[100px]">
                        <Image
                            source={{ uri: business.pictures[0] }}
                            style={{
                                width: 100,
                                height: 100,
                                borderRadius: 12,
                            }}
                        />
                        <Text className="mt-2 font-semibold">
                            {business.name}
                        </Text>
                        <Stars averageStar={business.averageStar}></Stars>
                    </View>
                ))}
                {businesses.map((business) => (
                    <View key={business.id} className="mr-4 max-w-[100px]">
                        <Image
                            source={{ uri: business.pictures[0] }}
                            style={{
                                width: 100,
                                height: 100,
                                borderRadius: 12,
                            }}
                        />
                        <Text className="mt-2 font-semibold">
                            {business.name}
                        </Text>
                        <Stars averageStar={business.averageStar}></Stars>
                    </View>
                ))}
            </ScrollView>
        </>
    );
}
