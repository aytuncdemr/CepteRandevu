import React, { useContext, useState } from "react";
import {
    View,
    Text,
    Pressable,
    TextInput,
    ActivityIndicator,
} from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
    faEye,
    faEyeSlash,
    faHouse,
    faUserCircle,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import handleFetchError from "../utils/handleFetchError";
import { RootStackParamList } from "../navigation/RootNavigation";
import Modal from "react-native-modal";
import Toast from "react-native-toast-message";
import { API_URL } from "../data/API_URL";

export default function SignInForm() {
    const navigator =
        useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const authContext = useContext(AuthContext);

    const LoginSchema = Yup.object().shape({
        email: Yup.string()
            .email("Geçersiz E-posta")
            .required("E-posta boş bırakılamaz"),
        password: Yup.string().required("Şifre boş bırakılamaz"),
    });
    const [isVisible, setIsVisible] = useState(false);
    const [resetEmail, setResetEmail] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    async function handleLoginSubmit(
        { email, password }: { email: string; password: string },
        {
            setSubmitting,
        }: {
            setSubmitting: (isSubmitting: boolean) => void;
        }
    ) {
        try {
            const { data } = await axios.post(API_URL + "/auth/login", {
                email: email,
                password: password,
            });
            authContext?.setId(data.id);

            navigator.navigate(
                data.accountType === "customer"
                    ? "CustomerNavigation"
                    : "BusinessBottomBar"
            );
        } catch (error) {
            handleFetchError(error);
        } finally {
            setSubmitting(false);
        }
    }

    async function handlePasswordReset() {
        try {
            const { data } = await axios.post(
                API_URL + "/auth/reset-password",
                { email: resetEmail }
            );
            Toast.hide();

            Toast.show({
                type: "success",
                text1: "Başarılı",
                text2: data.message,
            });
        } catch (error) {
            handleFetchError(error);
        } finally {
            setIsVisible(false);
            setResetEmail("");
        }
    }

    return (
        <View className=" px-12">
            <Formik
                initialValues={{ email: "", password: "" }}
                validationSchema={LoginSchema}
                onSubmit={handleLoginSubmit}
            >
                {({
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    values,
                    errors,
                    touched,
                    isSubmitting,
                }) => (
                    <View className="flex flex-col gap-4">
                        <TextInput
                            placeholder="E-posta"
                            onChangeText={handleChange("email")}
                            onBlur={handleBlur("email")}
                            value={values.email}
                            keyboardType="email-address"
                            autoCapitalize="none"
                            className="text-input"
                        />
                        {touched.email && errors.email && (
                            <Text className="text-red-500 text-sm mb-2 text-left">
                                {errors.email}
                            </Text>
                        )}
                        <View className="flex-row items-center border border-gray-300 rounded-lg pr-3">
                            <TextInput
                                placeholder="Şifre"
                                onChangeText={handleChange("password")}
                                onBlur={handleBlur("password")}
                                value={values.password}
                                secureTextEntry={!showPassword}
                                className="flex-1 text-input !border-0"
                            />
                            <Pressable
                                onPress={() => setShowPassword(!showPassword)}
                            >
                                <FontAwesomeIcon
                                    icon={showPassword ? faEyeSlash : faEye}
                                    size={16}
                                    color="#bbb"
                                />
                            </Pressable>
                        </View>
                        {touched.password && errors.password && (
                            <Text className="text-red-500 text-sm mb-2 text-left">
                                {errors.password}
                            </Text>
                        )}
                        <Pressable onPress={() => setIsVisible(true)}>
                            <Text className="text-gray-400 text-right">
                                Şifremi unuttum
                            </Text>
                        </Pressable>
                        <Pressable onPress={ handleSubmit as any}>
                            <View className="button-outer">
                                <View className="button-text h-[25px]">
                                    {isSubmitting ? (
                                        <ActivityIndicator
                                            size="small"
                                            color="#fff"
                                        />
                                    ) : (
                                        <Text className="button-text">
                                            Giriş Yap
                                        </Text>
                                    )}
                                </View>
                            </View>
                        </Pressable>
                    </View>
                )}
            </Formik>
            <View>
                <View className="mt-12 mb-8">
                    <Text className="text-xl text-center text-gray-700">
                        Henüz bir hesabın yok mu ?
                    </Text>
                    <Text className="text-3xl text-center mt-3 font-semibold text-violet-600">
                        Kayıt Ol
                    </Text>
                </View>
                <View className="max-w-[90%] w-[90%] mx-auto flex flex-col justify-center  gap-4 mt-6">
                    <Pressable
                        onPress={() =>
                            navigator.navigate("RegisterScreen", {
                                isCustomer: true,
                            })
                        }
                    >
                        <View
                            className={
                                " flex flex-row items-center p-3 rounded-lg  bg-[#FBEEFE]"
                            }
                        >
                            <FontAwesomeIcon
                                style={{ color: "#5b21b6" }}
                                icon={faUserCircle}
                                size={27}
                            />
                            <Text
                                className={
                                    "flex-1 text-xl text-center mt-2 text-violet-800 font-semibold"
                                }
                            >
                                Müşteri olarak kayıt ol
                            </Text>
                        </View>
                    </Pressable>
                    <Pressable
                        onPress={() =>
                            navigator.navigate("RegisterScreen", {
                                isCustomer: false,
                            })
                        }
                    >
                        <View
                            className={
                                " flex flex-row  items-center p-3 rounded-lg  bg-[#FBEEFE]"
                            }
                        >
                            <FontAwesomeIcon
                                style={{ color: "#5b21b6" }}
                                icon={faHouse}
                                size={27}
                            />
                            <Text
                                className={
                                    "flex-1 text-xl text-center mt-2 text-violet-800 font-semibold"
                                }
                            >
                                İşletme olarak kayıt ol
                            </Text>
                        </View>
                    </Pressable>
                </View>
            </View>

            <Modal
                isVisible={isVisible}
                onBackdropPress={() => {
                    setIsVisible(false);
                    setResetEmail("");
                }}
                style={{ justifyContent: "flex-end", margin: 0 }}
            >
                <View className="bg-white w-full rounded-t-3xl p-6 max-h-[33%] h-[33%]">
                    <Text className=" text-purple-500 font-semibold mb-4 text-center text-2xl">
                        Şifremi Unuttum
                    </Text>

                    <Text className="text-center text-lg text-gray-500">
                        Şifrenizi sıfırlamanız için e-postanıza yeni şifrenizi
                        göndereceğiz.
                    </Text>
                    <TextInput
                        className="text-input mb-4 mt-6"
                        placeholder="E-posta"
                        value={resetEmail}
                        onChangeText={(e) => setResetEmail(e)}
                        autoCapitalize="none"
                    ></TextInput>
                    <Pressable onPress={handlePasswordReset}>
                        <View className="button-outer">
                            <Text className="button-text">Sıfırla</Text>
                        </View>
                    </Pressable>
                </View>
            </Modal>
        </View>
    );
}
