import React from 'react';
import { View, Text, Modal, TextInput } from 'react-native';
import { CardSection } from './CardSection';
import { Button } from './Button';
import { Input } from './Input';

function InfoModal2( { children, visible, onButton } ) {
    const { containerStyle, textStyle, cardSectionStyle } = styles;

    return (
        <Modal animationType='slide'
               transparent
               visible={visible}
               onRequestClose={() => {}}
        >
            <View style={containerStyle}>
                <CardSection style={cardSectionStyle}>
                    <View style={textStyle}>{children}</View>
                </CardSection>

                <CardSection>
                    <Button color='#1e88e5' pressed={onButton}>Close Window</Button>
                </CardSection>
            </View>
        </Modal>
    )
}

const styles = {
    containerStyle: {
        flex: 1,
        backgroundColor: 'rgba( 0, 0, 0, 0.75 )',
        position: 'relative',
        justifyContent: 'center'
    },
    cardSectionStyle: {
        justifyContent: 'center'
    },
    textStyle: {
        flex: 1
    },
}

export { InfoModal2 }