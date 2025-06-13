import { RouteProp, useRoute } from "@react-navigation/native";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faBusinessTime, faUserCheck } from "@fortawesome/free-solid-svg-icons";
import { RootStackParamList } from "../../navigation/RootNavigation";
import RegisterForm from "../../components/RegisterForm";

export default function RegisterScreen() {
    const route = useRoute<RouteProp<RootStackParamList, "RegisterScreen">>();

    return (
        <ScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            className="flex-1"
            keyboardShouldPersistTaps="handled"
        >
            <View className="flex-1 px-4 py-4 pt-12">
                <View className="mb-2">
                    <Text
                        className={
                            "text-5xl text-center font-semibold mb-4 text-purple-700"
                        }
                    >
                        CepteRandevu
                    </Text>
                </View>
                {route.params.isCustomer && (
                    <View className="flex-1 px-2 py-8">
                        <FontAwesomeIcon
                            size={64}
                            icon={faUserCheck}
                            style={styles.fontAwesomeIcon}
                        ></FontAwesomeIcon>
                        <Text className="text-3xl text-purple-700 text-center">
                            Kullanıcı olarak kayıt ol
                        </Text>
                        <RegisterForm
                            isCustomer={route.params.isCustomer}
                        ></RegisterForm>
                    </View>
                )}
                {!route.params.isCustomer && (
                    <View className="flex-1">
                        <View className="flex-1 py-12">
                            <FontAwesomeIcon
                                size={64}
                                icon={faBusinessTime}
                                style={styles.fontAwesomeIcon}
                            ></FontAwesomeIcon>
                            <Text className="text-3xl text-purple-700 text-center">
                                İşletme olarak kayıt ol
                            </Text>
                            <RegisterForm
                                isCustomer={route.params.isCustomer}
                            ></RegisterForm>
                        </View>
                    </View>
                )}
            </View>
            <View className="mt-auto mb-4">
                <Text className="text-center text-gray-400">
                    @2025 - CepteRandevu
                </Text>
                <Text className="text-center text-gray-400">
                    Tüm hakları saklıdır.
                </Text>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    fontAwesomeIcon: {
        alignSelf: "center",
        color: "rgb(140, 3, 252)",
        marginBottom: 16,
    },
});
