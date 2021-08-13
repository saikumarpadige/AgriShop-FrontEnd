import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import OrderDetails from '../../screens/seller/orders/OrderDetails';
import Orders from '../../screens/seller/orders/Orders';
const Stack = createStackNavigator();

const SellerOrderStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="ORDERS" component={Orders} />
            <Stack.Screen name="ORDER_DETAILS" component={OrderDetails} />
        </Stack.Navigator>
    )
}

export default SellerOrderStack