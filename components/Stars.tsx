import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { Text, View } from "react-native";

export default function Stars({
    averageStar,
    isHorizontal,
    isComment,
}: {
    averageStar: number;
    isHorizontal?: boolean;
    isComment?: boolean;
}) {
    const stars = [];

    for (let i = 0; i < 5; i++) {
        stars.push(
            <FontAwesomeIcon
                style={{
                    color:
                        i + 1 > Math.floor(averageStar)
                            ? "gray"
                            : "#FFC107",
                }}
                icon={faStar}
                key={i}
            ></FontAwesomeIcon>
        );
    }

    return (
        <View
            style={
                isHorizontal
                    ? { flexDirection: "row", alignItems: "center", gap: 6 }
                    : {}
            }
        >
            <View className="flex flex-row">{stars}</View>
            {!isComment && (
                <Text
                    className="text-gray-600"
                    style={isHorizontal ? { marginTop: 4 } : { marginTop: 6 }}
                >
                    ({averageStar})
                </Text>
            )}
        </View>
    );
}
