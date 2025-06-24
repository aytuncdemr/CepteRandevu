import ReactNativeModal from "react-native-modal";
import { Business } from "../interfaces/Business";
import { ScrollView } from "react-native";
import axios from "axios";
import { API_URL } from "../data/API_URL";
import Toast from "react-native-toast-message";
import handleFetchError from "../utils/handleFetchError";
import { BusinessRegisterForm } from "./BusinessRegisterForm";

export default function BusinessUpdateModal({
    business,
    isVisible,
    setIsVisible,
}: {
    business: Business;
    isVisible: boolean;
    setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
}) {
    async function updateBusinessHandler(updatedBusiness: Business) {
        try {
            const { data } = await axios.put(
                API_URL + "/businesses/" + updatedBusiness.id,
                updatedBusiness
            );
            Toast.show({
                type: "success",
                text1: "Başarılı",
                text2: data.message,
            });
        } catch (error) {
            handleFetchError(error);
        }
    }

    return (
        <ReactNativeModal
            isVisible={isVisible}
            onBackdropPress={() => setIsVisible(false)}
            style={{ margin: 0, justifyContent: "flex-end" }}
        >
            <ScrollView className="bg-white w-full max-h-[85%] h-[85%] rounded-t-3xl p-6">
                <BusinessRegisterForm
                    business={business}
                    updateBusinessHandler={updateBusinessHandler}
                    setIsVisible={setIsVisible}
                ></BusinessRegisterForm>
            </ScrollView>
        </ReactNativeModal>
    );
}
