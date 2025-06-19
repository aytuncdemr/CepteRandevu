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
                        <View className="mr-4 max-w-[185px]">
                            <Image
                                source={{ uri: business.picture }}
                                style={{
                                    width: 180,
                                    height: 100,
                                    borderRadius: 10,
                                }}
                            />
                            <Text className="mt-2 text-lg font-semibold">
                                {business.name}
                            </Text>
                            <Stars
                                isHorizontal
                                averageStar={business.averageStar}
                            ></Stars>
                        </View>
                    </Pressable>
                ))}
            </ScrollView>
        </>
    );
}
