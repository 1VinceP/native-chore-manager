import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

function Button( { color, pressed, children, width } ) {

    const styles = {
        buttonStyle: {
            flex: !width ? 1 : 0,
            width,
            alignSelf: 'stretch',
            backgroundColor: '#FFF',
            borderRadius: 5,
            borderWidth: 1,
            borderColor: color,
            marginLeft: 5,
            marginRight: 5
        },
        textStyle: {
            alignSelf: 'center',
            color: color,
            fontSize: 16,
            fontWeight: '600',
            paddingTop: 10,
            paddingBottom: 10
        }
    }

    return (
        <TouchableOpacity style={styles.buttonStyle} onPress={pressed}>
            <Text style={styles.textStyle}>
                {children}
            </Text>
        </TouchableOpacity>
    )
}

export { Button }