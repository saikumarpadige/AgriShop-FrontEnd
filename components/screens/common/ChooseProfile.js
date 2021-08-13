import React, { useState } from 'react'
import { Image, StyleSheet, View, StatusBar } from 'react-native'
import { Card, Layout, Text, Icon, StyleService, useStyleSheet, Button } from '@ui-kitten/components';
import { ChevronRightIcon } from './Icons';
import snackbar from '../common/Snackbar'

const ChooseProfile = ({ navigation }) => {

    const styles = useStyleSheet(themedStyles)
    const [selectedIndex, setSelectedIndex] = useState(null)

    const moveNext = () => {
        if (selectedIndex !== null) {
            selectedIndex === 0 ? navigation.navigate("BUYER_LOGIN") : navigation.navigate("SELLER_LOGIN")
        } else {
            snackbar({ type: 'failed', message: "You have to choose one profile" })
        }
    }

    return (
        <Layout level='4' style={styles.container}>
            {/* <Text style={{
                color: '#0D47A1',
                fontSize: 60,
                fontWeight: 'bold',
                fontFamily: 'sans-serif',
                textShadowRadius: 2,
                shadowColor: '#4CAF50',
                textShadowOffset: { width: 4, height: 4 },
                textTransform: 'capitalize',
                marginBottom: 75,
                marginTop: 50
            }}>
                AgriShop
            </Text> */}
            <StatusBar
                backgroundColor="#D9E4FF"
                barStyle="dark-content"
            />
            <View style={styles.logoContainer}>
            <Text category='h1' style={{ marginBottom: 25, textAlign: 'center', width: '100%', fontWeight: 'bold' }}>AGRISHOP</Text>
                <Image source={require('../../assets/shop-1.jpg')} style={styles.logo} />
            </View>
            <View style={styles.cardContainer}>
                <Text category='h4' style={{ marginBottom: 25, textAlign: 'center', width: '100%', fontWeight: 'bold' }}>Are You ?</Text>
                <Card
                    style={[styles.card, selectedIndex == 0 && styles.activeCard]}
                    onPress={() => setSelectedIndex(0)}
                >
                    <View style={styles.row}>
                        <Image source={require('../../assets/customer-1.jpg')} style={styles.cardImage} />
                        <View style={styles.cardText}>
                            <Text category='h5' style={styles.cardText}>Customer</Text>
                            <Text appearance='hint' category="c1" style={[styles.cardSubtitle]}>
                                Buy fresh vegetables and fruits at reasonable rates from direct farmer
                            </Text>
                        </View>
                    </View>
                </Card>
                <Text category='h6' appearance='hint' style={{ textAlign: 'center', marginBottom: 15 }}>----------  OR  ---------</Text>
                <Card
                    style={[styles.card, selectedIndex == 1 && styles.activeCard]}
                    onPress={() => setSelectedIndex(1)}
                >
                    <View style={styles.row}>
                        <Image source={require('../../assets/farmer-1.jpg')} style={styles.cardImage} />
                        <View style={styles.cardText}>
                            <Text category='h5' style={styles.cardText}>Farmer</Text>
                            <Text appearance='hint' category="c1" style={[styles.cardSubtitle]}>
                                Sell farm products such as vegetables, fruits etc directly to the customers
                            </Text>
                        </View>
                    </View>
                </Card>
            </View>
            <View style={styles.buttonContainer}>
                <Button
                    accessoryRight={ChevronRightIcon}
                    size='medium'
                    style={styles.button}
                    onPress={moveNext}>
                    {/* <Text category='h6' status='control'>NEXT</Text> */}
                Next
            </Button>
            </View>
        </Layout>
    )
}

export default ChooseProfile

const themedStyles = StyleService.create({
    container: {
        flex: 1,
        alignItems: 'center',
        padding: 15,
        backgroundColor: 'color-primary-200'
    },
    logoContainer: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    logo: {
        height: 125,
        width: 125,
        // marginTop: 40,
        // marginBottom: 50,
        borderRadius: 20,
    },
    row: {
        display: 'flex',
        flexDirection: 'row',
    },
    buttonContainer: {
        flex: 1,
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        alignSelf: 'flex-end'
    },
    button: {
        width: '40%',
        alignSelf: 'flex-end',
        marginBottom: '3%',
        // backgroundColor: '#fff',
        borderRadius: 24,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 1,
    },
    cardContainer: {
        flex: 4,
        width: '100%'
    },
    card: {
        width: '100%',
        textAlignVertical: 'top',
        marginBottom: 15,
        paddingLeft: -16,
        shadowColor: "color-primary-default",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 1,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 30,
        borderBottomRightRadius: 8,
        borderBottomLeftRadius: 30
    },
    activeCard: {
        // borderWidth: 2,
        borderWidth: 0,
        borderRightWidth: 8,
        borderColor: 'color-primary-400',
        elevation: 5,
        shadowOffset: {
            width: 3,
            height: 6,
        },
    },
    cardImage: {
        height: 125,
        width: 125,
        marginLeft: -24,
        marginVertical: -16,
    },
    cardText: {
        marginLeft: 10,
    },
    cardSubtitle: {
        marginTop: 10,
        marginLeft: 10,
        marginRight: 90,
    },
    icon: {
        width: 32,
        height: 32,
        alignSelf: 'center',
        marginBottom: 15,
    },
})
