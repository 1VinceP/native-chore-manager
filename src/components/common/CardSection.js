import React from 'react';
import { View } from 'react-native';

function CardSection( props ) {

    return (
        <View style={[styles.containerStyle, props.style]}>
            {props.children}
        </View>
    )
}

const styles = {
    containerStyle: {
        borderBottomWidth: 1,
        padding: 5,
        backgroundColor: '#FFF',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        borderColor: '#DDD',
        position: 'relative'
    }
}

export { CardSection }