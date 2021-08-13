import React, { useState, useContext } from 'react'
import { View, TouchableWithoutFeedback, StatusBar } from 'react-native'
import { Button, Input, Layout, StyleService, Text, useStyleSheet, Icon, useTheme } from '@ui-kitten/components';
import { KeyboardAvoidingView } from '../common/extra';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { PhoneIcon } from '../common/Icons';

import url from '../../url';
import axios from 'axios';
import { UserContext } from '../../theme/ApplyTheme';
import snackbar from '../common/Snackbar';

const BuyerLogin = ({ navigation }) => {

    const { dispatch } = useContext(UserContext)

    const [mobileNo, setMobileNo] = useState('')
    const [password, setPassword] = useState('')
    const [passwordVisible, setPasswordVisible] = useState(false);

    const login = () => {
        axios.post(`${url}/buyer/signin`, { mobileNo, password })
            .then(res => {
                if (res.data.status === 'success') {
                    snackbar({ type: res.data.status, message: res.data.message })
                    res.data.user.role = 'buyer'
                    AsyncStorage.setItem('user', JSON.stringify(res.data.user))
                        .then(() => {
                            dispatch({ type: 'USER', payload: res.data.user })
                            navigation.replace('LOADING')
                        })
                        .catch(err => console.log(err))
                }
                else {
                    snackbar({ type: res.data.status, message: res.data.message })
                }
            })
            .catch(err => console.log(err))
    }

    const styles = useStyleSheet(styles2);
    const theme = useTheme();

    const onPasswordIconPress = () => {
        setPasswordVisible(!passwordVisible);
    };

    const renderPasswordIcon = (props) => (
        <TouchableWithoutFeedback onPress={onPasswordIconPress}>
            <Icon {...props} name={passwordVisible ? 'eye-off' : 'eye'} />
        </TouchableWithoutFeedback>
    );

    return (
        <KeyboardAvoidingView style={styles.container}>
            <StatusBar
                backgroundColor={theme['color-primary-default']}
                barStyle="light-content"
            />
            <View style={styles.headerContainer}>
                <Text
                    category='h1'
                    status='control'>
                    Customer Login
                </Text>
                <Text
                    style={styles.signInLabel}
                    category='s1'
                    status='control'>
                    Sign in to your account
                </Text>
            </View>
            <Layout
                style={styles.formContainer}
                level='1'>
                <Input
                    placeholder='Mobile Number'
                    size='large'
                    accessoryRight={PhoneIcon}
                    value={mobileNo}
                    onChangeText={setMobileNo}
                />
                <Input
                    style={styles.passwordInput}
                    size='large'
                    placeholder='Password'
                    accessoryRight={renderPasswordIcon}
                    value={password}
                    secureTextEntry={!passwordVisible}
                    onChangeText={setPassword}
                />
                <View style={styles.forgotPasswordContainer}>
                    <Button
                        style={styles.forgotPasswordButton}
                        appearance='ghost'
                        status='basic'
                        onPress={() => navigation.navigate('FORGOT_PASSWORD', { role: 'buyer' })}
                    >
                        Forgot your password?
                    </Button>
                </View>
            </Layout>
            <Button
                style={styles.signInButton}
                size='giant'
                onPress={login}
            >
                LOGIN
            </Button>
            <Button
                style={styles.signUpButton}
                appearance='ghost'
                status='basic'
                onPress={() => navigation.replace('BUYER_REGISTER')}>
                Don't have an account? Create
            </Button>
        </KeyboardAvoidingView>
    )
}

export default BuyerLogin

const styles2 = StyleService.create({
    container: {
        backgroundColor: 'background-basic-color-1',
    },
    headerContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: 216,
        backgroundColor: 'color-primary-default',
    },
    formContainer: {
        flex: 1,
        paddingTop: 32,
        paddingHorizontal: 16,
    },
    signInLabel: {
        marginTop: 16,
    },
    signInButton: {
        marginHorizontal: 16,
    },
    signUpButton: {
        marginVertical: 12,
        marginHorizontal: 16,
    },
    forgotPasswordContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    passwordInput: {
        marginTop: 16,
    },
    forgotPasswordButton: {
        paddingHorizontal: 0,
    },
})
