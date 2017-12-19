import React, { Component } from 'react';
import { View, Text, TouchableWithoutFeedback, LayoutAnimation, NativeModules } from 'react-native';
import { CardSection } from './common';

const { UIManager } = NativeModules
UIManager.setLayoutAnimationEnabledExperimental(true)

class ListItem extends Component {
    constructor({ expanded }) {
        super();

        this.state = {

        }
    }

    componentWillUpdate() {
        LayoutAnimation.spring()
    }

    renderDescription() {
        // const { person, expanded } = this.props

        // if( expanded ) {
        //     return (
        //         <CardSection>
        //             <Text style={styles.descStyle}>{library.description}</Text>
        //         </CardSection>
        //     )
        // }
    }

    render() {
        const { titleStyle } = styles
        const { name, uid } = this.props.person

        return (
            <TouchableWithoutFeedback onPress={() => this.props.selectChild(uid)}>
                <View>
                    <CardSection>
                        <Text style={titleStyle}>{name}</Text>
                    </CardSection>
                    {this.renderDescription()}
                </View>
            </TouchableWithoutFeedback>
        )
    }
}

const styles = {
    titleStyle: {
        fontSize: 18,
        paddingLeft: 15
    },
    descStyle: {
        flex: 1,
        paddingLeft: 15,
        paddingRight: 15
    }
}

export default ListItem;