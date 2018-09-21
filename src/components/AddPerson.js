import React, { Component } from 'react';
import { View, Text, Switch } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { Card, CardSection, Button, Input, SwitchInput, ConfirmModal } from './common';
import { createPerson } from '../redux/actions/actionIndex';

import { green } from './colors';

class AddPerson extends Component {
    constructor() {
        super();

        this.state = {
            name: '',
            password: '',
            manager: false,
            admin: false,

            showModal: false
        }
    }

    handleInputChange( prop, value ) {
        this.setState({
            [prop]: value
        })
    }

    handleManager( value ) {
        if( !this.state.admin ) {
            this.setState({
                manager: value
            })
        }
    }

    handleAdmin( value ) {
        this.setState({
            admin: value
        })

        if( !this.state.manager ) {
            this.setState({
                manager: true
            })
        }
    }

    handleButton() {
        if( this.state.admin ) {
            this.setState({
                showModal: true
            })
        }
        else
            this.savePerson()
    }

    savePerson() {
        const { name, password, manager, admin } = this.state

        console.log( name, password, manager, admin )

        this.props.createPerson( name, password, manager, admin )
        Actions.pop()
    }

    render() {

        console.log( 'admin?', this.props.user )
        return (
            <Card>
                <CardSection>
                    <Input
                        label={'Name'}
                        value={this.state.name}
                        onChangeText={value => this.handleInputChange('name', value)}
                        placeholder={'John'}
                    />
                </CardSection>

                <CardSection>
                    <Input
                        label={'Password'}
                        value={this.state.password}
                        onChangeText={value => this.handleInputChange('password', value)}
                        placeholder={'Password'}
                    />
                </CardSection>

                <CardSection>
                    <SwitchInput
                        label={'Manager'}
                        onValueChange={value => this.handleManager( value )}
                        value={this.state.manager}
                    />
                </CardSection>

                { this.props.user.admin
                    ? <CardSection>
                        <SwitchInput
                            label={'Admin'}
                            onValueChange={value => this.handleAdmin( value )}
                            value={this.state.admin}
                        />
                      </CardSection>
                    : null
                }

                <CardSection>
                    <Button color={green} pressed={() => this.handleButton()} >
                        Add Person
                    </Button>
                </CardSection>

                <ConfirmModal
                    visible={this.state.showModal}
                    onAccept={() => this.savePerson()}
                    onDecline={() => this.setState({showModal: false})}
                >
                    You have marked this person as an admin. This action cannot be undone. Continue?
                </ConfirmModal>
            </Card>
        )
    }
}

function mapStateToProps( state ) {
    const { user } = state.user;

    return {
        user
    };
}

export default connect( mapStateToProps, { createPerson } )(AddPerson);