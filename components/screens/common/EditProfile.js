import React, { useState, useContext } from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import { Layout, Text, Input, Button, useTheme, Select, SelectItem } from '@ui-kitten/components';
import Header from './Header'
import { KeyboardAvoidingView } from './extra';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios'
import url from '../../url'
import { UserContext } from '../../theme/ApplyTheme'
import snackbar from './Snackbar';

const EditProfile = ({ navigation, route }) => {

    const { role } = route.params
    const { state, dispatch } = useContext(UserContext)
    const [name, setName] = useState(state.name)
    const [shopname, setShopName] = useState(role == 'seller' ? state.shopname : '')
    const [mobileNo, setMobileNo] = useState(state.mobileNo.toString())
    const [address, setAddress] = useState(state.address)

    const theme = useTheme()

    const updateProfile = (image) => {
        console.log(image)
        axios
            .post(`${url}/update_profile`, { name, shopname, mobileNo, address, userId: state._id, role })
            .then(res => {
                if (res.data.status === 'success') {
                    snackbar({ type: res.data.status, message: res.data.message })
                    res.data.user.role = role
                    AsyncStorage.setItem('user', JSON.stringify(res.data.user))
                        .then(() => {
                            dispatch({ type: 'USER', payload: res.data.user })
                            navigation.navigate('PROFILE')
                        })
                        .catch(err => console.log(err))
                }
                else {
                    snackbar({ type: res.data.status, message: res.data.message })
                }
            })
            .catch(err => console.log(err))
    }

    return (
        <>
            <Header title='Edit Profile' goback={true} navigation={navigation} />
            <Layout level='4' style={styles.container}>
                <ScrollView style={{ padding: 15 }}>
                    <View style={{ paddingBottom: 15 }}>
                        <KeyboardAvoidingView>
                            {role == 'seller' &&
                                <>
                                    <Text style={styles.label}>Shop Name</Text>
                                    <Input
                                        placeholder='Name'
                                        size='large'
                                        value={shopname}
                                        onChangeText={setShopName}
                                        style={styles.input}
                                    />
                                </>
                            }
                            <Text style={styles.label}>Name</Text>
                            <Input
                                placeholder='Name'
                                size='large'
                                value={name}
                                onChangeText={setName}
                                style={styles.input}
                            />
                            <Text style={styles.label}>Mobile No</Text>
                            <Input
                                placeholder='Mobile No'
                                size='large'
                                value={mobileNo}
                                onChangeText={setMobileNo}
                                style={styles.input}
                            />
                            <Text style={styles.label}>Address</Text>
                            <Input
                                style={styles.input}
                                multiline={true}
                                textStyle={{ minHeight: 64, textAlignVertical: 'top', paddingTop: 10 }}
                                placeholder='Address'
                                value={address}
                                onChangeText={setAddress}
                            />
                        </KeyboardAvoidingView>
                    </View>
                </ScrollView>
                <View style={{ paddingHorizontal: 15, paddingVertical: 15 }}>
                    <Button
                        style={styles.button}
                        size='large'
                        onPress={updateProfile}
                    >
                        UPDATE
                    </Button>
                </View>
            </Layout>
        </>
    )
}

export default EditProfile

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // padding: 15
    },
    title: {
        marginBottom: 50
    },
    label: {
        textAlign: 'left',
        fontWeight: 'bold',
        marginBottom: 10,
        width: '100%',
        marginLeft: 5
    },
    input: {
        marginBottom: 15
    },
    button: {
        width: '100%',
    }
})
