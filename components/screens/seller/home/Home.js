import React, { useContext, useEffect, useState } from 'react'
import { Dimensions, ImageBackground, View } from 'react-native';
import { Button, Card, Layout, List, Spinner, StyleService, Text, useStyleSheet, useTheme } from '@ui-kitten/components';
import { EditIcon, DeleteIcon, PlusIcon } from '../../common/Icons';
import Header from '../../common/Header'
import { UserContext } from '../../../theme/ApplyTheme'
import axios from 'axios';
import url from '../../../url';
import snackbar from '../../common/Snackbar'
import MySpinner from '../../common/MySpinner';

const Home = ({ navigation }) => {

    const styles = useStyleSheet(themedStyles);
    const theme = useTheme()
    const { state } = useContext(UserContext)
    const [loading, setLoading] = useState(true)
    const [products, setProducts] = useState([])

    const deleteProduct = (productId, index) => {
        console.log('deleting product')
        console.log(productId, index)
        setLoading(true)
        axios.post(`${url}/seller/deleteproduct`, { productId })
            .then(res => {
                if (res.data.status === 'success') {
                    products.splice(index, 1);
                    setProducts([...products])
                    snackbar({ type: res.data.status, message: res.data.message })
                }
                else {
                    snackbar({ type: res.data.status, message: res.data.message })
                }
            })
            .catch(err => console.log(err))
        setLoading(false)
    }

    // get seller products
    useEffect(() => {
        setLoading(true)
        const unsubscribe = navigation.addListener('focus', () => {
            axios.get(`${url}/seller/${state._id}/products`)
                .then(res => {
                    if (res.data.status === 'success') {
                        setProducts(res.data.products)
                    }
                    else {
                        snackbar({ type: res.data.status, message: res.data.message })
                    }
                })
                .catch(err => console.log(err))
        })
        setLoading(false)
        return unsubscribe;
    }, [navigation])

    const renderItemHeader = (info) => (
        <ImageBackground
            style={styles.itemHeader}
            source={{ uri: info.item.image }}
        />
    );

    const renderProductItem = (info) => (
        <Card
            style={styles.productItem}
            header={() => renderItemHeader(info)}
        >
            <Text category='h6' style={{ marginBottom: 5 }}>
                {info.item.name}
            </Text>
            <Text
                appearance='hint'
                category='s1'
                status={info.item.quantity <= 20 && 'danger'}
            >
                {info.item.quantity <= 20 ? 'Only ' : null}{info.item.quantity} {info.item.unit} Remaining
            </Text>
            <View style={styles.itemFooter}>
                <Text category='h6'>
                    ₹ {info.item.price} / {info.item.unit}
                </Text>
                <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                    <Button
                        style={[styles.iconButton, { marginRight: 15 }]}
                        size='medium'
                        accessoryLeft={EditIcon}
                        onPress={() => navigation.navigate('EDIT_DETAILS', { product: info.item })}
                    />
                    <Button
                        style={styles.iconButton}
                        size='medium'
                        accessoryLeft={DeleteIcon}
                        status='danger'
                        onPress={() => deleteProduct(info.item._id, info.index)}
                    />
                </View>
            </View>
        </Card>
    );

    return (
        <>
            <Header title='My Products' />
            {loading ?
                <MySpinner />
                :
                <Layout level='4' style={styles.container}>
                    {products.length == 0 ?
                        <>
                            <Layout level='4' style={{ flex: 1, justifyContent: 'center' }}>
                                <Text
                                    category='h6'
                                    appearance='hint'
                                    style={styles.emptyListText}
                                >
                                    You have no products in market
                                </Text>
                                <Button
                                    accessoryLeft={PlusIcon}
                                    style={{ width: '50%', alignSelf: 'center' }}
                                    onPress={() => navigation.navigate('Add_Product')}
                                >
                                    Add Product
                                </Button>
                            </Layout>
                        </>
                        :
                        <List
                            contentContainerStyle={styles.productList}
                            data={products}
                            numColumns={1}
                            renderItem={renderProductItem}
                        />
                    }
                </Layout>
            }
        </>
    )
}

export default Home

const themedStyles = StyleService.create({
    container: {
        flex: 1,
        backgroundColor: 'background-basic-color-2',
    },
    emptyListText: {
        // flex: 1,
        marginVertical: 25,
        textAlign: 'center'
    },
    productList: {
        // paddingHorizontal: 4,
        // paddingVertical: 8,
        backgroundColor: 'background-basic-color-4',
    },
    productItem: {
        flex: 1,
        margin: 8,
        // maxWidth: Dimensions.get('window').width - 16,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
    },
    itemHeader: {
        height: 200,
    },
    itemFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 16,
    },
    iconButton: {
        paddingHorizontal: 0,
        width: '30%',
    },
});
