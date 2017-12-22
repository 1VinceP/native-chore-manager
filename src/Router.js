import React from 'react';
import { Scene, Router, Stack, Actions } from 'react-native-router-flux';
import { Text } from 'react-native';

import LoginForm from './components/LoginForm';
import FamilySignIn from './components/FamilySignIn';
import Dashboard from './components/Dashboard';
import AddPerson from './components/AddPerson';
import ProfileEditor from './components/ProfileEditor';
import Store from './components/store/Store';
import Chores from './components/chores/Chores';

export default function RouterComponent() {

    return (
        <Router>

            <Stack key='root'>
                <Scene key='login' component={LoginForm} title='Log in to your family' initial />
                <Scene key='signin' component={FamilySignIn} title='Sign in your to your profile'  />
                <Scene key='dashboard' component={Dashboard} title='Dashboard'
                       back={true} backTitle='Sign Out' />
                <Scene key='addPerson' component={AddPerson} title='Create Person' />
                <Scene key='profileEditor' component={ProfileEditor} title='Profile Editor' />
                <Scene key='store' component={Store} title='Store' />
                <Scene key='chores' component={Chores} title='Chores' />
            </Stack>
            
        </Router>
    )
}