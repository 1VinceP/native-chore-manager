import React, { Component } from 'react';
import { View, Text, TouchableWithoutFeedback, LayoutAnimation, NativeModules } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { CardSection, Button } from '../common';
import { selectChore, assignChoreToPerson, completeChore } from '../../redux/actions/actionIndex';

const { UIManager } = NativeModules
UIManager.setLayoutAnimationEnabledExperimental(true)

class ChoreListItem extends Component {
    constructor() {
        super();

        this.state = {

        }
    }

    componentWillMount() {
        console.log( 'ChoreListItem props:', this.props )
    }

    componentWillUpdate() {
        LayoutAnimation.spring()
    }

    renderDescription() {
        const { expanded } = this.props
        const { priority, reward, uid } = this.props.chore

        if( expanded ) {
            return (
                <CardSection style={{ flexDirection: 'column', paddingLeft: 10 }}>
                    <Text style={styles.descStyle}>Priority: {priority}</Text>
                    <Text style={styles.descStyle}>Reward: {reward}</Text>
                    { this.props.from === 'chores'
                        ? <Button color='blue' pressed={() => this.onAssign()}>Assign chore</Button>
                        : <Button color='green' pressed={() => this.onComplete()}>Complete chore</Button>
                    }
                    
                </CardSection>
            )
        }
    }

    onAssign() {
        const { name, priority, reward, recurring } = this.props.chore
        const { uid } = this.props.user

        this.props.assignChoreToPerson( name, priority, reward, recurring, uid )
    }

    onComplete() {
        const { user, chore } = this.props
        const { name, priority, reward, recurring, uid } = this.props.chore

        this.props.completeChore( user.points, reward, chore.uid, user.uid )
    }

    render() {
        const { titleStyle } = styles
        const { name, uid } = this.props.chore

        return (
            <TouchableWithoutFeedback onPress={() => this.props.selectChore(uid)}>
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
        paddingLeft: 15,
    },
    descStyle: {
        flex: 1,
        paddingLeft: 15,
        paddingRight: 15,
    }
}

function mapStateToProps( state, ownProps ) {
    const { user } = state.user;
    const { selectedChore } = state.chores
    const expanded = selectedChore === ownProps.chore.uid

    return {
        user,
        expanded
    };
}

export default connect( mapStateToProps, { selectChore, assignChoreToPerson, completeChore } )(ChoreListItem);