import React from 'react';
import { Scene, Router, Stack, Actions } from 'react-native-router-flux';
import { Text } from 'react-native';

import LoginForm from './components/LoginForm';
import FamilySignIn from './components/FamilySignIn';
import Dashboard from './components/Dashboard';
import AddPerson from './components/AddPerson';

export default function RouterComponent() {

    return (
        <Router>

            <Stack key='root'>
                <Scene key='login' component={LoginForm} title='Log in to your family' initial />
                <Scene key='signin' component={FamilySignIn} title='Sign in your to your profile'  />
                <Scene key='dashboard' component={Dashboard} title='Dashboard'
                       headerBackTitle={'Sign Out'} />
                <Scene key='addPerson' component={AddPerson} title='Create Person' />
            </Stack>
            
        </Router>
    )
}