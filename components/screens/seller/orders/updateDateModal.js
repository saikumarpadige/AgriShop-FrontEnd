import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Card, Modal, Text, Layout, Datepicker } from '@ui-kitten/components';
import { CalendarIcon } from '../../common/Icons';
import axios from 'axios'
import snackbar from '../../common/Snackbar'
import url from '../../../url'

const UpdateDateModal = ({ orders, setOrders, order, i }) => {

    const [visible, setVisible] = React.useState(false);

    const [date, setDate] = React.useState(order.deliveryDate);


    const updateOrderDate = () => {
        axios.post(`${url}/seller/order/update_date`, { orderId: order._id, date })
            .then(res => {
                if (res.data.status === 'success') {
                    orders[i].deliveryDate = res.data.order.deliveryDate
                    setOrders([...orders])
                    snackbar({ type: res.data.status, message: res.data.message })
                }
                else {
                    snackbar({ type: res.data.status, message: res.data.message })
                }
                setVisible(false)
            })
            .catch(err => console.log(err))
    }

    return (
        <View>

            <Text category='p1' status='primary' onPress={() => setVisible(true)}>
                EDIT
            </Text>

            <Modal
                visible={visible}
                backdropStyle={styles.backdrop}
                onBackdropPress={() => setVisible(false)}>
                <Card disabled={true} style={styles.cardConatiner}>
                    <Layout style={styles.container} level='1'>

                        <Text category='h6' style={{ marginVertical: 10 }}>
                            Delivery date: {new Date(date).toLocaleDateString()}
                        </Text>

                        <Datepicker
                            date={new Date(date)}
                            min={new Date()}
                            focusable={true}
                            onSelect={nextDate => setDate(nextDate)}
                            // backdropStyle={{ justifyContent: 'flex-start' }}
                            accessoryRight={CalendarIcon}
                        />

                    </Layout>
                    <Button style={{ marginVertical: 25 }} onPress={() => updateOrderDate()}>
                        Update
                    </Button>
                </Card>
            </Modal>

        </View>
    )
}

export default UpdateDateModal

const styles = StyleSheet.create({
    cardConatiner: {
        width: 320,
        height: 190,
        marginBottom: 100
    },
    backdrop: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
});