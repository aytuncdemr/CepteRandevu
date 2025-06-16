import React, { useState } from "react";
import { Pressable, Text, View } from "react-native";
import * as ImagePicker from "expo-image-picker";

import { supabase } from "../data/supaBaseConfig";
import { FormikErrors } from "formik";
import Toast from "react-native-toast-message";
import handleFetchError from "../utils/handleFetchError";

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
    const [uploading, setUploading] = useState(false);

    async function pickImage() {
        try {
            const { granted } =
                await ImagePicker.requestMediaLibraryPermissionsAsync();

            if (!granted) {
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
            setUploading(true);
            const response = await fetch(
                "https://www.creativecoloursolutions.com.au/wp-content/uploads/2011/05/400x400.png"
            );
            const blob = await response.blob();

            const filename = `${Date.now()}.png`; // Correct extension
            const file = new File([blob], filename, { type: blob.type });

            const { error } = await supabase.storage
                .from("photos")
                .upload(filename, file, { upsert: true });

            if (error) {
                console.error("Upload error:", error.message);
                throw new Error("Fotoğraf yüklemesi başarısız oldu");
            }

            // const { data: publicUrlData } = supabase.storage
            //     .from("pictures")
            //     .getPublicUrl("test.jpg");

            // const url = publicUrlData?.publicUrl;
            // if (!url) {
            //     throw new Error("Fotoğraf URL alınamadı");
            // }

            // await setFieldValue("pictures", [url]);
        } catch (error) {
            handleFetchError(error);
        } finally {
            setUploading(false);
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
