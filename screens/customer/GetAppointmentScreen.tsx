import { Text, View } from "react-native";
import { RouteProp, useRoute } from "@react-navigation/native";
import { CustomerStackParamList } from "../../navigation/CustomerNavigation";
import AppointmentForm from "../../components/AppointmentForm";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCalendarDays } from "@fortawesome/free-solid-svg-icons";

export default function GetAppointmentScreen() {
    const route =
        useRoute<RouteProp<CustomerStackParamList, "GetAppointmentScreen">>();
    const { business } = route.params;

    return (
        <View className="flex-1">
            <View className="py-16 px-4">
                <View className="flex flex-col items-center justify-center gap-3">
                    <FontAwesomeIcon
                        style={{ color: "#6d28d9" }}
                        size={52}
                        icon={faCalendarDays}
                    ></FontAwesomeIcon>
                    <Text className="text-3xl text-violet-700 mt-2">
                        {business.name}
                    </Text>
                </View>
                <AppointmentForm business={business}></AppointmentForm>
            </View>
        </View>
    );
}
