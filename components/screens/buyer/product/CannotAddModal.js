import React, { useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Card, Modal, Text, Divider } from '@ui-kitten/components';
import axios from 'axios';
import { UserContext } from '../../../theme/ApplyTheme';
import url from '../../../url';

const CannotAddModal = ({ visible, setVisible, addToCart }) => {

    const { state, dispatch } = useContext(UserContext)

    const emptyCart = () => {
        axios.post(`${url}/buyer/cart/update`, { items: [], cartId: state.cartId })
            .then(res => {
                if (res.data.status === 'success') {
                    addToCart()
                }
                else {
                    snackbar({ type: res.data.status, message: res.data.message })
                }
            })
            .catch(err => console.log(err))
    }

    return (
        <View style={styles.container}>
            <Modal
                visible={visible}
                backdropStyle={styles.backdrop}
                onBackdropPress={() => setVisible(false)}
                style={{ width: '95%', paddingBottom: 20 }}
            >
                <Card
                    disabled={true}
                    style={styles.card}
                    header={headerProps =>
                        <Text category='h5' {...headerProps}>
                            Add To Cart
                        </Text>
                    }
                    footer={footerprops =>
                        <View {...footerprops}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}>
                                <>
                                    <Button
                                        style={styles.cancelButton}
                                        status='basic'
                                        onPress={() => setVisible(false)}
                                    >
                                        CANCEL
                                    </Button>
                                    <Button
                                        style={styles.completeButton}
                                        status='primary'
                                        onPress={emptyCart}
                                    >
                                        ADD
                                    </Button>
                                </>
                            </View>
                        </View>
                    }
                >
                    <View style={{ paddingVertical: 0 }}>
                        <Text category='h6'>
                            Your previously added products are from different shop.{'\n\n'}Do you  still want to add this product to cart ?
                            All your existing items in cart will be removed.
                        </Text>
                        {/* <View style={styles.row}>
                            <Text category='h6'>Total Amount</Text>
                            <Text category='h6'>₹ {order.total}</Text>
                        </View>
                        <View style={styles.row}>
                            <Text category='h6'>Delivery Charges</Text>
                            {order.deliveryCost == 0 ?
                                <Text category='h6' status='success' style={{ fontWeight: 'bold' }}>FREE</Text>
                                :
                                <Text category='h6'>₹ {order.deliveryCost}</Text>
                            }
                        </View>
                        <View style={styles.row}>
                            <Text category='h6'>Payment Type</Text>
                            <Text category='h6'>Cash on delivery</Text>
                        </View>
                        <Divider style={{ marginVertical: 10, backgroundColor: '#eee', marginHorizontal: -5 }} />
                        <View style={[styles.row, { marginBottom: 0 }]}>
                            <Text category='h6' style={{ fontWeight: 'bold' }}>Final Amount</Text>
                            <Text category='h6' style={{ fontWeight: 'bold' }}>₹ {order.total + order.deliveryCost}</Text>
                        </View> */}
                    </View>
                </Card>
            </Modal>
        </View>
    );
};

export default CannotAddModal

const styles = StyleSheet.create({
    container: {
        height: 0, width: 0
    },
    backdrop: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 7
    },
    cancelButton: {
        width: "40%",
        // backgroundColor: '#fff',
    },
    completeButton: {
        width: "40%",
        marginLeft: 10
    }
});