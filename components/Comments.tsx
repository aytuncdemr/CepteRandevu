import { Text, View } from "react-native";
import { Business } from "../interfaces/Business";
import { useEffect, useState } from "react";
import handleFetchError from "../utils/handleFetchError";
import axios from "axios";
import LoadingScreen from "../screens/global/LoadingScreen";
import { Comment } from "../interfaces/Comment";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import Stars from "./Stars";

export default function Comments({
    isCustomer,
    business,
}: {
    business: Business;
    isCustomer: boolean;
}) {
    const [comments, setComments] = useState<Comment[] | null>(null);

    useEffect(() => {
        async function fetchComments() {
            try {
                const { data } = await axios.get(
                    `http://127.0.0.1:3000/api/v1/businesses/${business.id}/comments`
                );
                setComments(data);
            } catch (error) {
                handleFetchError(error);
            }
        }

        fetchComments();
    }, []);

    if (!comments) {
        return <LoadingScreen></LoadingScreen>;
    }

    return (
        <View className="p-4">
            <Text className="text-purple-700 text-4xl text-center">
                Yorumlar
            </Text>
            <View className="flex flex-col gap-8 mt-8">
                {comments.map((comment: Comment) => {
                    return (
                        <View
                            className="relative border border-gray-300 p-3 rounded-lg"
                            key={comment.id}
                        >
                            <View className="flex flex-row items-center gap-4">
                                <View>
                                    <FontAwesomeIcon
                                        icon={faUserCircle}
                                        size={48}
                                    ></FontAwesomeIcon>
                                </View>
                                <View className="flex flex-col gap-1">
                                    <Text className="text-xl">
                                        {comment.customer}
                                    </Text>
                                    <Stars
                                        isComment
                                        isHorizontal
                                        averageStar={comment.star}
                                    ></Stars>
                                    <Text className="text-lg text-gray-500">
                                        {comment.date.split(" ")[0]}
                                    </Text>
                                </View>
                            </View>
                            <View className="mt-4">
                                <Text className="text-lg text-gray-600">
                                    {comment.comment}
                                </Text>
                            </View>
                            <View className="absolute top-2 right-2">
                                <Text className="text-gray-500">
                                    {comment.service}/{comment.worker}
                                </Text>
                            </View>
                        </View>
                    );
                })}
            </View>
        </View>
    );
}
