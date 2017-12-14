import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

function Header( props ) {

    const styles = StyleSheet.create({
        header: {
            height: 59,
            width: '100%',
            backgroundColor: props.color,
            justifyContent: 'center',
            alignItems: 'center',
            elevation: 8,
            position: 'relative'
        },
        text: {
            fontSize: 24,
            color: '#ffffff'
        }
    })

    return (
        <View style={styles.header}>
            <Text style={styles.text}>{props.title}</Text>
        </View>
    )
}

export { Header }