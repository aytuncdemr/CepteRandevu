import { Customer } from "../interfaces/Customer";
import handleFetchError from "../utils/handleFetchError";
import axios from "axios";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../navigation/RootNavigation";
import { Business } from "../interfaces/Business";
import Toast from "react-native-toast-message";
import { API_URL } from "../data/API_URL";
import CustomerRegisterForm from "./CustomerRegisterForm";
import { BusinessRegisterForm } from "./BusinessRegisterForm";

export default function RegisterForm({ isCustomer }: { isCustomer: boolean }) {
    const navigator = useNavigation<NavigationProp<RootStackParamList>>();

    async function registerAccountHandler(
        account: Omit<Customer, "id"> | Omit<Business, "id">
    ) {
        try {
            if (account.accountType === "business" && account.picture === "") {
                throw new Error("Lütfen 1 adet fotoğraf yükleyiniz");
            }

            const { data } = await axios.post(
                API_URL +
                    "/auth/register" +
                    (account.accountType === "customer"
                        ? "/customer"
                        : "/business"),
                account
            );
            Toast.hide();

            Toast.show({
                type: "success",
                text1: "Başarılı",
                text2: data.message,
            });
            navigator.navigate("LoginScreen");
        } catch (error) {
            handleFetchError(error);
        }
    }

    return isCustomer ? (
        <CustomerRegisterForm
            registerAccountHandler={registerAccountHandler}
        ></CustomerRegisterForm>
    ) : (
        <BusinessRegisterForm
            registerAccountHandler={registerAccountHandler}
        ></BusinessRegisterForm>
    );
}


