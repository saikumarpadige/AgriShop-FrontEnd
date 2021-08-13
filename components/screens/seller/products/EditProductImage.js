import React, { useRef } from "react";
import { View, StyleSheet } from "react-native";
import RBSheet from "react-native-raw-bottom-sheet";
import { launchImageLibrary, launchCamera } from 'react-native-image-picker';
import { Text, Button, Avatar } from '@ui-kitten/components';
import { CameraIcon, CloseIcon } from '../../common/Icons';

export default function EditProductIamge({ setAvatarSource, setImageSource, imageSource, avatarSource }) {

    const selectImage = async (type) => {
        const options = {
            quality: 1.0,
            maxWidth: 500,
            maxHeight: 500,
            cameraType: 'back',
            mediaType: 'photo',
            noData: true,
            storageOptions: {
                skipBackup: true,
            },
        };

        if (type === 'image') {
            launchImageLibrary(options, (response) => {
                if (response.didCancel) {
                    console.log('User cancelled image picker');
                } else if (response.error) {
                    console.log('ImagePicker Error: ', response.error);
                } else if (response.customButton) {
                    console.log('User tapped custom button: ', response.customButton);
                } else {
                    setImageSource({
                        uri: response.uri,
                        type: `test/${response.type.split('/')[1]}`,
                        name: response.fileName
                    })
                    setAvatarSource(response.uri)
                    refRBSheet.current.close()
                }
            });
        }
        else {
            launchCamera(options, (response) => {
                if (response.didCancel) {
                    console.log('User cancelled image picker');
                } else if (response.error) {
                    console.log('ImagePicker Error: ', response.error);
                } else if (response.customButton) {
                    console.log('User tapped custom button: ', response.customButton);
                } else {
                    setImageSource({
                        uri: response.uri,
                        type: `test/${response.type.split('/')[1]}`,
                        name: response.fileName
                    })
                    setAvatarSource(response.uri)
                    refRBSheet.current.close()
                }
            });
        }
    }


    const refRBSheet = useRef();
    return (
        <View>
            <View style={styles.photoContainer}>
                {avatarSource ?
                    <>
                        <Avatar
                            source={{ uri: avatarSource }}
                            style={styles.photo}
                            shape='square'
                        />
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', marginVertical: 20, width: '100%' }}>
                            <Button
                                accessoryLeft={CameraIcon}
                                onPress={() => refRBSheet.current.open()}
                                style={{ width: '48%' }}
                            >
                                <Text category='h6' style={{ color: '#fff', }}>Change image</Text>
                            </Button>
                            <Button
                                accessoryLeft={CloseIcon}
                                onPress={() => {
                                    setAvatarSource('')
                                    setImageSource('')
                                }}
                                status='danger'
                                style={{ width: '48%' }}
                            >
                                <Text category='h6' style={{ color: '#fff' }}>Remove image</Text>
                            </Button>
                        </View>
                    </>
                    :
                    <Button
                        accessoryLeft={CameraIcon}
                        onPress={() => refRBSheet.current.open()}
                        style={{ marginVertical: 25 }}
                    >
                        <Text category='h6' style={{ color: '#fff' }}>Upload product image</Text>
                    </Button>
                }
            </View>

            <RBSheet
                ref={refRBSheet}
                closeOnDragDown={true}
                closeOnPressMask={true}
                height={300}
                customStyles={{
                    wrapper: {
                        backgroundColor: "transparent",
                    },
                    draggableIcon: {
                        backgroundColor: "#000",
                        marginBottom: 30
                    },
                    container: {
                        borderRadius: 50,
                        padding: 20,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }
                }}
            >
                <Text style={{ marginBottom: 30 }} category='h5'>Upload Photo</Text>
                <Button onPress={() => selectImage('image')} style={styles.sheetButton}>Select From Library</Button>
                <Button onPress={() => selectImage('camera')} style={styles.sheetButton}>Take Photo</Button>
                <Button status='basic' onPress={() => refRBSheet.current.close()} style={styles.sheetButton}>Cancel</Button>
            </RBSheet>
        </View>
    );
}

const styles = StyleSheet.create({
    sheetButton: {
        marginBottom: 15,
        width: '95%'
    },
    photoContainer: {
        justifyContent: 'center',
        alignItems: 'center', width: '100%',
        alignSelf: 'center', marginBottom: 15
    },
    photo: {
        height: 200,
        marginHorizontal: 8,
        width: '100%'
    },
    photoButton: {
        aspectRatio: 1.0,
        height: 40,
        borderRadius: 20,
        position: 'absolute',
        alignSelf: 'flex-end',
        bottom: 0,
    },
})