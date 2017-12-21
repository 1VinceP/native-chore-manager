import React, { Component } from 'react';
import { View, Text, TouchableWithoutFeedback, LayoutAnimation, NativeModules } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { CardSection, Button } from './common';
import { selectChild } from '../redux/actions/actionIndex';

const { UIManager } = NativeModules
UIManager.setLayoutAnimationEnabledExperimental(true)

class PersonListItem extends Component {
    constructor() {
        super();

        this.state = {

        }
    }

    componentWillUpdate() {
        LayoutAnimation.spring()
    }

    renderDescription() {
        const { selection, expanded } = this.props
        const { manager } = this.props.user
        const { name, points, uid } = this.props.person

        if( expanded ) {
            return (
                <CardSection style={{ flexDirection: 'column', paddingLeft: 10 }}>
                    <Text style={styles.descStyle}>Points: {points}</Text>
                    { manager
                        ? <Button color='blue' pressed={() => this.onEdit()} >Edit</Button>
                        : null
                    }
                </CardSection>
            )
        }
    }

    onEdit() {
        Actions.profileEditor({ user: this.props.person, managerEdit: true })
    }

    render() {
        const { titleStyle } = styles
        const { name, manager, uid } = this.props.person

        return (
            <TouchableWithoutFeedback onPress={() => this.props.selectChild(uid)}>
                <View>
                    <CardSection>
                        <Text style={titleStyle}>{name}{manager ? '*' : null}</Text>
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

function mapStateToProps( state, ownProps ) {
    const { user, selection } = state.user;
    const expanded = selection === ownProps.person.uid

    return {
        user,
        expanded
    };
}

export default connect( mapStateToProps, { selectChild } )(PersonListItem);