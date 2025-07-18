import { ScrollView, Text, View } from "react-native";
import LoadingScreen from "../global/LoadingScreen";
import { useContext, useEffect, useState } from "react";
import handleFetchError from "../../utils/handleFetchError";
import axios from "axios";
import { Notification } from "../../interfaces/Notification";
import Notifications from "../../components/Notifications";
import { API_URL } from "../../data/API_URL";
import { AuthContext } from "../../context/AuthContext";
import { useIsFocused } from "@react-navigation/native";

export default function NotificationsScreen() {
    const authContext = useContext(AuthContext);
    const isFocused = useIsFocused();

    const [notifications, setNotifications] = useState<Notification[] | null>(
        null
    );

    useEffect(() => {
        async function fetchNotifications() {
            try {
                const { data } = await axios.get(
                    API_URL + "/notifications/customers/" + authContext?.id
                );
                setNotifications(data);
            } catch (error) {
                handleFetchError(error);
            }
        }
        if (isFocused) {
            fetchNotifications();
        } else {
            setNotifications(null);
        }
    }, [isFocused]);

    if (!notifications) {
        return <LoadingScreen></LoadingScreen>;
    }

    return (
        <ScrollView className="flex-1">
            <View className="py-16 px-6">
                <View className="mb-8 ">
                    <Text className="big-heading text-violet-600">
                        Bildirimler
                    </Text>
                </View>
                {notifications.length === 0 && (
                    <View>
                        <Text className="text-center mt-12">
                            Görünüşe göre herhangi bir bildiriminiz yok
                        </Text>
                    </View>
                )}
                <Notifications notifications={notifications}></Notifications>
            </View>
        </ScrollView>
    );
}
