import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Card, Modal, Text, Divider } from '@ui-kitten/components';

const OrderModal = ({ visible, setVisible, order, placeOrder, makePayment }) => {

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
                            Order Details
                        </Text>
                    }
                    footer={footerprops =>
                        <View {...footerprops}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}>
                                <>
                                    <Button
                                        style={styles.cancelButton}
                                        appearance='outline' status='danger'
                                        onPress={() => setVisible(false)}
                                    >
                                        CANCEL
                                    </Button>
                                    <Button
                                        style={styles.completeButton}
                                        status='primary'
                                        // onPress={placeOrder}
                                        onPress={makePayment}
                                    >
                                        CONFIRM
                                    </Button>
                                </>
                            </View>
                        </View>
                    }
                >
                    <View style={{ paddingVertical: 0 }}>
                        <View style={styles.row}>
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
                        {/* <View style={styles.row}>
                            <Text category='h6'>Payment Type</Text>
                            <Text category='h6'>Cash on delivery</Text>
                        </View> */}
                        <Divider style={{ marginVertical: 10, backgroundColor: '#eee', marginHorizontal: -5 }} />
                        <View style={[styles.row, { marginBottom: 0 }]}>
                            <Text category='h6' style={{ fontWeight: 'bold' }}>Final Amount</Text>
                            <Text category='h6' style={{ fontWeight: 'bold' }}>₹ {order.total + order.deliveryCost}</Text>
                        </View>
                    </View>
                </Card>
            </Modal>
        </View>
    );
};

export default OrderModal

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
        backgroundColor: '#fff',
    },
    completeButton: {
        width: "40%",
        marginLeft: 10
    }
});