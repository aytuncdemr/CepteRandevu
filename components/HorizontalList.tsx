import { Image, Pressable, ScrollView, Text, View } from "react-native";
import { Business } from "../interfaces/Business";
import Stars from "./Stars";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { CustomerRootStackParamList } from "../navigation/CustomerNavigation";

export default function HorizontalList({
    businesses,
}: {
    businesses: Business[];
}) {
    const navigation =
        useNavigation<NativeStackNavigationProp<CustomerRootStackParamList>>();

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
                    <Pressable
                        key={business.id}
                        onPress={() => {
                            navigation.navigate("CustomerStack", {
                                screen: "BusinessScreen",
                                params: {
                                    id: business.id,
                                    title: business.name,
                                },
                            });
                            
                        }}
                    >
                        <View className="mr-4 max-w-[132px]">
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
                    </Pressable>
                ))}
            </ScrollView>
        </>
    );
}
