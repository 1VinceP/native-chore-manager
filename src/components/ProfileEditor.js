import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { updateUser } from '../redux/actions/actionIndex';
import { Actions } from 'react-native-router-flux';
import { Card, CardSection, Button, Input, SwitchInput, InfoModal } from './common';

class ProfileEditor extends Component {
    constructor() {
        super();

        this.state = {
            newName: '',
            newPassword: '',
            newManager: null,
            showModal: false
        }
    }

    componentWillMount() {
        if( this.props.managerEdit )
        this.setState({
            newManager: this.props.user.manager
        })
    }

    onChangeText( prop, value ) {
        this.setState({
            [prop]: value
        })
    }

    onSavePress() {
        const { newName, newPassword, newManager } = this.state
        const { name, password, manager, uid } = this.props.user
        let managementStatus

        if( newManager === null )
            managementStatus = manager
        else
            managementStatus = this.state.newManager

        this.props.updateUser( newName || name, newPassword || password, managementStatus, uid )

        this.props.managerEdit
            ? Actions.pop()
            : this.setState({ showModal: true })
        
    }

    onModalButton() {
        this.setState({
            showModal: false
        })

        Actions.pop()
    }

    render() {
        const { user, managerEdit } = this.props

        console.log( 'Editor User:', user )
        return (
            <Card>
                <CardSection>
                    <Input label={'Edit Name'}
                           placeholder={user.name}
                           value={this.state.newName}
                           onChangeText={(e) => this.onChangeText('newName', e)}
                    />
                </CardSection>

                <CardSection>
                    <Input label={'Edit Password'}
                           placeholder={user.password}
                           value={this.state.newPassword}
                           onChangeText={(e) => this.onChangeText('newPassword', e)}
                    />
                </CardSection>

                { managerEdit
                    ? <CardSection>
                        <SwitchInput label={'Manager:'}
                                     value={this.state.newManager}
                                     onValueChange={() => this.setState({ newManager: !this.state.newManager })}
                        />
                      </CardSection>
                    : null
                }

                <CardSection>
                    <Button color='blue' pressed={() => this.onSavePress()}>
                        Save
                    </Button>
                </CardSection>

                <InfoModal visible={this.state.showModal}
                           onButton={() => this.onModalButton()}
                >
                    Your changes will appear when you sign back in
                </InfoModal>
            </Card>
        )
    }
}

// function mapStateToProps( state ) {
//     const { user } = state.user;

//     return {
//         user
//     };
// }

export default connect( null, { updateUser } )(ProfileEditor);