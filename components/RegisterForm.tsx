import { Text, View, TextInput, Pressable, StyleSheet } from "react-native";
import getTodayDate from "../utils/getTodayDate";
import { Customer } from "../interfaces/Customer";
import handleFetchError from "../utils/handleFetchError";
import axios from "axios";
import { Formik } from "formik";
import * as Yup from "yup";
import DropDownPicker from "react-native-dropdown-picker";
import { useEffect, useState } from "react";
import { cities } from "../data/cities";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../navigation/RootNavigation";
import { Business } from "../interfaces/Business";
import LoadingScreen from "../screens/global/LoadingScreen";
import Toast from "react-native-toast-message";

export default function RegisterForm({ isCustomer }: { isCustomer: boolean }) {
    const navigator = useNavigation<NavigationProp<RootStackParamList>>();

    async function registerAccountHandler(
        accountInfo: Omit<Customer, "id"> | Omit<Business, "id">
    ) {
        try {
            const { data } = await axios.post(
                "http://127.0.0.1:3000/api/v1/auth/register",
                accountInfo
            );
            Toast.show({
                type: "success",
                text1: "Kayıt başarılı",
                text2: data.message,
            });
            navigator.navigate("LoginScreen");
        } catch (error) {
            handleFetchError(error);
        }
    }

    if (isCustomer) {
        return (
            <CustomerRegisterForm
                registerAccountHandler={registerAccountHandler}
                navigator={navigator}
            ></CustomerRegisterForm>
        );
    } else {
        return (
            <BusinessRegisterForm
                registerAccountHandler={registerAccountHandler}
                navigator={navigator}
            ></BusinessRegisterForm>
        );
    }
}

function CustomerRegisterForm({
    navigator,
    registerAccountHandler,
}: {
    navigator: NavigationProp<RootStackParamList>;
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
        <Formik
            initialValues={{
                name: "",
                surname: "",
                phone: "",
                email: "",
                password: "",
                city: "",
                date: getTodayDate(),
                favoriedBusinesses: [],
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
                        zIndex={1000}
                        containerStyle={{ width: "75%", alignSelf: "center" }}
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

                    <Pressable onPress={handleSubmit as any}>
                        <View className="button-outer w-3/4 mx-auto">
                            <Text className="button-text">Kayıt Ol</Text>
                        </View>
                    </Pressable>
                    <Pressable onPress={() => navigator.goBack()}>
                        <View className="button-outer w-3/4 mx-auto">
                            <Text className="button-text">Geri Dön</Text>
                        </View>
                    </Pressable>
                </View>
            )}
        </Formik>
    );
}

function BusinessRegisterForm({
    navigator,
    registerAccountHandler,
}: {
    navigator: NavigationProp<RootStackParamList>;
    registerAccountHandler: (
        account: Omit<Customer, "id"> | Omit<Business, "id">
    ) => void;
}) {
    const BusinessSchema = Yup.object().shape({
        name: Yup.string().required("İsim zorunludur"),
        phone: Yup.string().required("Telefon zorunludur"),
        email: Yup.string()
            .email("Geçerli bir e-posta girin")
            .required("E-posta zorunludur"),
        password: Yup.string()
            .min(6, "Şifre en az 6 karakter olmalı")
            .required("Şifre zorunludur"),
        date: Yup.string(),
        averageStar: Yup.number(),
        city: Yup.string().required("Şehir zorunludur"),
        pictures: Yup.array().of(Yup.string()).required(),
        category: Yup.string().required("Kategori zorunludur"),
        description: Yup.string().required("Açıklama zorunludur"),
        address: Yup.string().required("Adres zorunludur"),
        favorites: Yup.number(),
        workDays: Yup.array().of(Yup.string()).required(),
        workHours: Yup.array().of(Yup.string()).required(),
        serviceCategories: Yup.array().of(Yup.string()).required(),
        workers: Yup.array().of(Yup.string()).required(),
    });

    const [open, setOpen] = useState(false);

    const [categories, setCategories] = useState<string[] | null>(null);

    useEffect(() => {
        async function getCategories() {
            try {
                const { data } = await axios.get(
                    "http://127.0.0.1:3000/api/v1/business/categories"
                );
                setCategories(data);
            } catch (error) {
                handleFetchError(error);
            }
        }
        getCategories();
    }, []);

    if (!categories) {
        return <LoadingScreen></LoadingScreen>;
    }

    return (
        <Formik
            initialValues={{
                name: "",
                phone: "",
                email: "",
                password: "",
                city: "",
                date: getTodayDate(),
                pictures: [],
                category: "",
                description: "",
                address: "",
                accountType: "business",
                favorites: 0,
                workDays: [],
                workHours: [],
                serviceCategories: [],
                workers: [],
                averageStar: 0,
            }}
            validationSchema={BusinessSchema}
            onSubmit={(values) => {
                registerAccountHandler(values as Omit<Business, "id">);
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
                        placeholder="İşletme İsmi"
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
                    <TextInput
                        className="text-input w-3/4 mx-auto"
                        placeholder="Adres"
                        onChangeText={handleChange("password")}
                        onBlur={handleBlur("address")}
                        value={values.address}
                    />
                    {touched.address && errors.address && (
                        <Text className="text-red-500 text-center">
                            {errors.address}
                        </Text>
                    )}

                    <DropDownPicker
                        listMode="SCROLLVIEW"
                        open={open}
                        value={values.category}
                        items={categories.map((c) => ({ label: c, value: c }))}
                        setOpen={setOpen}
                        setValue={(callback) => {
                            const selected = callback(values.category);
                            setFieldValue("category", selected);
                        }}
                        placeholder="Bir kategori seçiniz..."
                        zIndex={1000}
                        containerStyle={{ width: "75%", alignSelf: "center" }}
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

                    <Pressable onPress={handleSubmit as any}>
                        <View className="button-outer w-3/4 mx-auto">
                            <Text className="button-text">Kayıt Ol</Text>
                        </View>
                    </Pressable>
                    <Pressable onPress={() => navigator.goBack()}>
                        <View className="button-outer w-3/4 mx-auto">
                            <Text className="button-text">Geri Dön</Text>
                        </View>
                    </Pressable>
                </View>
            )}
        </Formik>
    );
}

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 16,
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: "gray",
        borderRadius: 8,
        color: "black",
        paddingRight: 30,
        backgroundColor: "#f2f2f2",
    },
    inputAndroid: {
        fontSize: 16,
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderWidth: 1,
        borderColor: "gray",
        borderRadius: 8,
        color: "black",
        backgroundColor: "#f2f2f2",
    },
});
