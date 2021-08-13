import React, { useContext, useEffect, useState } from 'react'
import { Dimensions, ImageBackground, View, StyleSheet } from 'react-native';
import { Button, Card, Layout, List, Spinner, StyleService, Text, useStyleSheet, useTheme } from '@ui-kitten/components';
import { EditIcon, DeleteIcon } from '../../common/Icons';

const renderItemHeader = () => (
    <ImageBackground
        style={styles.itemHeader}
        source={{ uri: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cHJvZHVjdHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80' }}
    />
);

const ProductItem = (info) => {

    // const styles = useStyleSheet(themedStyles);
    console.log(info)

    // return (
    //     <Card
    //         style={styles.productItem}
    //         header={() => renderItemHeader()}
    //     >
    //         <Text category='h6' style={{ marginBottom: 5 }}>
    //             {info.item.name}
    //         </Text>
    //         <Text
    //             appearance='hint'
    //             category='s1'
    //             status={info.item.quantity <= 20 && 'danger'}
    //         >
    //             {info.item.quantity <= 20 ? 'Only ' : null}{info.item.quantity} Remaining
    //         </Text>
    //         <View style={styles.itemFooter}>
    //             <Text category='h6'>
    //                 ₹ {info.item.price}
    //             </Text>
    //             <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
    //                 <Button
    //                     style={[styles.iconButton, { marginRight: 15 }]}
    //                     size='medium'
    //                     accessoryLeft={EditIcon}
    //                 />
    //                 <Button
    //                     style={styles.iconButton}
    //                     size='medium'
    //                     accessoryLeft={DeleteIcon}
    //                     status='danger'
    //                 />
    //             </View>
    //         </View>
    //     </Card>
    // )
}

export default ProductItem

const styles = StyleSheet.create({
    productItem: {
        flex: 1,
        margin: 8,
        maxWidth: Dimensions.get('window').width - 16,
        // backgroundColor: 'background-basic-color-1',
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
})
