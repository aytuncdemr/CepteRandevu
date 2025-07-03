import { isAxiosError } from "axios";
import Toast from "react-native-toast-message";

export default function handleFetchError(error: unknown) {
    Toast.hide();
    console.log(error);
    if (isAxiosError(error)) {
        Toast.show({
            type: "error",
            text1: "Hata",
            text2: error.response?.data.message || error.message,
        });
    } else if (error instanceof Error) {
        Toast.show({
            type: "error",
            text1: "Hata",
            text2: error.message,
        });
    } else {
        Toast.show({
            type: "error",
            text1: "Hata",
            text2: "Beklenmedik bir hata oluştu",
        });
    }
}
