import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import OrderDetails from '../../screens/buyer/orders/OrderDetails';
import Orders from '../../screens/buyer/orders/Orders';
const Stack = createStackNavigator();

const BuyerOrderStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="ORDERS" component={Orders} />
            <Stack.Screen name="ORDER_DETAILS" component={OrderDetails} />
        </Stack.Navigator>
    )
}

export default BuyerOrderStack