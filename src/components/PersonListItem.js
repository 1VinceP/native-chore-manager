import React, { Component } from 'react';
import _ from 'lodash';
import { View, Text, TouchableWithoutFeedback, LayoutAnimation, NativeModules } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { CardSection, Button } from './common';
import { selectChild } from '../redux/actions/actionIndex';

import { blue } from './colors';

const { UIManager } = NativeModules
UIManager.setLayoutAnimationEnabledExperimental(true)

class PersonListItem extends Component {
    constructor() {
        super();

        this.state = {
            chores: []
        }
    }

    componentWillMount() {
        this.setChores( this.props.person.chores )
    }

    componentWillReceiveProps( nextProps ) {
        this.setChores( nextProps.person.chores )
    }

    componentWillUpdate() {
        LayoutAnimation.spring()
    }

    setChores( choreList ) {
        let chores = _.map( choreList, ( val, uid ) => {
            return { ...val, uid }
        } )

        let choreNames = chores.map( chore => {
            return chore.name
        } )

        this.setState({
            chores: choreNames
        })
    }

    renderDescription() {
        const { expanded } = this.props
        const { manager, admin } = this.props.user
        const { name, points, uid } = this.props.person
        const { chores } = this.state

        if( expanded ) {
            return (
                <CardSection style={{ flexDirection: 'column', paddingLeft: 10 }}>
                    <Text style={styles.descStyle}>Points: {points}</Text>
                    <Text style={[styles.descStyle, {marginBottom: 10}]}>Chores: {chores.join(', ')}</Text>
                    {/* { manager && !this.props.person.manager && !this.props.person.admin
                        ? <Button color={blue} pressed={() => this.onEdit()} >Edit</Button>
                        : null
                    }
                    { admin && !this.props.person.admin
                        ? <Button color={blue} pressed={() => this.onEdit()} >Edit</Button>
                        : null
                    } */}

                    { admin && !this.props.person.admin
                        ? <Button color={blue} pressed={() => this.onEdit()} >Edit</Button>
                        : manager && !this.props.person.manager && !this.props.person.admin
                            ? <Button color={blue} pressed={() => this.onEdit()} >Edit</Button>
                            : null
                    }

                </CardSection>
            )
        }
    }

    onEdit() {
        let adminEdit = false
        if( this.props.user.admin )
            adminEdit = true

        Actions.profileEditor({ user: this.props.person, managerEdit: true, adminEdit })
    }

    render() {
        const { titleStyle } = styles
        const { name, manager, admin, uid } = this.props.person
        let stars = ''

        if( manager )
            stars += '*'

        if( admin )
            stars += '*'

        return (
            <TouchableWithoutFeedback onPress={() => this.props.selectChild(uid)}>
                <View>
                    <CardSection>
                        <Text style={titleStyle}>{name}{stars}</Text>
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
    const { user, childSelection } = state.user;
    const expanded = childSelection === ownProps.person.uid

    return {
        user,
        expanded
    };
}

export default connect( mapStateToProps, { selectChild } )(PersonListItem);