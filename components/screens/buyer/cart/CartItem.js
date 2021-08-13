import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { Button, ListItem, Text } from '@ui-kitten/components';
import { CloseIcon, MinusIcon, PlusIcon } from '../../common/Icons';

export const CartItem = (props) => {

    const { style, product, index, onProductChange, onRemove, ...listItemProps } = props;

    const decrementButtonEnabled = () => {
        return product.quantity > 1;
    };

    const onRemoveButtonPress = () => {
        onRemove(product, index);
    };

    const onMinusButtonPress = () => {
        const updatedProduct = {
            product: product.product,
            quantity: product.quantity - 1
        }

        onProductChange(updatedProduct, index);
    };

    const onPlusButtonPress = () => {
        const updatedProduct = {
            product: product.product,
            quantity: product.quantity + 1
        }

        onProductChange(updatedProduct, index);
    };

    return (
        <ListItem
            {...listItemProps}
            style={[styles.container, style]}>
            <Image
                style={styles.image}
                source={{ uri: product.product.image }}
            />
            <View style={styles.detailsContainer}>
                {product.product ?
                    <>
                        <Text
                            category='h6'
                            style={{ marginBottom: 5 }}
                        >
                            {product.product.name}
                        </Text>
                        <Text category='s1'>
                            ₹ {product.product.price} / {product.product.unit}
                        </Text>
                        <View style={styles.amountContainer}>
                            <Button
                                style={[styles.iconButton, styles.amountButton]}
                                size='tiny'
                                accessoryLeft={MinusIcon}
                                onPress={onMinusButtonPress}
                                disabled={!decrementButtonEnabled()}
                            />
                            <Text
                                style={styles.amount}
                                category='s1'>
                                {`${product.quantity}`}
                            </Text>
                            <Button
                                style={[styles.iconButton, styles.amountButton]}
                                size='tiny'
                                accessoryLeft={PlusIcon}
                                onPress={onPlusButtonPress}
                            />
                            <Text
                                style={[styles.amount]}
                                category='s1'>
                                {`${product.product.unit}`}
                            </Text>
                        </View>
                    </>
                    :
                    <Text>Product No longer available</Text>
                }
            </View>
            <Button
                style={[styles.iconButton, styles.removeButton]}
                appearance='ghost'
                status='basic'
                accessoryLeft={CloseIcon}
                onPress={onRemoveButtonPress}
            />
        </ListItem>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'flex-start',
        paddingHorizontal: 0,
        paddingVertical: 0,
    },
    image: {
        width: 150,
        height: 125,
    },
    detailsContainer: {
        flex: 1,
        height: '100%',
        padding: 16,
    },
    amountContainer: {
        position: 'absolute',
        flexDirection: 'row',
        left: 16,
        bottom: 16,
    },
    amountButton: {
        borderRadius: 16,
    },
    amount: {
        textAlign: 'center',
        width: 50
    },
    removeButton: {
        position: 'absolute',
        right: 0,
    },
    iconButton: {
        paddingHorizontal: 0,
    },
});