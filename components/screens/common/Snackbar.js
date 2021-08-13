import Snackbar from 'react-native-snackbar'

export default function snackbar({ type, message }) {

    if (type === 'success') {
        Snackbar.show({
            text: message,
            duration: Snackbar.LENGTH_LONG,
            backgroundColor: '#00E096',
            action: {
                text: 'OK',
                textColor: 'white',
                onPress: () => { Snackbar.dismiss() },
            },
        });
    } else {
        Snackbar.show({
            text: message,
            duration: Snackbar.LENGTH_LONG,
            backgroundColor: '#FF3D71',
            action: {
                text: 'OK',
                textColor: 'white',
                onPress: () => { Snackbar.dismiss() },
            },
        });
    }
}