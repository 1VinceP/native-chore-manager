import React, { Component } from 'react';
import _ from 'lodash';
import firebase from 'firebase';
import { connect } from 'react-redux';
import { managePoints, getUserItems, getChores, getUserChores } from '../redux/actions/actionIndex';
import { Actions } from 'react-native-router-flux';
import { View, Text, StatusBar } from 'react-native';
import TabNavigator from 'react-native-tab-navigator';
import { Card, CardSection, Button } from './common';
import AdminList from './AdminList';
import ChoreList from './chores/ChoreList';
import InventoryList from './inventory/InventoryList';

class Dashboard extends Component {
    constructor() {
        super();

        this.state = {
            selectedTab: 'people'
        }
    }

    componentWillMount() {
        this.props.getUserItems( this.props.user.uid )
        this.props.getChores()
        this.props.getUserChores( this.props.user.uid )

        if( this.props.user.manager ) {
            this.setState({
                selectedTab: 'people'
            })
        }
        else {
            this.setState({
                selectedTab: 'chores'
            })
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

    setTab( tabName ) {
        this.setState({
            selectedTab: tabName
        })
    }

    renderNavigationTabs() {
        return (
            <TabNavigator>
                { this.props.user.manager
                    ? <TabNavigator.Item selected={this.state.selectedTab === 'people'}
                                        title='People'
                                        onPress={() => this.setTab('people')}
                        >
                        <AdminList user={this.props.user}/>
                        </TabNavigator.Item>
                    : null
                }
                <TabNavigator.Item selected={this.state.selectedTab === 'chores'}
                                    title='Chores'
                                    onPress={() => this.setTab('chores')}
                >
                    <ChoreList choreList={this.props.userChores}
                               from='dashboard'
                    />
                </TabNavigator.Item>

                <TabNavigator.Item selected={this.state.selectedTab === 'inventory'}
                                    title='Inventory'
                                    onPress={() => this.setTab('inventory')}
                >
                    <InventoryList user={this.props.user}/>
                </TabNavigator.Item>
            </TabNavigator>
        )
    }

    // onPointsButton( points, uid ) {
    //     this.props.managePoints( points, 500, uid )
    // }

    render() {
        const { name, manager, chores, points, uid } = this.props.user
        const { headerTextStyle, headerSectionStyle, navTabsSectionStyle } = styles

        return (
            <Card>
                <StatusBar hidden={true} />

                <CardSection style={headerSectionStyle}>
                    <Text style={headerTextStyle}>{name}</Text>
                    <Text style={headerTextStyle}>{points}</Text>
                    <Button color='blue' pressed={() => Actions.profileEditor({ user: this.props.user, managerEdit: false })}>
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

                {/* <CardSection>
                    <Button pressed={() => this.onPointsButton( points, uid )}>
                        Add 500 points to self
                    </Button>
                </CardSection> */}
                
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
    let userChores

    if( _.isEmpty( user.chores ) )
        userChores = [{name: ''}]
    else {
        let unsortedUserChores = _.map( user.chores, ( val, uid ) => {
            return { ...val, uid }
        } )
        userChores = _.sortBy( unsortedUserChores, ['priority'] ).reverse()
    }

    return {
        user,
        userChores
    };
}

export default connect( mapStateToProps, { managePoints, getUserItems, getChores, getUserChores } )(Dashboard);