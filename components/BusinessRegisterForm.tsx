import { Text, View, TextInput, Pressable, ScrollView } from "react-native";
import getTodayDate from "../utils/getTodayDate";
import { Customer } from "../interfaces/Customer";
import handleFetchError from "../utils/handleFetchError";
import axios from "axios";
import { Formik } from "formik";
import * as Yup from "yup";
import DropDownPicker from "react-native-dropdown-picker";
import { useEffect, useState } from "react";
import { cities } from "../data/cities";
import { Business } from "../interfaces/Business";
import LoadingScreen from "../screens/global/LoadingScreen";
import Toast from "react-native-toast-message";
import ImageUploader from "./ImageUploader";
import { API_URL } from "../data/API_URL";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
    faBusinessTime,
    faUserTie,
    faPlus,
    faCalendarDay,
    faConciergeBell,
} from "@fortawesome/free-solid-svg-icons";

export function BusinessRegisterForm({
    registerAccountHandler,
    business,
    updateBusinessHandler,
    setIsVisible,
}: {
    registerAccountHandler?: (
        account: Omit<Customer, "id"> | Omit<Business, "id">
    ) => void;
    updateBusinessHandler?: (updatedBusiness: Business) => void;
    business?: Business;
    setIsVisible?: React.Dispatch<React.SetStateAction<boolean>>;
}) {
    const BusinessSchema = Yup.object().shape({
        name: Yup.string().required("İsim zorunludur"),
        phone: Yup.string().required("Telefon zorunludur"),
        email: Yup.string()
            .email("Geçerli bir e-posta girin")
            .required("E-posta zorunludur"),
        password: Yup.string().when("isUpdator", {
            is: false,
            then: (schema) =>
                schema
                    .min(6, "Şifre en az 6 karakter olmalı")
                    .required("Şifre zorunludur"),
            otherwise: (schema) => schema.notRequired(),
        }),
        date: Yup.string(),
        averageStar: Yup.number(),
        city: Yup.string().required("Şehir zorunludur"),
        picture: Yup.string().required("Resim zorunludur"),
        category: Yup.string().required("Kategori zorunludur"),
        description: Yup.string().required("Açıklama zorunludur"),
        address: Yup.string().required("Adres zorunludur"),
        favorites: Yup.number(),
        workDays: Yup.array().of(Yup.string()).required(),
        workHours: Yup.array().of(Yup.string()).required(),
        services: Yup.array()
            .of(
                Yup.object().shape({
                    title: Yup.string().required("Hizmet başlığı gerekli"),
                    price: Yup.number()
                        .typeError("Fiyat sayı olmalı")
                        .required("Fiyat gerekli")
                        .min(0, "Fiyat negatif olamaz"),
                })
            )
            .required("Hizmetler gerekli"),
        workers: Yup.array().of(Yup.string()).required("Çalışanlar gerekli"),
    });

    const [categoryOpen, setCategoryOpen] = useState(false);
    const [cityOpen, setCityOpen] = useState(false);
    const [categories, setCategories] = useState<string[] | null>(null);
    const [newWorkerName, setNewWorkerName] = useState<string>("");
    const [newWorkDay, setNewWorkDay] = useState<string>("");
    const [newWorkHour, setNewWorkHour] = useState<string>("");
    const [newServiceTitle, setNewServiceTitle] = useState<string>("");
    const [newServicePrice, setNewServicePrice] = useState<string>("");

    useEffect(() => {
        async function getCategories() {
            try {
                const { data } = await axios.get(
                    API_URL + "/businesses/categories"
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
                {!updateBusinessHandler && (
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
                )}
                {updateBusinessHandler && (
                    <View>
                        <Text className="text-center text-violet-600 text-4xl mt-3">
                            {business?.name}
                        </Text>
                    </View>
                )}
            </View>
            <Formik
                initialValues={
                    business
                        ? { ...business }
                        : {
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
                          }
                }
                validationSchema={BusinessSchema}
                onSubmit={(values) => {
                    if (registerAccountHandler) {
                        registerAccountHandler(values as Omit<Business, "id">);
                    }
                    if (
                        business &&
                        values &&
                        updateBusinessHandler &&
                        setIsVisible
                    ) {
                        updateBusinessHandler({
                            ...values,
                            id: business.id,
                            accountType: "business",
                        });
                        setIsVisible(false);
                    }
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
                    <ScrollView>
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

                            {!updateBusinessHandler && (
                                <TextInput
                                    className="text-input w-3/4 mx-auto"
                                    placeholder="Şifre"
                                    secureTextEntry
                                    onChangeText={handleChange("password")}
                                    onBlur={handleBlur("password")}
                                    value={values.password}
                                />
                            )}
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
                                items={cities.map((c) => ({
                                    label: c,
                                    value: c,
                                }))}
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

                            {updateBusinessHandler && (
                                <View className="flex flex-col gap-8 px-14 mt-4">
                                    <View className="flex flex-col gap-2">
                                        <Text className="text-xl font-semibold mb-2">
                                            Çalışanlar
                                        </Text>
                                        <View className="flex flex-row flex-wrap gap-2">
                                            {values.workers.map(
                                                (worker, index) => {
                                                    return (
                                                        <Pressable
                                                            onPress={() => {
                                                                setFieldValue(
                                                                    "workers",
                                                                    values.workers.filter(
                                                                        (
                                                                            workerElem
                                                                        ) =>
                                                                            workerElem !==
                                                                            worker
                                                                    )
                                                                );
                                                            }}
                                                            key={index}
                                                        >
                                                            <View className=" bg-orange-100 rounded-lg py-1 px-2 flex flex-row items-center gap-3 mt-2">
                                                                <FontAwesomeIcon
                                                                    color="#f97316"
                                                                    icon={
                                                                        faUserTie
                                                                    }
                                                                />
                                                                <Text className="text-lg text-orange-500 font-bold">
                                                                    {worker}
                                                                </Text>
                                                            </View>
                                                        </Pressable>
                                                    );
                                                }
                                            )}
                                        </View>

                                        <View className="flex-row gap-2 mt-4">
                                            <TextInput
                                                className="text-input flex-1 h-[20px]"
                                                placeholder="Yeni çalışan"
                                                value={newWorkerName}
                                                onChangeText={setNewWorkerName}
                                            />
                                            <Pressable
                                                onPress={() => {
                                                    if (
                                                        newWorkerName.trim() !==
                                                        ""
                                                    ) {
                                                        setFieldValue(
                                                            "workers",
                                                            [
                                                                ...values.workers,
                                                                newWorkerName.trim(),
                                                            ]
                                                        );
                                                        setNewWorkerName("");
                                                    } else {
                                                        Toast.show({
                                                            type: "error",
                                                            text1: "Hata",
                                                            text2: "Çalışan adı boş olamaz.",
                                                        });
                                                    }
                                                }}
                                            >
                                                <View className="bg-green-500 py-4 px-4 rounded-lg flex-row ">
                                                    <FontAwesomeIcon
                                                        icon={faPlus}
                                                        color="white"
                                                        size={18}
                                                    />
                                                    <Text className="ml-2 text-white font-bold">
                                                        Ekle
                                                    </Text>
                                                </View>
                                            </Pressable>
                                        </View>
                                        {touched.workers && errors.workers && (
                                            <Text className="text-red-500">
                                                {errors.workers}
                                            </Text>
                                        )}
                                    </View>

                                    <View className="flex flex-col gap-2">
                                        <Text className="text-xl font-semibold mb-2">
                                            Çalışma Günleri
                                        </Text>
                                        <View className="flex flex-row flex-wrap gap-2">
                                            {values.workDays.map(
                                                (workDay, index) => {
                                                    return (
                                                        <Pressable
                                                            onPress={() => {
                                                                setFieldValue(
                                                                    "workDays",
                                                                    values.workDays.filter(
                                                                        (
                                                                            workDayElem
                                                                        ) =>
                                                                            workDayElem !==
                                                                            workDay
                                                                    )
                                                                );
                                                            }}
                                                            key={index}
                                                        >
                                                            <View className=" bg-blue-100 rounded-lg py-1 px-2 flex flex-row items-center gap-3 mt-2">
                                                                <FontAwesomeIcon
                                                                    color="#3b82f6"
                                                                    icon={
                                                                        faCalendarDay
                                                                    }
                                                                />
                                                                <Text className="text-lg text-blue-600 font-bold">
                                                                    {workDay}
                                                                </Text>
                                                            </View>
                                                        </Pressable>
                                                    );
                                                }
                                            )}
                                        </View>
                                        <View className="flex-row gap-2 mt-4">
                                            <TextInput
                                                className="text-input flex-1 h-[20px]"
                                                placeholder="Yeni çalışma günü"
                                                value={newWorkDay}
                                                onChangeText={setNewWorkDay}
                                            />
                                            <Pressable
                                                onPress={() => {
                                                    if (
                                                        newWorkDay.trim() !== ""
                                                    ) {
                                                        setFieldValue(
                                                            "workDays",
                                                            [
                                                                ...values.workDays,
                                                                newWorkDay.trim(),
                                                            ]
                                                        );
                                                        setNewWorkDay("");
                                                    } else {
                                                        Toast.show({
                                                            type: "error",
                                                            text1: "Hata",
                                                            text2: "Çalışma günü boş olamaz.",
                                                        });
                                                    }
                                                }}
                                            >
                                                <View className="bg-green-500 py-4 px-4 rounded-lg flex-row ">
                                                    <FontAwesomeIcon
                                                        icon={faPlus}
                                                        color="white"
                                                        size={18}
                                                    />
                                                    <Text className="ml-2 text-white font-bold">
                                                        Ekle
                                                    </Text>
                                                </View>
                                            </Pressable>
                                        </View>
                                        {touched.workDays &&
                                            errors.workDays && (
                                                <Text className="text-red-500">
                                                    {errors.workDays}
                                                </Text>
                                            )}
                                    </View>

                                    <View className="flex flex-col gap-2">
                                        <Text className="text-xl font-semibold mb-2">
                                            Çalışma Saatleri
                                        </Text>
                                        <View className="flex flex-row flex-wrap gap-2">
                                            {values.workHours.map(
                                                (workHour, index) => {
                                                    return (
                                                        <Pressable
                                                            onPress={() => {
                                                                setFieldValue(
                                                                    "workHours",
                                                                    values.workHours.filter(
                                                                        (
                                                                            workHourElem
                                                                        ) =>
                                                                            workHourElem !==
                                                                            workHour
                                                                    )
                                                                );
                                                            }}
                                                            key={index}
                                                        >
                                                            <View className=" bg-green-100 rounded-lg py-1 px-2 flex flex-row items-center gap-3 mt-2">
                                                                <FontAwesomeIcon
                                                                    color="#3b82f6"
                                                                    icon={
                                                                        faCalendarDay
                                                                    }
                                                                />
                                                                <Text className="text-lg text-green-600 font-bold">
                                                                    {workHour}
                                                                </Text>
                                                            </View>
                                                        </Pressable>
                                                    );
                                                }
                                            )}
                                        </View>
                                        <View className="flex-row gap-2 mt-4">
                                            <TextInput
                                                className="text-input flex-1 h-[20px]"
                                                placeholder="Yeni çalışma günü"
                                                value={newWorkHour}
                                                onChangeText={setNewWorkHour}
                                            />
                                            <Pressable
                                                onPress={() => {
                                                    if (
                                                        newWorkHour.trim() !==
                                                        ""
                                                    ) {
                                                        setFieldValue(
                                                            "workHours",
                                                            [
                                                                ...values.workHours,
                                                                newWorkHour.trim(),
                                                            ]
                                                        );
                                                        setNewWorkHour("");
                                                    } else {
                                                        Toast.show({
                                                            type: "error",
                                                            text1: "Hata",
                                                            text2: "Çalışma saati boş olamaz.",
                                                        });
                                                    }
                                                }}
                                            >
                                                <View className="bg-green-500 py-4 px-4 rounded-lg flex-row ">
                                                    <FontAwesomeIcon
                                                        icon={faPlus}
                                                        color="white"
                                                        size={18}
                                                    />
                                                    <Text className="ml-2 text-white font-bold">
                                                        Ekle
                                                    </Text>
                                                </View>
                                            </Pressable>
                                        </View>
                                        {touched.workDays &&
                                            errors.workDays && (
                                                <Text className="text-red-500">
                                                    {errors.workDays}
                                                </Text>
                                            )}
                                    </View>

                                    <View className="flex flex-col gap-2">
                                        <Text className="text-xl font-semibold mb-2">
                                            Hizmetler
                                        </Text>
                                        <View className="flex flex-row flex-wrap gap-2">
                                            {values.services.map(
                                                (service, index) => {
                                                    return (
                                                        <Pressable
                                                            onPress={() => {
                                                                setFieldValue(
                                                                    "services",
                                                                    values.services.filter(
                                                                        (
                                                                            serviceElem
                                                                        ) =>
                                                                            serviceElem.title !==
                                                                                service.title ||
                                                                            serviceElem.price !==
                                                                                service.price
                                                                    )
                                                                );
                                                            }}
                                                            key={index}
                                                        >
                                                            <View className=" bg-purple-100 rounded-lg py-1 px-2 flex flex-row items-center gap-3 mt-2">
                                                                <FontAwesomeIcon
                                                                    color="#a855f7"
                                                                    icon={
                                                                        faConciergeBell
                                                                    }
                                                                />
                                                                <Text className="text-lg text-purple-600 font-bold">
                                                                    {
                                                                        service.title
                                                                    }{" "}
                                                                    -{" "}
                                                                    {
                                                                        service.price
                                                                    }{" "}
                                                                    TL
                                                                </Text>
                                                            </View>
                                                        </Pressable>
                                                    );
                                                }
                                            )}
                                        </View>
                                        <View className="flex-col gap-2 mt-4">
                                            <TextInput
                                                className="text-input w-full h-[20px]"
                                                placeholder="Hizmet adı"
                                                value={newServiceTitle}
                                                onChangeText={
                                                    setNewServiceTitle
                                                }
                                            />
                                            <TextInput
                                                className="text-input w-full h-[20px]"
                                                placeholder="Hizmet fiyatı (TL)"
                                                keyboardType="numeric"
                                                value={newServicePrice}
                                                onChangeText={(text) =>
                                                    setNewServicePrice(
                                                        text.replace(
                                                            /[^0-9]/g,
                                                            ""
                                                        )
                                                    )
                                                }
                                            />
                                            <Pressable
                                                onPress={() => {
                                                    const parsedPrice =
                                                        parseFloat(
                                                            newServicePrice
                                                        );
                                                    if (
                                                        newServiceTitle.trim() !==
                                                            "" &&
                                                        !isNaN(parsedPrice) &&
                                                        parsedPrice >= 0
                                                    ) {
                                                        setFieldValue(
                                                            "services",
                                                            [
                                                                ...values.services,
                                                                {
                                                                    title: newServiceTitle.trim(),
                                                                    price: parsedPrice,
                                                                },
                                                            ]
                                                        );
                                                        setNewServiceTitle("");
                                                        setNewServicePrice("");
                                                    } else {
                                                        Toast.show({
                                                            type: "error",
                                                            text1: "Hata",
                                                            text2: "Hizmet adı ve geçerli bir fiyat giriniz.",
                                                        });
                                                    }
                                                }}
                                            >
                                                <View className="bg-green-500 py-4 px-4 rounded-lg flex-row items-center justify-center mt-4">
                                                    <FontAwesomeIcon
                                                        icon={faPlus}
                                                        color="white"
                                                        size={18}
                                                    />
                                                    <Text className="ml-2 text-white font-bold">
                                                        Hizmet Ekle
                                                    </Text>
                                                </View>
                                            </Pressable>
                                        </View>
                                    </View>
                                </View>
                            )}

                            <Pressable
                                onPress={handleSubmit as any}
                                className="mb-8"
                            >
                                <View className="button-outer w-3/4 mx-auto mt-4 mb-8">
                                    <Text className="button-text">
                                        {updateBusinessHandler
                                            ? "Kaydet"
                                            : "Kayıt Ol"}
                                    </Text>
                                </View>
                            </Pressable>
                        </View>
                    </ScrollView>
                )}
            </Formik>
        </>
    );
}
