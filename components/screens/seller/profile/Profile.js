import React, { useContext } from 'react'
import { View, ScrollView, TouchableOpacity } from 'react-native';
import { Button, Layout, Text, Avatar, Divider, Icon, StyleService, useStyleSheet } from '@ui-kitten/components';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CameraIcon } from '../../common/Icons'
import { UserContext } from '../../../theme/ApplyTheme'
import Header from '../../common/Header'

const Profile = ({ navigation }) => {

    const styles = useStyleSheet(themedStyles);
    const { state } = useContext(UserContext)

    const logout = () => {
        AsyncStorage.removeItem('user')
            .then(() => {
                navigation.replace('LOADING')
            })
            .catch(err => console.log(err))
    }

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
            <Header title="Profile" />

            <View style={{ flex: 1 }}>
                <View style={styles.photoContainer}>
                    <Avatar
                        source={require('../../../assets/customer-2.jpg')}
                        style={styles.photo}
                    />
                </View>

                <View style={styles.descriptionContainer}>
                    <Text style={styles.description} category='p1' appearance='hint'>
                        Name
                    </Text>
                    <Text style={styles.description} category='h6'>
                        {state.name}
                    </Text>
                </View>

                <View style={styles.descriptionContainer}>
                    <Text style={styles.description} category='p1' appearance='hint'>
                        Shop Name
                    </Text>
                    <Text style={styles.description} category='h6'>
                        {state.shopname}
                    </Text>
                </View>

                <View style={styles.descriptionContainer}>
                    <Text style={styles.description} category='p1' appearance='hint'>
                        Mobile Number
                    </Text>
                    <Text style={styles.description} category='h6'>
                        {state.mobileNo}
                    </Text>
                </View>

                {/* Address section */}
                <View style={[styles.descriptionContainer, { paddingBottom: 20 }]}>
                    <Text style={styles.description} category='p1' appearance='hint'>
                        Address
                    </Text>
                    <Text style={styles.description} category='h6'>
                        {state.address}
                    </Text>
                </View>
            </View>


            {/* Bottom Section */}
            <View style={{ marginVertical: 0 }}>
                <Button
                    style={[styles.button, { marginBottom: 10 }]}
                    size='medium'
                    onPress={() => navigation.navigate('EDIT_PROFILE', { role: 'seller' })}
                >
                    Edit Profile
                </Button>
                <Button
                    style={[styles.button, { marginBottom: 10 }]}
                    size='medium'
                    onPress={() => navigation.navigate('CHANGE_PASSWORD', { role: 'seller' })}
                >
                    Change Password
                </Button>
                <Button
                    style={styles.button}
                    size='large'
                    status='danger'
                    onPress={() => logout()}
                >
                    Logout
                </Button>
            </View>

        </ScrollView>
    )
}

export default Profile

const themedStyles = StyleService.create({
    container: {
        flex: 1,
        backgroundColor: 'background-basic-color-4',
    },
    contentContainer: {
        paddingBottom: 24,
        flex: 1,
    },
    photoContainer: {
        backgroundColor: 'background-basic-color-4',
    },
    photo: {
        aspectRatio: 1.0,
        height: 100,
        marginHorizontal: 8,
        alignSelf: 'center',
        marginVertical: 15,
    },
    descriptionContainer: {
        backgroundColor: 'background-basic-color-4',
        padding: 4,
    },
    description: {
        paddingHorizontal: 15,
        paddingVertical: 1,
    },
    options: {
        flexDirection: 'row',
        // justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        paddingLeft: 24,
        borderBottomColor: '#ddd',
        borderBottomWidth: 1
    },
    button: {
        // width: '100%',
        marginHorizontal: 15,
    }
})
