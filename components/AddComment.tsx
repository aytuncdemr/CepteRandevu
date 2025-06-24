import React, { useContext, useState } from "react";
import {
    Text,
    View,
    Pressable,
    TextInput,
    ActivityIndicator,
} from "react-native";
import { AuthContext } from "../context/AuthContext";
import handleFetchError from "../utils/handleFetchError";
import axios from "axios";
import { API_URL } from "../data/API_URL";
import getTodayDate from "../utils/getTodayDate";
import Toast from "react-native-toast-message";
import { Formik } from "formik";
import * as Yup from "yup";
import DropDownPicker from "react-native-dropdown-picker";
import { Business } from "../interfaces/Business";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faStar as fasFaStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as farFaStar } from "@fortawesome/free-regular-svg-icons";

export default function AddComment({
    business,
    setIsAddingComment,
}: {
    business: Business;
    setIsAddingComment: React.Dispatch<React.SetStateAction<boolean>>;
}) {
    const authContext = useContext(AuthContext);

    const [serviceOpen, setServiceOpen] = useState(false);
    const [workerOpen, setWorkerOpen] = useState(false);

    const CommentSchema = Yup.object().shape({
        service: Yup.string().required("Hizmet seçimi zorunludur."),
        worker: Yup.string().required("Çalışan seçimi zorunludur."),
        comment: Yup.string()
            .min(10, "Yorum en az 10 karakter olmalıdır.")
            .max(500, "Yorum en fazla 500 karakter olabilir.")
            .required("Yorum alanı boş bırakılamaz."),
        star: Yup.number()
            .min(1, "En az 1 yıldız vermelisiniz.")
            .max(5, "En fazla 5 yıldız verebilirsiniz.")
            .required("Yıldız puanı zorunludur."),
    });

    function closeOtherDropdowns(
        currentSetOpenFunction: React.Dispatch<React.SetStateAction<boolean>>
    ) {
        setServiceOpen(false);
        setWorkerOpen(false);
        currentSetOpenFunction(true);
    }

    async function addCommentHandler(values: {
        service: string;
        worker: string;
        comment: string;
        star: number;
    }) {
        try {
            const { data } = await axios.post(
                API_URL + "/comments/businesses/" + business.id,
                {
                    customer: authContext?.id,
                    business: business.id,
                    service: values.service,
                    worker: values.worker,
                    comment: values.comment,
                    star: values.star,
                    date: getTodayDate(),
                }
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
            setIsAddingComment(false);
        }
    }

    return (
        <Formik
            initialValues={{
                service: "",
                worker: "",
                comment: "",
                star: 0,
            }}
            validationSchema={CommentSchema}
            onSubmit={addCommentHandler}
        >
            {({
                handleSubmit,
                values,
                errors,
                touched,
                setFieldValue,
                handleBlur,
                handleChange,
                isSubmitting,
            }) => (
                <View className="flex-1 p-5 ">
                    <View className="flex flex-row gap-4 items-center mb-4">
                        <View className="flex-1">
                            <Text className=" text-gray-400 mb-2">Hizmet</Text>
                            <DropDownPicker
                                listMode="SCROLLVIEW"
                                open={serviceOpen}
                                value={values.service}
                                items={business.services.map((s) => ({
                                    label: s.title,
                                    value: s.title,
                                }))}
                                setOpen={setServiceOpen}
                                setValue={(val) =>
                                    setFieldValue(
                                        "service",
                                        val(values.service)
                                    )
                                }
                                placeholder="Seçiniz"
                                style={[
                                    {
                                        borderWidth: 1,
                                        borderColor: "#ddd",
                                        borderRadius: 8,
                                        minHeight: 40,
                                        backgroundColor: "#fff",
                                    },
                                    touched.service &&
                                        errors.service && {
                                            borderColor: "red",
                                        },
                                ]}
                                dropDownContainerStyle={{
                                    borderWidth: 1,
                                    borderColor: "#ddd",
                                    borderRadius: 8,
                                    maxHeight: 200,
                                    backgroundColor: "#fff",
                                }}
                                zIndex={3000}
                                onOpen={() =>
                                    closeOtherDropdowns(setServiceOpen)
                                }
                                onClose={() => handleBlur("service")}
                            />
                            {touched.service && errors.service && (
                                <Text className="text-xs text-red-500 mt-1 ml-1">
                                    {errors.service}
                                </Text>
                            )}
                        </View>

                        <View className="flex-1">
                            <Text className=" text-gray-400 mb-2">Çalışan</Text>
                            <DropDownPicker
                                listMode="SCROLLVIEW"
                                open={workerOpen}
                                value={values.worker}
                                items={business.workers.map((w) => ({
                                    label: w,
                                    value: w,
                                }))}
                                setOpen={setWorkerOpen}
                                setValue={(val) =>
                                    setFieldValue("worker", val(values.worker))
                                }
                                placeholder="Seçiniz"
                                style={[
                                    {
                                        borderWidth: 1,
                                        borderColor: "#ddd",
                                        borderRadius: 8,
                                        minHeight: 40,
                                        backgroundColor: "#fff",
                                    },
                                    touched.worker &&
                                        errors.worker && { borderColor: "red" },
                                ]}
                                dropDownContainerStyle={{
                                    borderWidth: 1,
                                    borderColor: "#ddd",
                                    borderRadius: 8,
                                    maxHeight: 200,
                                    backgroundColor: "#fff",
                                }}
                                zIndex={3000}
                                onOpen={() =>
                                    closeOtherDropdowns(setWorkerOpen)
                                }
                                onClose={() => handleBlur("worker")}
                            />
                            {touched.worker && errors.worker && (
                                <Text className="text-xs text-red-500 mt-1 ml-1">
                                    {errors.worker}
                                </Text>
                            )}
                        </View>
                    </View>

                    <View className="mb-4">
                        <View className="mb-4">
                            <Text className=" text-gray-400 mb-1">Yıldız</Text>
                            <View className="flex-row justify-start py-1">
                                {[1, 2, 3, 4, 5].map((starValue) => (
                                    <Pressable
                                        key={starValue}
                                        onPress={() => {
                                            setFieldValue("star", starValue);
                                            handleBlur("star");
                                        }}
                                    >
                                        <FontAwesomeIcon
                                            icon={
                                                starValue <= values.star
                                                    ? fasFaStar
                                                    : farFaStar
                                            }
                                            size={18}
                                            color="#FFC107"
                                            style={{ marginHorizontal: 2 }}
                                        />
                                    </Pressable>
                                ))}
                            </View>
                            {touched.star && errors.star && (
                                <Text className="text-xs text-red-500 mt-1 ml-1">
                                    {errors.star}
                                </Text>
                            )}
                        </View>
                        <TextInput
                            className={`border border-[#ddd] rounded-lg p-3 text-base bg-white min-h-[70px] ${
                                touched.comment && errors.comment
                                    ? "border-red-500"
                                    : ""
                            }`}
                            placeholder="Yorum yaz"
                            multiline
                            numberOfLines={4}
                            onChangeText={handleChange("comment")}
                            onBlur={handleBlur("comment")}
                            value={values.comment}
                            style={{ textAlignVertical: "top" }}
                        />
                        {touched.comment && errors.comment && (
                            <Text className="text-xs text-red-500 mt-1 ml-1">
                                {errors.comment}
                            </Text>
                        )}
                    </View>
                    <View className="flex flex-row justify-center items-center gap-2">
                        <Pressable
                            disabled={isSubmitting}
                            onPress={() => handleSubmit()}
                            className="w-[49%]"
                        >
                            <View className="button-outer">
                                {isSubmitting ? (
                                    <ActivityIndicator
                                        size="small"
                                        color="#fff"
                                    />
                                ) : (
                                    <Text className="button-text">Ekle</Text>
                                )}
                            </View>
                        </Pressable>
                        <Pressable
                            disabled={isSubmitting}
                            onPress={() => setIsAddingComment(false)}
                            className="w-[49%]"
                        >
                            <View className="button-outer">
                                <Text className="button-text">İptal</Text>
                            </View>
                        </Pressable>
                    </View>
                </View>
            )}
        </Formik>
    );
}
