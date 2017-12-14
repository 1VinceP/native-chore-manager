import React from 'react';
import { View } from 'react-native';

function Card( props ) {

    return (
        <View style={styles.cardStyle}>
            {props.children}
        </View>
    )
}

const styles = {
    cardStyle: {
        borderWidth: 1,
        borderRadius: 2,
        borderColor: '#DDD',
        borderBottomWidth: 0,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 4,
        marginLeft: 5,
        marginRight: 5,
        marginTop: 10
    }
}

export { Card }