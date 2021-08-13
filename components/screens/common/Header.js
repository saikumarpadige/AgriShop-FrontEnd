import React from 'react';
import { Layout, MenuItem, OverflowMenu, Text, TopNavigation, TopNavigationAction } from '@ui-kitten/components';
import { StyleSheet } from 'react-native';
import { LogoutIcon, InfoIcon, BackIcon, MenuIcon } from './Icons'

const Header = ({ title, goback, navigation, menu, titleAlignLeft }) => {

    const [menuVisible, setMenuVisible] = React.useState(false);

    const toggleMenu = () => {
        setMenuVisible(!menuVisible);
    };

    const renderMenuAction = () => (
        <TopNavigationAction icon={MenuIcon} onPress={toggleMenu} />
    );

    const renderRightActions = () => (
        <React.Fragment>
            {/* <TopNavigationAction icon={EditIcon} /> */}
            <OverflowMenu
                anchor={renderMenuAction}
                visible={menuVisible}
                onBackdropPress={toggleMenu}>
                <MenuItem accessoryLeft={InfoIcon} title='About' />
                <MenuItem accessoryLeft={LogoutIcon} title='Logout' />
            </OverflowMenu>
        </React.Fragment>
    );

    const renderBackAction = () => (
        <TopNavigationAction icon={BackIcon} onPress={navigation.goBack} />
    );

    return (
        <Layout level='1' style={{
            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.23,
            shadowRadius: 2.62,
            elevation: 4,
        }}>
            <TopNavigation
                alignment={titleAlignLeft ? 'start' : 'center'}
                title={evaProps =>
                    <Text category='h6' style={{ marginLeft: titleAlignLeft ? 10 : 0 }}>
                        {title}
                    </Text>
                }
                accessoryLeft={goback ? renderBackAction : null}
                accessoryRight={menu ? renderRightActions : null}
            />
        </Layout>
    );
};

export default Header

const styles = StyleSheet.create({});