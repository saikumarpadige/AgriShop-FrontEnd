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

const ChangePassword = ({ navigation, route }) => {

    const { role } = route.params
    const { state, dispatch } = useContext(UserContext)
    const [oldPassword, setOldPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [newPasswordConfirm, setNewPasswordConfirm] = useState('')

    const updatePassword = () => {
        if (newPassword != newPasswordConfirm) {
            return snackbar({ type: 'failed', message: 'new password and confirm password doesnt match' })
        }
        axios
            .post(`${url}/change_password`, { oldPassword, newPassword, userId: state._id, role })
            .then(res => {
                if (res.data.status === 'success') {
                    snackbar({ type: res.data.status, message: res.data.message })
                    navigation.navigate('PROFILE')
                }
                else {
                    snackbar({ type: res.data.status, message: res.data.message })
                }
            })
            .catch(err => console.log(err))
    }

    return (
        <>
            <Header title='Change Password' goback={true} navigation={navigation} />
            <Layout level='4' style={styles.container}>
                <ScrollView style={{ padding: 15 }}>
                    <View style={{ paddingBottom: 15 }}>
                        <KeyboardAvoidingView>
                            <Text style={styles.label}>Old Password</Text>
                            <Input
                                placeholder='Old Password'
                                size='large'
                                value={oldPassword}
                                secureTextEntry={true}
                                onChangeText={setOldPassword}
                                style={styles.input}
                            />
                            <Text style={styles.label}>New Password</Text>
                            <Input
                                placeholder='New Password'
                                size='large'
                                value={newPassword}
                                secureTextEntry={true}
                                onChangeText={setNewPassword}
                                style={styles.input}
                            />
                            <Text style={styles.label}>Confirm New Password</Text>
                            <Input
                                placeholder='Retype New Password'
                                size='large'
                                status={newPassword == newPasswordConfirm ? 'basic' : 'danger'}
                                value={newPasswordConfirm}
                                secureTextEntry={true}
                                onChangeText={setNewPasswordConfirm}
                                style={styles.input}
                            />
                        </KeyboardAvoidingView>
                    </View>
                </ScrollView>
                <View style={{ paddingHorizontal: 15, paddingVertical: 15 }}>
                    <Button
                        style={styles.button}
                        size='large'
                        onPress={updatePassword}
                    >
                        Change Password
                    </Button>
                </View>
            </Layout>
        </>
    )
}

export default ChangePassword

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
