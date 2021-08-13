import React, { useState, useContext } from 'react'
import { View, TouchableWithoutFeedback, StatusBar, Alert } from 'react-native'
import { Button, Input, Layout, StyleService, Text, useStyleSheet, Icon, useTheme } from '@ui-kitten/components';
import { KeyboardAvoidingView } from '../common/extra';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { PhoneIcon } from '../common/Icons';

import url from '../../url';
import axios from 'axios';
import { UserContext } from '../../theme/ApplyTheme';
import snackbar from '../common/Snackbar';

const ForgotPassword = ({ navigation, route }) => {

    const { dispatch } = useContext(UserContext)

    const [mobileNo, setMobileNo] = useState('')
    const [otp, setOtp] = useState('')
    const [otpReceived, setOtpReceived] = useState('')
    const [password, setPassword] = useState('')
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [verified, setVerified] = useState(false)
    const [otpDisable, setOtpDisable] = useState(false)
    const { role } = route.params

    // console.log(role)

    const verifyNumber = () => {
        if (otp === otpReceived) {
            setVerified(true)
            snackbar({ type: 'success', message: 'OTP verification successful' })
        }
        else {
            Alert.alert('OTP verification failed', 'Please enter correct OTP')
        }
    }

    const resetPassword = () => {
        axios.post(`${url}/reset_password`, { password, role, mobileNo })
            .then(res => {
                if (res.data.status === 'success') {
                    snackbar({ type: res.data.status, message: res.data.message })
                    if (role == 'buyer') {
                        navigation.replace('BUYER_LOGIN')
                    }
                    else {
                        navigation.replace('SELLER_LOGIN')
                    }
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

    const sendOTP = () => {
        axios.post(`${url}/send_otp`, { mobileNo, role })
            .then(res => {
                if (res.data.status === 'success') {
                    snackbar({ type: res.data.status, message: res.data.message })
                    console.log(res.data)
                    setOtpDisable(true)
                    setOtpReceived(res.data.otp)
                }
                else {
                    snackbar({ type: res.data.status, message: res.data.message })
                }
            })
            .catch(err => console.log(err))
    }

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
                    Forgot Password
                </Text>
                <Text
                    style={styles.signInLabel}
                    category='s1'
                    status='control'>
                    Set new password
                </Text>
            </View>
            <Layout
                style={styles.formContainer}
                level='1'
            >
                {!verified ?
                    <>
                        <Input
                            placeholder='Mobile Number'
                            size='large'
                            accessoryRight={PhoneIcon}
                            value={mobileNo}
                            onChangeText={setMobileNo}
                            style={styles.input}
                        />
                        <Input
                            placeholder='Enter 6 Digit OTP'
                            size='large'
                            // accessoryRight={PhoneIcon}
                            value={otp}
                            onChangeText={setOtp}
                            style={styles.input}
                        />
                        <Button
                            style={styles.sendOTPButton}
                            onPress={sendOTP}
                            disabled={mobileNo.length != 10 || otpDisable}
                        >
                            Send OTP
                        </Button>
                        {otpDisable && <Text style={{ textAlign: 'center' }}>Didn't receive OTP ? Try again after 10 minutes</Text>}
                    </>
                    :
                    <>
                        <Input
                            style={styles.input}
                            size='large'
                            placeholder='Enter New Password'
                            accessoryRight={renderPasswordIcon}
                            value={password}
                            secureTextEntry={!passwordVisible}
                            onChangeText={setPassword}
                        />
                    </>
                }
            </Layout>
            {!verified ?
                <Button
                    style={styles.verifyButton}
                    size='giant'
                    onPress={verifyNumber}
                    disabled={otp.length != 6 || mobileNo.length != 10}
                >
                    Verify
                </Button>
                :
                <Button
                    style={styles.verifyButton}
                    size='giant'
                    onPress={resetPassword}
                >
                    Reset Password
                </Button>
            }
        </KeyboardAvoidingView>
    )
}

export default ForgotPassword

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
    verifyButton: {
        marginHorizontal: 16,
        marginBottom: 16
    },
    sendOTPButton: {
        marginBottom: 16,
    },
    forgotPasswordContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    input: {
        marginBottom: 16,
    },
    forgotPasswordButton: {
        paddingHorizontal: 0,
    },
})
