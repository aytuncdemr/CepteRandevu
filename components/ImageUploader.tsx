import React, { useState } from "react";
import { Pressable, Text, View } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { FormikErrors } from "formik";
import Toast from "react-native-toast-message";
import handleFetchError from "../utils/handleFetchError";
import * as FileSystem from "expo-file-system";

export default function ImageUploader({
    setFieldValue,
}: {
    setFieldValue: (
        field: string,
        value: any,
        shouldValidate?: boolean
    ) => Promise<void | FormikErrors<any>>;
}) {
    const [image, setImage] = useState<string | null>(null);
    
    async function pickImage() {
        try {
            const { granted } =
                await ImagePicker.requestMediaLibraryPermissionsAsync();

            if (!granted) {
                    Toast.hide();

                Toast.show({
                    type: "error",
                    text1: "Hata",
                    text2: "Lütfen gerekli izinleri verin",
                });
                return;
            }

            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ["images"],
                quality: 1,
            });

            if (!result.canceled && result.assets.length > 0) {
                const pickedUri = result.assets[0].uri;
                setImage(pickedUri);
                await uploadImage(pickedUri);
            }
        } catch (error) {
            handleFetchError(error);
        }
    }

    async function uploadImage(uri: string) {
        try {
            const base64 = await FileSystem.readAsStringAsync(uri, {
                encoding: FileSystem.EncodingType.Base64,
            });

            const formData = new FormData();
            formData.append("key", "1fb423329d681c28468c19033de51a76");
            formData.append("image", base64);

            const res = await fetch("https://api.imgbb.com/1/upload", {
                method: "POST",
                body: formData,
            });

            const json = await res.json();

            if (!json.success) {
                throw new Error("ImgBB upload failed");
            }

            const imageUrl = json.data.url;
            
            await setFieldValue("picture", imageUrl);
        } catch (error) {
            handleFetchError(error);
        }
    }

    return (
        <View
            className={`${
                image && "bg-green-500"
            } border border-gray-300 w-3/4 rounded-lg mx-auto p-4`}
        >
            <Pressable onPress={image ? () => {} : pickImage}>
                <Text className={`text-center ${image && "text-white"}`}>
                    {image
                        ? image.slice(0, 24) + "..."
                        : "Kapak Fotoğrafı yükleyin"}
                </Text>
            </Pressable>
        </View>
    );
}
