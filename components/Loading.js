import React, { useContext } from 'react'
import { useEffect } from 'react'
import { StyleSheet } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserContext } from './theme/ApplyTheme';
import { Layout, Spinner, Text } from '@ui-kitten/components';

const Loading = ({ navigation }) => {

    const { dispatch } = useContext(UserContext)

    const getUser = () => {
        AsyncStorage.getItem('user')
            .then(user => {
                if (user) {
                    user = JSON.parse(user)
                    dispatch({ type: 'USER', payload: user })
                    console.log(user, 'found!')
                    if (user.role === 'buyer')
                        navigation.replace('BUYER_TAB')
                    else
                        navigation.replace('SELLER_TAB')
                }
                else {
                    navigation.replace('CHOOSE_PROFILE')
                }
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        getUser()
    }, [])

    return (
        <Layout level='4' style={styles.container}>
            <Spinner size='medium' />
        </Layout>
    )
}

export default Loading

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})
