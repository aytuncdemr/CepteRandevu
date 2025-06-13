import React, { useContext, useState } from "react";
import { View, Text, Pressable, TextInput } from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faBuilding, faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import handleFetchError from "../utils/handleFetchError";
import { RootStackParamList } from "../navigation/RootNavigation";
import Modal from "react-native-modal";
import Toast from "react-native-toast-message";

const LoginSchema = Yup.object().shape({
    email: Yup.string()
        .email("Geçersiz E-posta")
        .required("E-posta boş bırakılamaz"),
    password: Yup.string().required("Şifre boş bırakılamaz"),
});

export default function SignInForm() {
    const navigator =
        useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const authContext = useContext(AuthContext);
    const [isVisible, setIsVisible] = useState(false);

    async function handleLoginSubmit(
        values: { email: string; password: string },
        {
            setSubmitting,
            resetForm,
        }: {
            setSubmitting: (isSubmitting: boolean) => void;
            resetForm: () => void;
        }
    ) {
        try {
            const { data } = await axios.post(
                "http://localhost:3000/api/v1/auth/login",
                {
                    email: values.email,
                    password: values.password,
                }
            );

            authContext?.setId(data.id);

            if (data.accountType === "customer") {
                navigator.navigate("CustomerNavigation");
            }
            if (data.accountType === "business") {
                navigator.navigate("BusinessScreens");
            }
        } catch (error: any) {
            handleFetchError(error);
        } finally {
            setSubmitting(false);
        }
    }

    async function handlePasswordReset() {
        try {
            const { data } = await axios.post(
                "http://127.0.0.1:3000/api/v1/auth/reset-password",
                { email: "test@hotmail.com" }
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
        <>
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
                    <View>
                        <View className="flex flex-col gap-4 px-12">
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

                            <TextInput
                                placeholder="Şifre"
                                onChangeText={handleChange("password")}
                                onBlur={handleBlur("password")}
                                value={values.password}
                                secureTextEntry={true}
                                className="text-input"
                            />
                            {touched.password && errors.password && (
                                <Text className="text-red-500 text-sm mb-2 text-left">
                                    {errors.password}
                                </Text>
                            )}
                            <Pressable
                                onPress={() => {
                                    setIsVisible(true);
                                }}
                            >
                                <View className="flex flex-row justify-end">
                                    <Text className="text-gray-400">
                                        Şifremi unuttum
                                    </Text>
                                </View>
                            </Pressable>
                            <Pressable onPress={() => handleSubmit()}>
                                <View className="button-outer">
                                    <Text className="button-text">
                                        {isSubmitting
                                            ? "Giriş Yapılıyor..."
                                            : "Giriş Yap"}
                                    </Text>
                                </View>
                            </Pressable>
                        </View>
                    </View>
                )}
            </Formik>
            <View className="mt-16 px-4 mb-8">
                <Text className="text-xl text-center text-gray-700">
                    Henüz bir hesabınız yok mu ?
                </Text>
                <Text className="text-3xl text-center mt-3 font-semibold text-purple-500">
                    Kayıt Ol
                </Text>
            </View>
            <View className="flex flex-row items-center gap-4 px-4">
                <Pressable
                    onPress={() =>
                        navigator.navigate("RegisterScreen", {
                            isCustomer: true,
                        })
                    }
                >
                    <View
                        className={
                            " flex flex-row gap-4  items-center p-4 rounded-lg shadow-sm bg-purple-500"
                        }
                    >
                        <FontAwesomeIcon
                            style={{ color: "white" }}
                            icon={faUserCircle}
                            size={32}
                        />
                        <Text
                            className={
                                "text-white text-2xl text-center mt-2 font-bold"
                            }
                        >
                            Müşteriyim
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
                    <View className=" flex flex-row gap-4 items-center p-4 rounded-lg shadow-sm bg-purple-500">
                        <FontAwesomeIcon
                            style={{ color: "white" }}
                            icon={faBuilding}
                            size={32}
                        />
                        <Text className="text-white text-2xl text-center mt-2 font-bold">
                            İşletmeyim
                        </Text>
                    </View>
                </Pressable>
            </View>
            <Modal
                isVisible={isVisible}
                onBackdropPress={() => setIsVisible(false)}
                style={{ justifyContent: "flex-end", margin: 0 }}
            >
                <View className="bg-white w-full rounded-t-3xl p-6 h-[35%]">
                    <Text className=" text-purple-500 font-semibold mb-4 text-center text-2xl">
                        Şifremi Unuttum
                    </Text>

                    <Text className="text-center">
                        Şifrenizi sıfırlamanız için e-postanıza yeni şifrenizi
                        göndereceğiz.
                    </Text>
                    <TextInput
                        className="text-input mb-4 mt-12"
                        placeholder="E-posta"
                    ></TextInput>
                    <Pressable onPress={handlePasswordReset}>
                        <View className="button-outer">
                            <Text className="button-text">Sıfırla</Text>
                        </View>
                    </Pressable>
                </View>
            </Modal>
        </>
    );
}
