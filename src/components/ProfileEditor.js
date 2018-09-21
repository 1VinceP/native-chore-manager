import React, { Component } from 'react';
import { View, Text, Alert } from 'react-native';
import { connect } from 'react-redux';
import { updateUser } from '../redux/actions/actionIndex';
import { Actions } from 'react-native-router-flux';
import { Card, CardSection, Button, Input, SwitchInput, InfoModal, ConfirmModal } from './common';

import { blue } from './colors';

class ProfileEditor extends Component {
    constructor() {
        super();

        this.state = {
            newName: '',
            newPassword: '',
            newManager: null,
            newAdmin: null,

            showModal: false,
            showConfirmModal: false
        }
    }

    componentWillMount() {
        const { manager, admin } = this.props.user

        console.log( this.props.managerEdit )

        if( this.props.managerEdit ) {
            this.setState({
                newManager: manager,
                newAdmin: admin
            })
        }
    }

    onChangeText( prop, value ) {
        this.setState({
            [prop]: value
        })
    }

    handleManager( value ) {
        if( !this.state.newAdmin && !this.props.user.admin ) {
            this.setState({
                newManager: value
            })
        }
        else if( this.props.user.admin )
            Alert.alert( 'This user is an admin' )
    }

    handleAdmin( value ) {
        this.setState({
            newAdmin: value
        })

        if( !this.state.newManager ) {
            this.setState({
                newManager: true
            })
        }
    }

    onSavePress() {
        if( this.props.managerEdit ) {
            if( this.state.newAdmin ) {
                this.setState({ showConfirmModal: true })
            }
            else {
                this.onModalButton()
            }
        }
        else {
            this.setState({ showModal: true })
        }
    }

    onModalButton() {
        const { newName, newPassword, newManager, newAdmin } = this.state
        const { name, password, manager, admin, uid } = this.props.user
        let managementStatus, adminStatus

        if( newManager === null )
            managementStatus = manager
        else
            managementStatus = this.state.newManager

        if( newAdmin === null )
            adminStatus = admin
        else
            adminStatus = this.state.newAdmin

        this.setState({
            showModal: false,
            showConfirmModal: false
        })

        this.props.updateUser( newName || name, newPassword || password, managementStatus, adminStatus, uid )
        Actions.pop()
    }

    render() {
        const { user, managerEdit, adminEdit } = this.props
        return (
            <Card>
                { !managerEdit || adminEdit
                    ? <View>
                        <CardSection>
                            <Input
                                label={'Edit Name'}
                                placeholder={user.name}
                                value={this.state.newName}
                                onChangeText={(e) => this.onChangeText('newName', e)}
                            />
                        </CardSection>

                        <CardSection>
                            <Input
                                label={'Edit Password'}
                                placeholder={user.password}
                                value={this.state.newPassword}
                                onChangeText={(e) => this.onChangeText('newPassword', e)}
                            />
                        </CardSection>
                    </View>
                    : <CardSection>
                        <Text style={{fontSize: 18}}>{user.name}</Text>
                    </CardSection>
                }

                { managerEdit && !this.props.user.admin
                    ? <CardSection>
                        <SwitchInput
                            label={'Manager'}
                            value={this.state.newManager}
                            onValueChange={value => this.handleManager( value )}
                        />
                      </CardSection>
                    : null
                }

                { adminEdit && !this.props.user.admin
                    ? <CardSection>
                        <SwitchInput
                            label={'Admin'}
                            onValueChange={value => this.handleAdmin( value )}
                            value={this.state.newAdmin}
                        />
                      </CardSection>
                    : null
                }

                <CardSection>
                    <Button color={blue} pressed={() => this.onSavePress()}>
                        Save
                    </Button>
                </CardSection>

                <InfoModal
                    visible={this.state.showModal}
                    onButton={() => this.onModalButton()}
                >
                    Your changes will appear when you sign back in
                </InfoModal>

                <ConfirmModal
                    visible={this.state.showConfirmModal}
                    onAccept={() => this.onModalButton()}
                    onDecline={() => this.setState({showConfirmModal: false})}
                >
                    You have marked this person as an admin. This action cannot be undone. Continue?
                </ConfirmModal>
            </Card>
        )
    }
}

export default connect( null, { updateUser } )(ProfileEditor);