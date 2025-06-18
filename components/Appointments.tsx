import { Text, View } from "react-native";
import { Appointment } from "../interfaces/Appointment";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCalendarDay } from "@fortawesome/free-solid-svg-icons";

export default function Appointments({
    appointments,
    isCustomer,
}: {
    appointments: Appointment[];
    isCustomer: boolean;
}) {
    return (
        <View className="flex flex-col gap-4 px-4 mb-6">
            {appointments.map((appointment: Appointment) => {
                return (
                    <View
                        className="relative border border-gray-300 px-3 py-6 rounded-lg"
                        key={appointment.id}
                    >
                        <View className="flex flex-col gap-1">
                            <Text className="text-xl font-semibold">
                                {isCustomer ? appointment.business : appointment.customer}
                            </Text>
                            <View className="flex flex-row items-center gap-3">
                                <FontAwesomeIcon
                                    style={{ color: "rgb(255, 126, 42)" }}
                                    icon={faCalendarDay}
                                    size={16}
                                ></FontAwesomeIcon>
                                <Text className="text-lg">
                                    {appointment.date}
                                </Text>
                            </View>
                            <Text className="text-lg">
                                {appointment.service.name} /{" "}
                                {appointment.service.worker}
                            </Text>
                            <Text className="text-lg"></Text>
                        </View>
                        <Text className="absolute bottom-2 right-2 text-lg text-gray-500">
                            {appointment.service.price}TL
                        </Text>
                    </View>
                );
            })}
        </View>
    );
}
