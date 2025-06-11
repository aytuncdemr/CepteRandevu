// import React, { useState } from 'react';
// import { Button, Image, View } from 'react-native';
// import * as ImagePicker from 'expo-image-picker';
// import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
// import { storage } from './firebaseConfig';

// export default function ImageUploader() {
//     const [image, setImage] = useState(null);
//     const [uploading, setUploading] = useState(false);

//     const pickImage = async () => {
//         const result = await ImagePicker.launchImageLibraryAsync({
//             mediaTypes: ImagePicker.MediaTypeOptions.Images,
//             quality: 1,
//         });

//         if (!result.canceled) {
//             setImage(result.assets[0].uri);
//         }
//     };

//     const uploadImage = async () => {
//         if (!image) return;

//         setUploading(true);
//         const response = await fetch(image);
//         const blob = await response.blob();

//         const filename = `images/${Date.now()}.jpg`;
//         const storageRef = ref(storage, filename);

//         await uploadBytes(storageRef, blob);
//         const downloadURL = await getDownloadURL(storageRef);

//         console.log('Image uploaded! Download URL:', downloadURL);
//         setUploading(false);
//     };

//     return (
//         <View className="p-4 items-center">
//             <Button title="Pick Image" onPress={pickImage} />
//             {image && <Image source={{ uri: image }} style={{ width: 200, height: 200, marginVertical: 20 }} />}
//             <Button title="Upload Image" onPress={uploadImage} disabled={uploading} />
//         </View>
//     );
// }
