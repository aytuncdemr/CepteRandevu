import { Text, View, TextInput, Pressable, ScrollView } from "react-native";
import getTodayDate from "../utils/getTodayDate";
import { Customer } from "../interfaces/Customer";
import { Formik } from "formik";
import * as Yup from "yup";
import DropDownPicker from "react-native-dropdown-picker";
import { useState } from "react";
import { cities } from "../data/cities";
import { Business } from "../interfaces/Business";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";

export default function CustomerRegisterForm({
    registerAccountHandler,
}: {
    registerAccountHandler: (
        account: Omit<Customer, "id"> | Omit<Business, "id">
    ) => void;
}) {
    const CustomerSchema = Yup.object().shape({
        name: Yup.string().required("İsim zorunludur"),
        surname: Yup.string().required("Soyisim zorunludur"),
        phone: Yup.string().required("Telefon zorunludur"),
        email: Yup.string()
            .email("Geçerli bir e-posta girin")
            .required("E-posta zorunludur"),
        password: Yup.string()
            .min(6, "Şifre en az 6 karakter olmalı")
            .required("Şifre zorunludur"),
        city: Yup.string().required("Şehir zorunludur"),
    });

    const [open, setOpen] = useState(false);

    return (
        <>
            <View>
                <View className="bg-orange-200 flex items-center justify-center w-20 h-20 rounded-xl mx-auto mb-4">
                    <FontAwesomeIcon
                        size={48}
                        color="#fb923c"
                        icon={faUserPlus}
                    ></FontAwesomeIcon>
                </View>
                <Text className="text-center text-4xl mt-3">
                    Müşteri olarak kayıt ol
                </Text>
            </View>
            <Formik
                initialValues={{
                    name: "",
                    surname: "",
                    phone: "",
                    email: "",
                    password: "",
                    city: "",
                    date: getTodayDate(),
                    favorites: [],
                    accountType: "customer",
                }}
                validationSchema={CustomerSchema}
                onSubmit={(values) => {
                    registerAccountHandler(values as Omit<Customer, "id">);
                }}
            >
                {({
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    values,
                    errors,
                    touched,
                    setFieldValue,
                }) => (
                    <View className="flex flex-col gap-3 mt-8">
                        <TextInput
                            className="text-input w-3/4 mx-auto"
                            placeholder="İsim"
                            onChangeText={handleChange("name")}
                            onBlur={handleBlur("name")}
                            value={values.name}
                        />
                        {touched.name && errors.name && (
                            <Text className="text-red-500 text-center">
                                {errors.name}
                            </Text>
                        )}

                        <TextInput
                            className="text-input w-3/4 mx-auto"
                            placeholder="Soyisim"
                            onChangeText={handleChange("surname")}
                            onBlur={handleBlur("surname")}
                            value={values.surname}
                        />
                        {touched.surname && errors.surname && (
                            <Text className="text-red-500 text-center">
                                {errors.surname}
                            </Text>
                        )}

                        <TextInput
                            className="text-input w-3/4 mx-auto"
                            placeholder="Telefon"
                            keyboardType="phone-pad"
                            onChangeText={handleChange("phone")}
                            onBlur={handleBlur("phone")}
                            value={values.phone}
                        />
                        {touched.phone && errors.phone && (
                            <Text className="text-red-500 text-center">
                                {errors.phone}
                            </Text>
                        )}

                        <TextInput
                            className="text-input w-3/4 mx-auto"
                            placeholder="E-posta"
                            keyboardType="email-address"
                            onChangeText={handleChange("email")}
                            onBlur={handleBlur("email")}
                            value={values.email}
                        />
                        {touched.email && errors.email && (
                            <Text className="text-red-500 text-center">
                                {errors.email}
                            </Text>
                        )}

                        <TextInput
                            className="text-input w-3/4 mx-auto"
                            placeholder="Şifre"
                            secureTextEntry
                            onChangeText={handleChange("password")}
                            onBlur={handleBlur("password")}
                            value={values.password}
                        />
                        {touched.password && errors.password && (
                            <Text className="text-red-500 text-center">
                                {errors.password}
                            </Text>
                        )}

                        <DropDownPicker
                            listMode="SCROLLVIEW"
                            open={open}
                            value={values.city}
                            items={cities.map((c) => ({ label: c, value: c }))}
                            setOpen={setOpen}
                            setValue={(callback) => {
                                const selected = callback(values.city);
                                setFieldValue("city", selected);
                            }}
                            placeholder="Bir şehir seçiniz..."
                            zIndex={2000}
                            containerStyle={{
                                width: "75%",
                                alignSelf: "center",
                            }}
                            style={{
                                borderWidth: 1,
                                borderColor: "#ddd",
                                marginBottom: 12,
                            }}
                            dropDownContainerStyle={{
                                width: "100%",
                                marginTop: 8,
                                borderWidth: 1,
                                borderColor: "#ddd",
                                alignSelf: "center",
                            }}
                        />
                        {touched.city && errors.city && (
                            <Text className="text-red-500 text-center">
                                {errors.city}
                            </Text>
                        )}

                        <Pressable
                            onPress={handleSubmit as any}
                            className="mb-8"
                        >
                            <View className="button-outer w-3/4 mx-auto">
                                <Text className="button-text">Kayıt Ol</Text>
                            </View>
                        </Pressable>
                    </View>
                )}
            </Formik>
        </>
    );
}
