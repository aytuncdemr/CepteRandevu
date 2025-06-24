import React, { useContext, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    Pressable,
    ActivityIndicator,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { Business } from "../interfaces/Business";
import handleFetchError from "../utils/handleFetchError";
import axios from "axios";
import { API_URL } from "../data/API_URL";
import { AuthContext } from "../context/AuthContext";
import Toast from "react-native-toast-message";
import { CustomerRootStackParamList } from "../navigation/CustomerNavigation";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { Formik } from "formik";
import * as Yup from "yup";

export default function AppointmentForm({ business }: { business: Business }) {
    const navigator =
        useNavigation<NavigationProp<CustomerRootStackParamList>>();
    const authContext = useContext(AuthContext);

    const [dateOpen, setDateOpen] = useState(false);
    const [hourOpen, setHourOpen] = useState(false);
    const [serviceOpen, setServiceOpen] = useState(false);
    const [employeeOpen, setEmployeeOpen] = useState(false);

    const AppointmentSchema = Yup.object().shape({
        service: Yup.string().required("Hizmet seçimi zorunludur."),
        employee: Yup.string().required("Çalışan seçimi zorunludur."),
        date: Yup.string().required("Tarih seçimi zorunludur."),
        hour: Yup.string().required("Saat seçimi zorunludur."),
        category: Yup.string().required("Kategori zorunludur."),
    });

    function closeOtherDropdowns(
        currentSetOpenFunction: React.Dispatch<React.SetStateAction<boolean>>
    ) {
        // First, close all dropdowns.
        setServiceOpen(false);
        setEmployeeOpen(false);
        setDateOpen(false);
        setHourOpen(false);

        currentSetOpenFunction(true);
    }

    async function submitHandler(values: {
        service: string;
        employee: string;
        date: string;
        hour: string;
        category: string;
    }) {
        try {
            const selectedService = business.services.find(
                (s) => s.title === values.service
            );

            const { data } = await axios.post(API_URL + `/appointments`, {
                customer: authContext?.id,
                business: business.id,
                service: {
                    worker: values.employee,
                    name: values.service,
                    price: selectedService?.price,
                },
                category: values.category,
                date: values.date + " " + values.hour,
            });

            Toast.hide();
            Toast.show({
                type: "success",
                text1: "Başarılı",
                text2: data.message,
            });
            navigator.goBack();
        } catch (error) {
            handleFetchError(error);
        }
    }

    return (
        <Formik
            initialValues={{
                service: "",
                employee: "",
                date: "",
                hour: "",
                category: business.category,
            }}
            validationSchema={AppointmentSchema}
            onSubmit={submitHandler}
        >
            {({
                handleSubmit,
                values,
                errors,
                touched,
                setFieldValue,
                isSubmitting,
            }) => (
                <View className="flex flex-col gap-2 p-6">
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Hizmet</Text>
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
                                setFieldValue("service", val(values.service))
                            }
                            placeholder="Seçiniz"
                            containerStyle={styles.dropdownContainer}
                            style={[
                                styles.dropdown,
                                touched.service &&
                                    errors.service &&
                                    styles.inputErrorBorder,
                            ]}
                            dropDownContainerStyle={
                                styles.dropdownListContainer
                            }
                            zIndex={7000}
                            onOpen={() => closeOtherDropdowns(setServiceOpen)}
                        />
                        {touched.service && errors.service && (
                            <Text style={styles.errorText}>
                                {errors.service}
                            </Text>
                        )}
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Çalışan</Text>
                        <DropDownPicker
                            listMode="SCROLLVIEW"
                            open={employeeOpen}
                            value={values.employee}
                            items={business.workers.map((w) => ({
                                label: w,
                                value: w,
                            }))}
                            setOpen={setEmployeeOpen} // Direct setter
                            setValue={(val) =>
                                setFieldValue("employee", val(values.employee))
                            }
                            placeholder="Seçiniz"
                            containerStyle={styles.dropdownContainer}
                            style={[
                                styles.dropdown,
                                touched.employee &&
                                    errors.employee &&
                                    styles.inputErrorBorder,
                            ]}
                            dropDownContainerStyle={
                                styles.dropdownListContainer
                            }
                            zIndex={6000}
                            onOpen={() => closeOtherDropdowns(setEmployeeOpen)}
                        />
                        {touched.employee && errors.employee && (
                            <Text style={styles.errorText}>
                                {errors.employee}
                            </Text>
                        )}
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Tarih</Text>
                        <DropDownPicker
                            listMode="SCROLLVIEW"
                            open={dateOpen}
                            value={values.date}
                            items={business.workDays.map((w) => ({
                                label: w,
                                value: w,
                            }))}
                            setOpen={setDateOpen}
                            setValue={(val) =>
                                setFieldValue("date", val(values.date))
                            }
                            placeholder="Seçiniz"
                            containerStyle={styles.dropdownContainer}
                            style={[
                                styles.dropdown,
                                touched.date &&
                                    errors.date &&
                                    styles.inputErrorBorder,
                            ]}
                            dropDownContainerStyle={
                                styles.dropdownListContainer
                            }
                            zIndex={5000}
                            onOpen={() => closeOtherDropdowns(setDateOpen)}
                        />
                        {touched.date && errors.date && (
                            <Text style={styles.errorText}>{errors.date}</Text>
                        )}
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Saat</Text>
                        <DropDownPicker
                            listMode="SCROLLVIEW"
                            open={hourOpen}
                            value={values.hour}
                            items={business.workHours.map((h) => ({
                                label: h,
                                value: h,
                            }))}
                            setOpen={setHourOpen}
                            setValue={(val) =>
                                setFieldValue("hour", val(values.hour))
                            }
                            placeholder="Seçiniz"
                            containerStyle={styles.dropdownContainer}
                            style={[
                                styles.dropdown,
                                touched.hour &&
                                    errors.hour &&
                                    styles.inputErrorBorder,
                            ]}
                            dropDownContainerStyle={
                                styles.dropdownListContainer
                            }
                            zIndex={4000}
                            onOpen={() => closeOtherDropdowns(setHourOpen)}
                        />
                        {touched.hour && errors.hour && (
                            <Text style={styles.errorText}>{errors.hour}</Text>
                        )}
                    </View>

                    <Pressable
                        disabled={isSubmitting}
                        onPress={handleSubmit as any}
                    >
                        <View className="button-outer !bg-[#FF7D1E] mt-8">
                            {isSubmitting ? (
                                <ActivityIndicator size="small" color="#fff" />
                            ) : (
                                <Text className="button-text">Randevu Al</Text>
                            )}
                        </View>
                    </Pressable>
                </View>
            )}
        </Formik>
    );
}

const styles = StyleSheet.create({
    title: {
        fontSize: 28,
        fontWeight: "bold",
        color: "#333",
        marginBottom: 24,
        textAlign: "center",
    },
    inputGroup: {
        width: "100%",
        marginBottom: 12,
    },
    label: {
        fontSize: 18,
        color: "#666",
        marginBottom: 8,
        fontWeight: "500",
    },
    dropdownContainer: {
        width: "100%",
        alignSelf: "center",
    },
    dropdown: {
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 8,
        minHeight: 50,
    },
    dropdownListContainer: {
        width: "100%",
        marginTop: 4,
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 8,
        maxHeight: 200,
    },
    submitButton: {
        backgroundColor: "#4f46e5",
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 10,
        marginTop: 30,
        width: "100%",
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 8,
    },
    submitButtonText: {
        color: "#fff",
        fontSize: 20,
        fontWeight: "600",
    },
    errorText: {
        fontSize: 12,
        color: "red",
        marginTop: 4,
    },
    inputErrorBorder: {
        borderColor: "red",
    },
});
