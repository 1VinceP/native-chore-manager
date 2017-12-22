import React from 'react';
import { View, Text, TextInput } from 'react-native';

function NumericInput( { label, value, onChangeText, placeholder } ) {
    const { containerStyle, labelStyle, inputStyle } = styles

    return (
        <View style={containerStyle}>
            <Text style={labelStyle}>{label}</Text>
            <TextInput style={inputStyle}
                       value={value}
                       keyboardType='numeric'
                       onChangeText={onChangeText}
                       underlineColorAndroid={'transparent'}
                       placeholder={placeholder}
                       autoCorrect={false}
            />
        </View>
    )
}

const styles = {
    containerStyle: {
        height: 40,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
    },
    labelStyle: {
        fontSize: 18,
        paddingLeft: 20,
        flex: 1
    },
    inputStyle: {
        color: '#000',
        paddingRight: 5,
        paddingLeft: 5,
        fontSize: 18,
        lineHeight: 23,
        flex: 2
    }
}

export { NumericInput };