import React, { Component } from 'react';
import _ from 'lodash';
import { View, Text, ListView } from 'react-native';
import { connect } from 'react-redux';
import { Input, Button, Card, CardSection } from './common';
import { getFamily, createPerson, famPassChanged } from '../redux/actions/actionIndex';


class FamilySignIn extends Component {
    constructor() {
        super();

        this.state = {
            firstTimeSetup: false
        }
    }

    componentWillMount() {
        this.props.getFamily()

        console.log( this.props.famList )

        if( this.props.famList.length === 0 ) {
            console.log( 'FIRST TIME USER' )

            this.setState({
                firstTimeSetup: true
            })

            this.props.createPerson( 'Person1', '', true )
            this.props.getFamily()
        }

        // this.createDataSource( this.props.famList )
    }

    // createDataSource(  )

    onSignInChange( text ) {
        this.props.famPassChanged( text )
    }

    render() {
        return (
            <Card>
                <CardSection></CardSection>
                <CardSection>
                    <Input label={'Password'}
                           placeholder={'Password'}
                           secure={true}
                           onChangeText={(e) => this.onSignInChange(e)}
                           value={this.props.famPass}
                    />
                </CardSection>
                <CardSection>
                    <Button color='#00ff00'>
                        Sign In
                    </Button>
                </CardSection>
            </Card>
        )
    }
}

function mapStateToProps( state ) {
    const { famPass } = state.family;

    const famList = _.map( state.family.famList, ( val, uid ) => {
        return { ...val, uid }
    } )

    return {
        famPass,
        famList
    };
}

export default connect( mapStateToProps, { getFamily, createPerson, famPassChanged } )(FamilySignIn);