import React, { useContext, useEffect, useState } from 'react'
import { Dimensions, ImageBackground, View, Image } from 'react-native';
import { Button, Card, Layout, List, StyleService, Text, useStyleSheet, Input, Icon } from '@ui-kitten/components';
import { CartIcon, SearchIcon, ChevronRightIcon } from '../../common/Icons';
import Header from '../../common/Header'
import { UserContext } from '../../../theme/ApplyTheme'
import axios from 'axios';
import url from '../../../url';
import snackbar from '../../common/Snackbar'
import MySpinner from '../../common/MySpinner';
import { TouchableOpacity } from 'react-native-gesture-handler'

const Home = ({ navigation }) => {

    const [loading, setLoading] = useState(false)
    const [products, setProducts] = useState([])
    const { state } = useContext(UserContext)

    const categories = [
        // { title: 'All', image: 'https://image.freepik.com/free-vector/people-buying-fresh-fruit-vegetables-outdoor-farm-market-isometric-composition_1284-56875.jpg' },
        { title: 'Vegetable', image: 'https://image.freepik.com/free-vector/fruit-salad-bowls-concept_23-2148493375.jpg' },
        { title: 'Dairy', image: 'https://image.freepik.com/free-vector/dairy-products-vector-flat-cartoon-illustration_86689-41.jpg' },
        { title: 'Fruit', image: 'https://st3.depositphotos.com/1041725/31792/v/450/depositphotos_317926002-stock-illustration-basket-with-fruits-illustration-vector.jpg' },
    ]

    const styles = useStyleSheet(themedStyles);

    return (
        <>
            <Header title='Home' />

            <Image source={{ uri: 'https://previews.123rf.com/images/dmitrymoi/dmitrymoi1710/dmitrymoi171000009/87355762-farm-set-with-farmers-products-and-animals-cartoon-vector-illustration-.jpg' }} style={styles.topImage} />

            <Layout level='4' style={styles.container}>

                <Text category='h6' style={{ marginBottom: 25 }}>Select Category</Text>

                {/* grid */}
                <View style={styles.cardGrid}>
                    {categories.map((category, i) =>
                        <TouchableOpacity key={i} onPress={() => navigation.navigate('PRODUCTS', { category: category.title })}>
                            <Card style={styles.card}>
                                <View style={styles.cardBody}>
                                    <Image
                                        style={styles.cardImage}
                                        source={{ uri: category.image }}
                                    />
                                    <Text style={{ textAlign: 'center', marginTop: 10 }}>{category.title}</Text>
                                </View>
                            </Card>
                        </TouchableOpacity>
                    )}
                </View>

                <Text style={styles.emptyListText} appearance='hint' category='h6'>OR</Text>

                <Button status='basic' size='large' style={{ marginVertical: 15 }} onPress={() => navigation.navigate('PRODUCTS', { category: 'All' })}>See All Products</Button>

            </Layout>
        </>
    )
}

export default Home

const themedStyles = StyleService.create({
    container: {
        flex: 1,
        padding: 20,
    },
    topImage: {
        height: 200,
        width: '100%'
    },
    cardGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        // marginVertical: 25
    },
    card: {
        width: 100,
        borderWidth: 0,
        backgroundColor: 'transparent',
        marginBottom: 15
    },
    cardBody: {
        marginHorizontal: -24,
        marginVertical: -16
    },
    cardImage: {
        height: 100,
        width: 100,
        borderRadius: 15,
    },
    itemFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 8,
    },
    emptyListText: {
        // flex: 1,
        marginVertical: 15,
        textAlign: 'center'
    },
});
