import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { Pressable, Text, TextInput, View, ScrollView } from "react-native";
import axios from "axios";
import { Formik, FormikHelpers } from "formik";
import * as Yup from "yup";
import { useContext, useEffect, useState } from "react";
import { Customer } from "../interfaces/Customer";
import { AuthContext } from "../context/AuthContext";
import LoadingScreen from "../screens/global/LoadingScreen";
import handleFetchError from "../utils/handleFetchError";
import DropDownPicker from "react-native-dropdown-picker";
import { cities } from "../data/cities";
import Toast from "react-native-toast-message";

const validationSchema = Yup.object().shape({
    name: Yup.string().required("İsim zorunludur"),
    surname: Yup.string().required("Soyisim zorunludur"),
    email: Yup.string()
        .email("Geçersiz e-posta")
        .required("E-posta zorunludur"),
    password: Yup.string().min(6, "Şifre en az 6 karakter olmalı"),
    phone: Yup.string().required("Telefon zorunludur"),
    city: Yup.string().required("Şehir zorunludur"),
    date: Yup.string().required("date"),
    accountType: Yup.string().required("accountType"),
    favoriedBusinesses: Yup.array().of(Yup.string()),
});

export default function AccountInformation() {
    const authContext = useContext(AuthContext);
    const [customer, setCustomer] = useState<Customer | null>(null);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        async function fetchCustomer() {
            try {
                const { data } = await axios.get(
                    `http://127.0.0.1:3000/api/v1/customers/${authContext?.id}`
                );
                setCustomer(data);
            } catch (error) {
                handleFetchError(error);
            }
        }

        fetchCustomer();
    }, [authContext]);

    async function handleUpdateSubmit(
        values: Customer,
        actions: FormikHelpers<Customer>
    ) {
        try {
            const { data } = await axios.put(
                `http://127.0.0.1:3000/api/v1/customers/${authContext?.id}`,
                values
            );
            Toast.show({
                type: "success",
                text1: "Başarılı",
                text2: data.message,
            });
        } catch (error) {
            handleFetchError(error);
        } finally {
            actions.setSubmitting(false);
        }
    }

    if (!customer) {
        return <LoadingScreen />;
    }
    return (
        <ScrollView className="flex-1 py-12">
            <View className="mb-6">
                <View className="flex items-center">
                    <FontAwesomeIcon
                        size={108}
                        color="#aaa"
                        icon={faUserCircle}
                    />
                </View>
            </View>

            <Formik
                initialValues={{
                    ...customer,
                }}
                validationSchema={validationSchema}
                onSubmit={handleUpdateSubmit}
            >
                {({
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    values,
                    errors,
                    touched,
                    isSubmitting,
                    setFieldValue,
                }) => (
                    <View className="px-8 flex flex-col gap-4">
                        <View>
                            <Text className="text-lg text-gray-400">İsim</Text>
                            <TextInput
                                className="text-input !text-gray-600"
                                value={values.name}
                                onChangeText={handleChange("name")}
                                onBlur={handleBlur("name")}
                            />
                            {touched.name && errors.name && (
                                <Text className="text-red-500 text-sm mt-1">
                                    {errors.name}
                                </Text>
                            )}
                        </View>

                        <View>
                            <Text className="text-lg text-gray-400 ">
                                Soyisim
                            </Text>
                            <TextInput
                                className="text-input !text-gray-600"
                                value={values.surname}
                                onChangeText={handleChange("surname")}
                                onBlur={handleBlur("surname")}
                            />
                            {touched.surname && errors.surname && (
                                <Text className="text-red-500 text-sm mt-1">
                                    {errors.surname}
                                </Text>
                            )}
                        </View>

                        {/* E-posta */}
                        <View>
                            <Text className="text-lg text-gray-400">
                                E-posta
                            </Text>
                            <TextInput
                                className="text-input  !text-gray-600"
                                value={values.email}
                                onChangeText={handleChange("email")}
                                onBlur={handleBlur("email")}
                                keyboardType="email-address"
                            />
                            {touched.email && errors.email && (
                                <Text className="text-red-500 text-sm mt-1">
                                    {errors.email}
                                </Text>
                            )}
                        </View>

                        <View>
                            <Text className="text-lg text-gray-400">Şifre</Text>
                            <TextInput
                                className="text-input  !text-gray-400"
                                value={values.password}
                                onChangeText={handleChange("password")}
                                onBlur={handleBlur("password")}
                                secureTextEntry
                            />
                            {touched.password && errors.password && (
                                <Text className="text-red-500 text-sm mt-1">
                                    {errors.password}
                                </Text>
                            )}
                        </View>

                        <View>
                            <Text className="text-lg text-gray-400">
                                Telefon
                            </Text>
                            <TextInput
                                className="text-input  !text-gray-600"
                                value={values.phone}
                                onChangeText={handleChange("phone")}
                                onBlur={handleBlur("phone")}
                                keyboardType="phone-pad"
                            />
                            {touched.phone && errors.phone && (
                                <Text className="text-red-500 text-sm mt-1">
                                    {errors.phone}
                                </Text>
                            )}
                        </View>

                        <View>
                            <Text className="text-lg text-gray-400">Şehir</Text>

                            <DropDownPicker
                                listMode="SCROLLVIEW"
                                open={open}
                                value={values.city}
                                items={cities.map((c) => ({
                                    label: c,
                                    value: c,
                                }))}
                                setOpen={setOpen}
                                setValue={(callback) => {
                                    const selected = callback(values.city);
                                    setFieldValue("city", selected);
                                }}
                                placeholder="Bir şehir seçiniz..."
                                zIndex={1000}
                                containerStyle={{
                                    width: "100%",
                                    alignSelf: "center",
                                }}
                                style={{
                                    borderWidth: 1,
                                    borderColor: "#ddd",
                                }}
                                dropDownContainerStyle={{
                                    width: "100%",
                                    marginTop: 8,
                                    borderWidth: 1,
                                    borderColor: "#ddd",
                                }}
                            />
                        </View>

                        <View>
                            <Text className="text-lg text-gray-400 ">
                                Kayıt Tarihi
                            </Text>
                            <TextInput
                                className="text-input !text-gray-600"
                                value={values.date}
                                onChangeText={handleChange("surname")}
                                onBlur={handleBlur("surname")}
                            />
                            {touched.surname && errors.surname && (
                                <Text className="text-red-500 text-sm mt-1">
                                    {errors.surname}
                                </Text>
                            )}
                        </View>

                        <Pressable
                            onPress={handleSubmit as () => void}
                            disabled={isSubmitting}
                        >
                            <View className="button-outer">
                                <Text className="button-text">
                                    {isSubmitting
                                        ? "Kaydediliyor..."
                                        : "Kaydet"}
                                </Text>
                            </View>
                        </Pressable>
                    </View>
                )}
            </Formik>
        </ScrollView>
    );
}
