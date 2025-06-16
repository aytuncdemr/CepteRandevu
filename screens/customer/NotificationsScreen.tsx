import { ScrollView, Text, View } from "react-native";
import LoadingScreen from "../global/LoadingScreen";
import { useEffect, useState } from "react";
import handleFetchError from "../../utils/handleFetchError";
import axios from "axios";
import { Notification } from "../../interfaces/Notification";
import Notifications from "../../components/Notifications";

export default function NotificationsScreen() {
    const [notifications, setNotifications] = useState<Notification[] | null>(
        null
    );

    useEffect(() => {
        async function fetchNotifications() {
            try {
                const { data } = await axios.get<Notification[]>(
                    "http://127.0.0.1:3000/api/v1/notifications"
                );
                setNotifications(data);
            } catch (error) {
                handleFetchError(error);
            }
        }

        fetchNotifications();
    }, []);

    if (!notifications) {
        return <LoadingScreen></LoadingScreen>;
    }

    return (
        <ScrollView className="flex-1">
            <View className="py-12 px-6">
                <View className="mb-6 ">
                    <Text className="big-heading text-purple-600">
                        Bildirimler
                    </Text>
                </View>
                <Notifications notifications={notifications}></Notifications>
            </View>
        </ScrollView>
    );
}
