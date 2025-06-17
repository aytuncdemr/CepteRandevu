import { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { Appointment } from "../../interfaces/Appointment";
import handleFetchError from "../../utils/handleFetchError";
import axios from "axios";
import LoadingScreen from "./LoadingScreen";
import Appointments from "../../components/Appointments";

export default function AppointmentsScreen({isCustomer}: { isCustomer?: boolean }) {
    const [appointments, setAppointments] = useState<Appointment[] | null>(
        null
    );

    useEffect(() => {
        async function fetchAppointments() {
            try {
                const { data } = await axios.get(
                    "http://127.0.0.1:3000/api/v1/appointments"
                );

                setAppointments(data);
            } catch (error) {
                handleFetchError(error);
            }
        }
        fetchAppointments();
    }, []);

    if (!appointments) {
        return <LoadingScreen />;
    }

    return (
        <ScrollView className="flex-1">
            <View>
                <View className="px-4 py-12">
                    <Text className="big-heading text-purple-600">
                        Randevularım
                    </Text>
                </View>
                <View>
                    <Appointments appointments={appointments}></Appointments>
                </View>
            </View>
        </ScrollView>
    );
}
