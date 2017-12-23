import React from 'react';
import { View, Text, Picker } from 'react-native';

function PickerInput( { label, selectedValue, onValueChange, list } ) {
    const { containerStyle, labelStyle, inputStyle } = styles

    let mappedList = list.map( ( listItem, i ) => {
        return (
            <Picker.Item key={i} label={listItem} value={listItem} />
        )
    } )

    return (
        <View style={containerStyle}>
            <Text style={labelStyle}>{label}</Text>
            <Picker onValueChange={onValueChange}
                    selectedValue={selectedValue}
                    style={{ width: '25%' }}
            >
                {mappedList}
            </Picker>
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

export { PickerInput };