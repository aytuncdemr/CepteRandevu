import React, { useState } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { Business } from "../interfaces/Business";

export default function AppointmentForm({ business }: { business: Business }) {
    const [dateOpen, setDateOpen] = useState(false);
    const [date, setDate] = useState<string>("");

    const [hourOpen, setHourOpen] = useState(false);
    const [hour, setHour] = useState<string>("");

    const [serviceOpen, setServiceOpen] = useState(false);
    const [service, setService] = useState<string>("");

    const [employeeOpen, setEmployeeOpen] = useState(false);
    const [employee, setEmployee] = useState<string>("");

    async function handleSubmit() {}

    return (
        <View className="flex flex-col gap-2 p-6">
            <View style={styles.inputGroup}>
                <Text style={styles.label}>Hizmet</Text>
                <DropDownPicker
                    listMode="SCROLLVIEW"
                    open={serviceOpen}
                    value={service}
                    items={business.services.map((s) => ({
                        label: s.title,
                        value: s.title,
                    }))}
                    setOpen={setServiceOpen}
                    setValue={setService}
                    placeholder="Seçiniz"
                    containerStyle={styles.dropdownContainer}
                    style={styles.dropdown}
                    dropDownContainerStyle={styles.dropdownListContainer}
                    zIndex={7000}
                    onOpen={() => {
                        setHourOpen(false);
                        setEmployeeOpen(false);
                        setDateOpen(false);
                    }}
                />
            </View>
            <View style={styles.inputGroup}>
                <Text style={styles.label}>Çalışan</Text>
                <DropDownPicker
                    listMode="SCROLLVIEW"
                    open={employeeOpen}
                    value={employee}
                    items={business.workers.map((w) => ({
                        label: w,
                        value: w,
                    }))}
                    setOpen={setEmployeeOpen}
                    setValue={setEmployee}
                    placeholder="Seçiniz"
                    containerStyle={styles.dropdownContainer}
                    style={styles.dropdown}
                    dropDownContainerStyle={styles.dropdownListContainer}
                    zIndex={6000}
                    onOpen={() => {
                        setHourOpen(false);
                        setServiceOpen(false);
                        setDateOpen(false);
                    }}
                />
            </View>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Tarih</Text>
                <DropDownPicker
                    listMode="SCROLLVIEW"
                    open={dateOpen}
                    value={date}
                    items={business.workDays.map((w) => ({
                        label: w,
                        value: w,
                    }))}
                    setOpen={setDateOpen}
                    setValue={setDate}
                    placeholder="Seçiniz"
                    containerStyle={styles.dropdownContainer}
                    style={styles.dropdown}
                    dropDownContainerStyle={styles.dropdownListContainer}
                    zIndex={5000}
                    onOpen={() => {
                        setHourOpen(false);
                        setServiceOpen(false);
                        setEmployeeOpen(false);
                    }}
                />
            </View>

            <View style={styles.inputGroup}>
                <Text style={styles.label}>Saat</Text>
                <DropDownPicker
                    listMode="SCROLLVIEW"
                    open={hourOpen} 
                    value={hour}
                    items={business.workHours.map((h) => ({
                        label: h,
                        value: h,
                    }))}
                    setOpen={setHourOpen}
                    setValue={setHour}
                    placeholder="Seçiniz"
                    containerStyle={styles.dropdownContainer}
                    style={styles.dropdown}
                    dropDownContainerStyle={styles.dropdownListContainer}
                    zIndex={4000}
                    onOpen={() => {
                        setServiceOpen(false);
                        setEmployeeOpen(false);
                        setDateOpen(false);
                    }}
                />
            </View>

            <Pressable onPress={handleSubmit}>
                <View className="button-outer !bg-[#FF7D1E] mt-32">
                    <Text className="button-text">Randevu Al</Text>
                </View>
            </Pressable>
        </View>
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
});
