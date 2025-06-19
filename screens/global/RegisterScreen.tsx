import { RouteProp, useRoute } from "@react-navigation/native";
import { View, ScrollView } from "react-native";
import { RootStackParamList } from "../../navigation/RootNavigation";
import RegisterForm from "../../components/RegisterForm";
import BottomSign from "../../components/BottomSign";

export default function RegisterScreen() {
    const route = useRoute<RouteProp<RootStackParamList, "RegisterScreen">>();

    return (
        <View style={{ flex: 1 }}>
            <ScrollView
                contentContainerStyle={{ flexGrow: 1 }}
                className="py-16"
            >
                <RegisterForm isCustomer={route.params.isCustomer} />
                <BottomSign />
            </ScrollView>
        </View>
    );
}
