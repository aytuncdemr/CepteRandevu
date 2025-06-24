import { useContext, useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { Appointment } from "../../interfaces/Appointment";
import handleFetchError from "../../utils/handleFetchError";
import axios from "axios";
import LoadingScreen from "./LoadingScreen";
import Appointments from "../../components/Appointments";
import { API_URL } from "../../data/API_URL";
import { AuthContext } from "../../context/AuthContext";

export default function AppointmentsScreen({
    isCustomer,
}: {
    isCustomer: boolean;
}) {

    const authContext = useContext(AuthContext);

    const [appointments, setAppointments] = useState<Appointment[] | null>(
        null
    );

    useEffect(() => {
        async function fetchAppointments() {
            try {
                const { data } = await axios.get(
                    API_URL +
                        "/appointments/" +
                        (isCustomer ? "customers/" : "businesses/") +
                        authContext?.id
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
                <View className="px-4 py-16">
                    <Text className="big-heading text-violet-600">
                        {isCustomer ? "Randevularım" : "Randevular"}
                    </Text>
                </View>
                <View>
                    <Appointments
                        isCustomer={isCustomer}
                        appointments={appointments}
                    ></Appointments>
                </View>
            </View>
        </ScrollView>
    );
}
