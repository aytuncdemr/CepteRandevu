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
import ImageUploader from "./ImageUploader";
import { API_URL } from "../data/API_URL";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faBusinessTime, faUserPlus } from "@fortawesome/free-solid-svg-icons";

export default function RegisterForm({ isCustomer }: { isCustomer: boolean }) {
    const navigator = useNavigation<NavigationProp<RootStackParamList>>();

    async function registerAccountHandler(
        account: Omit<Customer, "id"> | Omit<Business, "id">
    ) {
        try {
            if (
                account.accountType === "business" &&
                account.picture === ""
            ) {
                throw new Error("Lütfen 1 adet fotoğraf yükleyiniz");
            }

            const { data } = await axios.post(
                API_URL + "/auth/register" + account.accountType === "customer"
                    ? "/customer"
                    : "/business",
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

function CustomerRegisterForm({
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

function BusinessRegisterForm({
    registerAccountHandler,
}: {
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
        picture: Yup.string().required(),
        category: Yup.string().required("Kategori zorunludur"),
        description: Yup.string().required("Açıklama zorunludur"),
        address: Yup.string().required("Adres zorunludur"),
        favorites: Yup.number(),
        workDays: Yup.array().of(Yup.string()).required(),
        workHours: Yup.array().of(Yup.string()).required(),
        services: Yup.array().of(Yup.string()).required(),
        workers: Yup.array().of(Yup.string()).required(),
    });

    const [categoryOpen, setCategoryOpen] = useState(false);
    const [cityOpen, setCityOpen] = useState(false);
    const [categories, setCategories] = useState<string[] | null>(null);

    useEffect(() => {
        async function getCategories() {
            try {
                const { data } = await axios.get(
                    API_URL + "/business/categories"
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
        <>
            <View>
                <View className="bg-orange-200 flex items-center justify-center w-20 h-20 rounded-xl mx-auto mb-4">
                    <FontAwesomeIcon
                        size={48}
                        color="#fb923c"
                        icon={faBusinessTime}
                    ></FontAwesomeIcon>
                </View>
                <Text className="text-center text-4xl mt-3">
                    İşletme olarak kayıt ol
                </Text>
            </View>
            <Formik
                initialValues={{
                    name: "",
                    phone: "",
                    email: "",
                    password: "",
                    city: "",
                    date: getTodayDate(),
                    picture: "",
                    category: "",
                    description: "",
                    address: "",
                    accountType: "business",
                    favorites: 0,
                    workDays: [],
                    workHours: [],
                    services: [],
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
                            onChangeText={handleChange("address")}
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
                            open={categoryOpen}
                            value={values.category}
                            items={categories.map((c) => ({
                                label: c,
                                value: c,
                            }))}
                            setOpen={setCategoryOpen}
                            setValue={(callback) => {
                                const selected = callback(values.category);
                                setFieldValue("category", selected);
                            }}
                            placeholder="Bir kategori seçiniz..."
                            zIndex={3000}
                            containerStyle={{
                                width: "75%",
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
                                alignSelf: "center",
                            }}
                        />
                        {touched.category && errors.category && (
                            <Text className="text-red-500 text-center">
                                {errors.category}
                            </Text>
                        )}
                        <DropDownPicker
                            listMode="SCROLLVIEW"
                            open={cityOpen}
                            value={values.city}
                            items={cities.map((c) => ({ label: c, value: c }))}
                            setOpen={setCityOpen}
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

                        <ImageUploader
                            setFieldValue={setFieldValue}
                        ></ImageUploader>
                        {touched.picture && errors.picture && (
                            <Text className="text-red-500 text-center">
                                {errors.picture}
                            </Text>
                        )}

                        <TextInput
                            className="text-input w-3/4 mx-auto"
                            placeholder="Açıklama"
                            onChangeText={handleChange("description")}
                            onBlur={handleBlur("description")}
                            value={values.description}
                        />
                        {touched.description && errors.description && (
                            <Text className="text-red-500 text-center">
                                {errors.description}
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
