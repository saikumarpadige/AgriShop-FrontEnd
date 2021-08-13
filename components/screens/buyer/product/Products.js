import React, { useContext, useEffect, useState } from 'react'
import { ImageBackground, View, } from 'react-native';
import { Button, Card, Layout, List, StyleService, Text, useStyleSheet, Input, Select, SelectItem } from '@ui-kitten/components';
import { CartIcon, SearchIcon } from '../../common/Icons';
import Header from '../../common/Header'
import { UserContext } from '../../../theme/ApplyTheme'
import axios from 'axios';
import url from '../../../url';
import snackbar from '../../common/Snackbar'
import MySpinner from '../../common/MySpinner';

const Products = ({ navigation, route }) => {

    const cat = route.params.category

    const [loading, setLoading] = useState(false)
    const [products, setProducts] = useState([])
    const { state, dispatch } = useContext(UserContext)
    const [q, setQ] = useState('')
    const [emptyText, setEmptyText] = useState('No products to show currently')
    const categories = ['All', 'Fruit', 'Vegetable', 'Dairy'];
    const [category, setCategory] = React.useState(cat);
    const [selectedIndex, setSelectedIndex] = React.useState(null);
    // const [cancelToken, setCancelToken] = useState(undefined)
    let cancelToken

    const styles = useStyleSheet(themedStyles);

    const selectCategory = (index) => {
        setSelectedIndex(index)
        setCategory(categories[index.row])
    }

    const searchProduct = () => {
        setLoading(true)

        if (typeof cancelToken != typeof undefined) {
            cancelToken.cancel('Canceling the request')
        }
        cancelToken = axios.CancelToken.source()
        // setCancelToken(axios.CancelToken.source())

        axios.get(`${url}/buyer/products/search`, { params: { q, category } }, { cancelToken: cancelToken?.token })
            .then(res => {
                if (res.data.status === 'success') {
                    setProducts(res.data.products)
                    if (res.data.length == 0) {
                        setEmptyText('No products found')
                    }
                    setLoading(false)
                }
                else {
                    snackbar({ type: res.data.status, message: res.data.message })
                    setLoading(false)
                }
            })
            .catch(err => {
                console.log(err)
                setLoading(false)
            })
    }

    const getAllProducts = () => {
        setLoading(true)
        if (typeof cancelToken != typeof undefined) {
            cancelToken.cancel('Canceling the request')
        }
        // setCancelToken(axios.CancelToken.source())
        cancelToken = axios.CancelToken.source()

        axios.get(`${url}/buyer/products`, { cancelToken: cancelToken?.token })
            .then(res => {
                if (res.data.status === 'success') {
                    setProducts(res.data.products)
                    setLoading(false)
                }
                else {
                    snackbar({ type: res.data.status, message: res.data.message })
                    setLoading(false)
                }
            })
            .catch(err => {
                console.log(err)
                setLoading(false)
            })
    }

    // search products
    useEffect(() => {
        if (q.trim() !== '' || category !== 'All') {
            console.log('search called')
            searchProduct()
        }
        else {
            console.log('all products called')
            getAllProducts()
        }
    }, [q, category])

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
            onPress={() => navigation.navigate('PRODUCT_DETAILS', { product: info.item })}
        >

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 5 }}>
                <Text category='h5' style={{ width: '65%' }}>
                    {info.item.name}
                </Text>
                <Text category='h6' style={{ width: '30%', textAlign: 'right' }}>
                    ₹ {info.item.price} / {info.item.unit}
                </Text>
            </View>
            <Text
                appearance='hint'
                category='s1'>
                {info.item.category}
            </Text>
            {/* <View style={styles.itemFooter}>
                <Text category='h6'>
                    ₹ {info.item.price} / {info.item.unit}
                </Text>
                <Button
                    style={styles.iconButton}
                    size='medium'
                    accessoryLeft={CartIcon}
                />
            </View> */}
        </Card>
    );

    return (
        <>
            <Header title='Products' goback={true} navigation={navigation} />
            <Layout level='4' style={styles.container}>

                {/* searchbar */}
                <Input
                    accessoryRight={SearchIcon}
                    size='large'
                    placeholder='Search your favorite product'
                    value={q}
                    onChangeText={setQ}
                    style={{ margin: 10 }}
                />
                <Select
                    size='large'
                    selectedIndex={selectedIndex}
                    onSelect={index => selectCategory(index)}
                    value={category}
                    style={{ width: '50%', alignSelf: 'flex-end', margin: 10, marginTop: 0 }}
                >
                    {categories.map((item, i) =>
                        <SelectItem title={item} key={i} />
                    )}
                </Select>

                {loading ?
                    <MySpinner />
                    :
                    products.length == 0 ?
                        <Layout level='4' style={{ flex: 1, justifyContent: 'center' }}>
                            <Text
                                category='h6'
                                appearance='hint'
                                style={styles.emptyListText}
                            >
                                {emptyText}
                            </Text>
                        </Layout>
                        :

                        <List
                            contentContainerStyle={styles.productList}
                            data={products}
                            numColumns={1}
                            renderItem={renderProductItem}
                        />
                }
            </Layout>

        </>
    )
}

export default Products

const themedStyles = StyleService.create({
    container: {
        flex: 1,
        // backgroundColor: 'background-basic-color-2',
        // padding: 10
    },
    productList: {
        // paddingHorizontal: 8,
        // paddingTop: 8,        
        backgroundColor: 'background-basic-color-4',
    },
    productItem: {
        flex: 1,
        margin: 8,
        // maxWidth: Dimensions.get('window').width - 16,
        // backgroundColor: 'background-basic-color-4',
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
        // height: '100%' 
    },
    itemFooter: {
        // flexDirection: 'row',
        // justifyContent: 'space-between',
        // alignItems: 'center',
        paddingTop: 8,
        // paddingHorizontal: 20,
    },
    iconButton: {
        width: '25%'
    },
    emptyListText: {
        // flex: 1,
        marginVertical: 25,
        textAlign: 'center'
    },
});
