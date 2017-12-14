import React from 'react';
import { View, ActivityIndicator } from 'react-native';

function Spinner( props ) {
    return (
        <View style={styles.spinner}>
            <ActivityIndicator size={props.size || 'large'} />
        </View>
    )
}

const styles = {
    spinner: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
}

export { Spinner };