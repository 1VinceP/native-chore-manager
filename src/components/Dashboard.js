import React, { Component } from 'react';
import firebase from 'firebase';
import { connect } from 'react-redux';
import { managePoints } from '../redux/actions/actionIndex';
import { Actions } from 'react-native-router-flux';
import { View, Text, StatusBar } from 'react-native';
import TabNavigator from 'react-native-tab-navigator';
import { Card, CardSection, Button } from './common';
import AdminList from './AdminList';
import ChoreList from './ChoreList';

class Dashboard extends Component {
    constructor() {
        super();

        this.state = {
            selectedTab: 'people'
        }
    }

    renderManagerActions() {
        if( this.props.user.manager ) {
            return (
                <CardSection>
                    <Button color='#800000' pressed={() => Actions.addPerson()}>
                        Add New Person
                    </Button>

                    <Button color='#112233' pressed={() => Actions.chores()}>
                        Go to Chores
                    </Button>
                </CardSection>
            )
        }

        return null
    }

    renderNavigationTabs() {
        if( this.props.user.manager ) {
            return (
                <TabNavigator>
                    <TabNavigator.Item selected={this.state.selectedTab === 'people'}
                        title='People'
                        onPress={() => this.setState({ selectedTab: 'people'})}
                    >
                        <AdminList user={this.props.user}/>
                    </TabNavigator.Item>
                    <TabNavigator.Item selected={this.state.selectedTab === 'chores'}
                                        title='Chores'
                                        onPress={() => this.setState({ selectedTab: 'chores' })}
                    >
                        <ChoreList />
                    </TabNavigator.Item>
                </TabNavigator>
            )
        }

        return <ChoreList />
    }

    onPointsButton( points, uid ) {
        console.log( this.props.user )
        this.props.managePoints( points, -5, uid )
    }

    render() {
        const { name, manager, chores, points, uid } = this.props.user
        const { headerTextStyle, headerSectionStyle, navTabsSectionStyle } = styles

        return (
            <Card>
                <StatusBar hidden={true} />

                <CardSection style={headerSectionStyle}>
                    <Text style={headerTextStyle}>{name}</Text>
                    <Text style={headerTextStyle}>{points}</Text>
                    <Button color='blue' pressed={() => Actions.profileEditor({ user: this.props.user })}>
                        Edit
                    </Button>
                </CardSection>

                {this.renderManagerActions()}

                <CardSection>
                    <Button color='orange' pressed={() => Actions.store()}>
                        Go to Store
                    </Button>
                </CardSection>

                <CardSection style={navTabsSectionStyle}>
                    {this.renderNavigationTabs()}
                </CardSection>

                <CardSection>
                    <Button pressed={() => this.onPointsButton( points, uid )}>
                        Subtract 5 points from self
                    </Button>
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
    },
    navTabsSectionStyle: {
        height: 300
    }
}

function mapStateToProps( state ) {
    const { user } = state.user;

    return {
        user
    };
}

export default connect( mapStateToProps, { managePoints } )(Dashboard);