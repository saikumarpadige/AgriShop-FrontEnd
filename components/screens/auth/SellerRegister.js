import React, { useState, useContext } from 'react'
import { StyleSheet, View, TouchableWithoutFeedback, StatusBar } from 'react-native'
import { Button, Input, Layout, StyleService, Text, useStyleSheet, Icon, useTheme } from '@ui-kitten/components';
import { KeyboardAvoidingView } from '../common/extra';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { PersonIcon, PhoneIcon, CartIcon } from '../common/Icons';
import axios from 'axios';
import url from '../../url';
import { UserContext } from '../../theme/ApplyTheme';
import snackbar from '../common/Snackbar';


const SellerRegister = ({ navigation }) => {

    const { dispatch } = useContext(UserContext)

    const [mobileNo, setMobileNo] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [shopname, setShopname] = useState('')
    const [address, setAddress] = useState('')
    const [passwordVisible, setPasswordVisible] = useState(false);

    const register = () => {
        axios.post(`${url}/seller/signup`, { mobileNo, password, name, address, shopname })
            .then(res => {
                if (res.data.status === 'success') {
                    snackbar({ type: res.data.status, message: res.data.message })
                    res.data.user.role = 'seller'
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
                    Farmer Register
                </Text>
                <Text
                    style={styles.signInLabel}
                    category='s1'
                    status='control'>
                    Create new account
                </Text>
            </View>
            <Layout
                style={styles.formContainer}
                level='1'>
                <Input
                    placeholder='Name'
                    size='large'
                    style={styles.input}
                    accessoryRight={PersonIcon}
                    value={name}
                    onChangeText={setName}
                />
                <Input
                    placeholder='Shop Name'
                    size='large'
                    style={styles.input}
                    accessoryRight={CartIcon}
                    value={shopname}
                    onChangeText={setShopname}
                />
                <Input
                    placeholder='Mobile Number'
                    style={styles.input}
                    size='large'
                    accessoryRight={PhoneIcon}
                    value={mobileNo}
                    onChangeText={setMobileNo}
                />
                <Input
                    style={styles.input}
                    size='large'
                    placeholder='Password'
                    accessoryRight={renderPasswordIcon}
                    value={password}
                    secureTextEntry={!passwordVisible}
                    onChangeText={setPassword}
                />
                <Input
                    style={styles.input}
                    multiline={true}
                    textStyle={{ minHeight: 64, textAlignVertical: 'top', paddingTop: 10 }}
                    placeholder='Address'
                    value={address}
                    onChangeText={setAddress}
                />
            </Layout>
            <Button
                style={styles.signInButton}
                size='giant'
                onPress={register}
            >
                Register
            </Button>
            <Button
                style={styles.signUpButton}
                appearance='ghost'
                status='basic'
                onPress={() => navigation.replace('SELLER_LOGIN')}>
                Already have an account? Login
            </Button>
        </KeyboardAvoidingView>
    )
}

export default SellerRegister

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
        paddingHorizontal: 15,
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
    input: {
        marginBottom: 15,
    },
    forgotPasswordButton: {
        paddingHorizontal: 0,
    },
})
