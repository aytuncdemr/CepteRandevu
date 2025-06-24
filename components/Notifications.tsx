import { faBell, faCalendar, faClock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { Text, View } from "react-native";
import { Notification } from "../interfaces/Notification";

export default function Notifications({
    notifications,
}: {
    notifications: Notification[];
}) {
    return (
        <View className="flex flex-col gap-4">
            {notifications.map((notification) => {
                return (
                    <View
                        className="border border-gray-300 p-4 rounded-lg flex flex-row gap-4 "
                        key={notification.id}
                    >
                        <View className="bg-violet-100 flex items-center justify-center w-16 h-16 rounded-xl">
                            <FontAwesomeIcon
                                style={{ color: "#a78bfa" }}
                                icon={faBell}
                                size={36}
                            ></FontAwesomeIcon>
                        </View>
                        <View className="flex flex-col flex-shrink gap-1">
                            <Text className="text-xl font-semibold">
                                {notification.title}
                            </Text>
                            <Text className="text-lg text-gray-600">
                                {notification.description}
                            </Text>
                            <View className="flex flex-row gap-4 mt-4 items-center">
                                <View className="flex flex-row gap-2 items-center">
                                    <FontAwesomeIcon
                                        icon={faCalendar}
                                        size={16}
                                        color="#F28C28"
                                    ></FontAwesomeIcon>
                                    <Text className="text-gray-500 text-lg">
                                        {notification.date.split(" ")[0]}
                                    </Text>
                                </View>
                                <View className="flex  flex-row gap-2 items-center">
                                    <FontAwesomeIcon
                                        color="#8b5cf6"
                                        icon={faClock}
                                    ></FontAwesomeIcon>
                                    <Text className="text-gray-500 text-lg">
                                        {notification.date.split(" ")[1]}
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </View>
                );
            })}
        </View>
    );
}
