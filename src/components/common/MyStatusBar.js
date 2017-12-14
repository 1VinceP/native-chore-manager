import React from 'react';
import { View, Platform } from 'react-native';

function MyStatusBar( props ) {

    const styles = {
        statusBar: {
            width: '100%',
            height: ( Platform.OS === 'ios' ) ? 20 : 24,
            backgroundColor: props.color,
            elevation: props.elevation || 0
        }
    }
    
    return (
        <View style={styles.statusBar} />
    )
}

export { MyStatusBar }