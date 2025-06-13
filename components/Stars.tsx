import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { Text, View } from "react-native";

export default function Stars({ averageStar }: { averageStar: number }) {
    const stars = [];

    for (let i = 0; i < 5; i++) {
        stars.push(
            <FontAwesomeIcon
                style={{
                    color: i + 1 > Math.floor(averageStar) ? "gray" : "#FFD700",
                }}
                icon={faStar}
                key={i}
            ></FontAwesomeIcon>
        );
    }

    return (
        <View>
            <View className="flex flex-row">{stars}</View>
            <Text className="mt-2">{averageStar}</Text>
        </View>
    );
}
