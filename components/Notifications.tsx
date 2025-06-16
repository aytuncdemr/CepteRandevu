import { faCalendarCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { StyleSheet, Text, View } from "react-native";
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
                        <View>
                            <FontAwesomeIcon
                                style={{ color: "rgb(255, 126, 42)" }}
                                icon={faCalendarCheck}
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
                            <Text className="text-gray-500 text-base">
                                {notification.date}
                            </Text>
                        </View>
                    </View>
                );
            })}
        </View>
    );
}
