import React from 'react';
import { View, Text, Modal } from 'react-native';
import { CardSection } from './CardSection';
import { Button } from './Button';

import { green, red } from '../colors';

function ConfirmModal( { children, visible, onAccept, onDecline } ) {
    const { containerStyle, textStyle, cardSectionStyle } = styles;

    return (
        <Modal animationType='slide'
               transparent
               visible={visible}
               onRequestClose={() => {}}
        >
            <View style={containerStyle}>
                <CardSection style={cardSectionStyle}>
                    <Text style={textStyle}>{children}</Text>
                </CardSection>

                <CardSection>
                    <Button color={green} pressed={onAccept}>Yes</Button>
                    <Button color={red} pressed={onDecline}>No</Button>
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
        flex: 1,
        fontSize: 18,
        textAlign: 'center',
        lineHeight: 40
    },
}

export { ConfirmModal }