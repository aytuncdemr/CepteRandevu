import { Text, View } from "react-native";
import { Appointment } from "../interfaces/Appointment";

export default function Appointments({
    appointments,
}: {
    appointments: Appointment[];
}) {
    return (
        <View>
            {appointments.map((appointment: Appointment) => {
                return (
                    <View key={appointment.id}>
                        <View className="flex flex-col gap-2">
                            <Text>{appointment.business}</Text>
                            <Text>{appointment.service.name}</Text>
                            <Text> {appointment.service.price}TL</Text>
                            <Text>{appointment.service.worker || "Ezgi"}</Text>
                        </View>
                    </View>
                );
            })}
        </View>
    );
}
