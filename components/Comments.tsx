import { Pressable, Text, View } from "react-native";
import { Business } from "../interfaces/Business";
import { useEffect, useState } from "react";
import handleFetchError from "../utils/handleFetchError";
import axios from "axios";
import LoadingScreen from "../screens/global/LoadingScreen";
import { Comment } from "../interfaces/Comment";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faUserCircle, faUserTie } from "@fortawesome/free-solid-svg-icons";
import Stars from "./Stars";
import { API_URL } from "../data/API_URL";
import AddComment from "./AddComment";

export default function Comments({
    isCustomer,
    business,
}: {
    business: Business;
    isCustomer?: boolean;
}) {
    const [comments, setComments] = useState<Comment[] | null>(null);
    const [isAddingComment, setIsAddingComment] = useState(false);
    useEffect(() => {
        async function fetchComments() {
            try {
                const { data } = await axios.get(
                    API_URL + `/comments/businesses/${business.id}`
                );
                console.log(API_URL + ``)
                setComments(data);
            } catch (error) {
                handleFetchError(error);
            }
        }

        fetchComments();
    }, [isAddingComment]);

    if (!comments) {
        return <LoadingScreen></LoadingScreen>;
    }

    return (
        <View className="p-4">
            <Text
                className={`text-violet-700 text-4xl text-center ${
                    !isCustomer && "mb-8 text-5xl"
                }`}
            >
                Yorumlar
            </Text>

            {isCustomer && isAddingComment && (
                <AddComment
                    setIsAddingComment={setIsAddingComment}
                    business={business}
                ></AddComment>
            )}
            {!isAddingComment && isCustomer && (
                <Pressable
                    className="mt-8"
                    onPress={() => setIsAddingComment(true)}
                >
                    <View className="button-outer flex flex-row items-center justify-center !p-2 !bg-white border !border-violet-500/40 w-1/3 max-w-[1/3] shadow-none">
                        <Text className="button-text !text-base text-center !text-violet-600">
                            Yorum Ekle
                        </Text>
                    </View>
                </Pressable>
            )}
            <View className="flex flex-col gap-8 mt-4">
                {comments.map((comment: Comment) => {
                    return (
                        <View
                            className="relative border border-gray-300 p-3 rounded-lg"
                            key={comment.id}
                        >
                            <View className="flex flex-row items-center gap-4">
                                <View className="bg-violet-200 flex items-center justify-center p-3 rounded-xl">
                                    <FontAwesomeIcon
                                        icon={faUserCircle}
                                        size={36}
                                        color="#a78bfa"
                                    ></FontAwesomeIcon>
                                </View>
                                <View className="flex  flex-col gap-1">
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
                            <View
                                style={{ alignSelf: "flex-start" }}
                                className="  bg-orange-500 rounded-lg py-1 px-2 flex flex-row items-center gap-3 mt-2"
                            >
                                <FontAwesomeIcon
                                    color="white"
                                    icon={faUserTie}
                                />
                                <Text className=" text-white font-bold">
                                    {comment.worker}
                                </Text>
                            </View>
                            <View className="  bg-orange-500 rounded-lg py-1 px-2 absolute top-2 right-2">
                                <Text className=" text-white font-bold">
                                    {comment.service}
                                </Text>
                            </View>
                        </View>
                    );
                })}
            </View>
        </View>
    );
}
