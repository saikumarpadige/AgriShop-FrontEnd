import React, { useState, useContext, useEffect } from 'react'
import { StyleSheet, View } from 'react-native';
import { Card, List, Text, Layout } from '@ui-kitten/components';
import axios from 'axios';
import url from '../../../url';
import { UserContext } from '../../../theme/ApplyTheme';
import MySpinner from '../../common/MySpinner';
import Header from '../../common/Header'
import snackbar from '../../common/Snackbar';

const Orders = ({ navigation }) => {

    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(true)
    const { state } = useContext(UserContext)

    // get user orders
    useEffect(() => {
        setLoading(true)
        const unsubscribe = navigation.addListener('focus', () => {
            axios.get(`${url}/buyer/${state._id}/orders`)
                .then(res => {
                    if (res.data.status === 'success') {
                        setOrders(res.data.orders)
                        console.log(res.data.orders)
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

    const renderItemHeader = (headerProps, info) => (
        <View {...headerProps}>
            <Text category='h6' style={{ fontWeight: 'bold' }}>
                {info.item.seller.shopname}
            </Text>
        </View>
    );

    const renderItemFooter = (footerProps, info) => (
        info.item.status === 'Confirmed' ?
            <Text {...footerProps} status='warning' category='h6'>
                {info.item.status}
            </Text>
            :
            info.item.status === 'Cancelled' ?
                <Text {...footerProps} status='danger' category='h6'>
                    {info.item.status}
                </Text>
                :
                <Text {...footerProps} status='success' category='h6'>
                    {info.item.status}
                </Text>
    );

    const renderItem = (info) => (
        <Card
            style={styles.item}
            // status='warning'
            onPress={() => navigation.navigate('ORDER_DETAILS', { order: info.item })}
            header={headerProps => renderItemHeader(headerProps, info)}
            footer={footerprops => renderItemFooter(footerprops, info)}
        >
            <Text category='h6' style={styles.totalText}>₹ {info.item.total + info.item.deliveryCharges}</Text>
            <Text style={styles.address}>
                {info.item.items.map((item, i) => { return item.product.name }
                ).join(', ').slice(0, 50)}
            </Text>
            <Text style={styles.address}>Delivery by {new Date(info.item.deliveryDate).toDateString()}</Text>
            <Text style={styles.address}>{info.item.buyer.address}</Text>
        </Card>
    );

    return (
        <>
            <Header title='My Orders' />
            <Layout level='4' style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                {loading ?
                    <MySpinner />
                    :
                    <>
                        {orders.length == 0 ?
                            <Text
                                category='h6'
                                appearance='hint'
                                style={styles.emptyListText}
                            >
                                You have no orders
                            </Text>
                            :
                            <List
                                style={styles.container}
                                contentContainerStyle={styles.contentContainer}
                                data={orders}
                                renderItem={renderItem}
                            />
                        }
                    </>
                }
            </Layout>
        </>
    );
}
export default Orders

const styles = StyleSheet.create({
    container: {
        width: '100%'
    },
    contentContainer: {
        paddingHorizontal: 8,
        paddingTop: 10,
    },
    item: {
        // marginVertical: 4,
        marginBottom: 10
    },
    totalText: {
        textAlign: 'right'
    },
    address: {
        marginBottom: 10
    },
    emptyListText: {
        flex: 1,
        marginVertical: 25,
        textAlign: 'center'
    },
});