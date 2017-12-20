import React, { Component } from 'react';
import firebase from 'firebase';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { View, Text, StatusBar } from 'react-native';
import { Card, CardSection, Button } from './common';
import AdminList from './AdminList';

class Dashboard extends Component {
    constructor() {
        super();

        this.state = {

        }
    }

    render() {
        const { name, manager, chores, points } = this.props.user
        const { headerTextStyle, headerSectionStyle } = styles

        console.log( 'User props:', this.props.user )

        return (
            <Card>
                <StatusBar hidden={true} />

                <CardSection style={headerSectionStyle}>
                    <Text style={headerTextStyle}>{name}</Text>
                    <Text style={headerTextStyle}>{points}</Text>
                </CardSection>

                <CardSection>
                    <Button color='orange' pressed={() => Actions.addPerson()}>
                        +
                    </Button>
                </CardSection>

                <CardSection>
                    { manager
                        ? <AdminList user={this.props.user}/>
                        : null
                    }
                </CardSection>
            </Card>
        )
    }
}

const styles = {
    headerSectionStyle: {
        justifyContent: 'space-between',
        paddingLeft: 20,
        paddingRight: 20
    },
    headerTextStyle: {
        fontSize: 18,
        color: 'purple'
    }
}

function mapStateToProps( state ) {
    const { user } = state.user;

    return {
        user
    };
}

export default connect( mapStateToProps, {} )(Dashboard);