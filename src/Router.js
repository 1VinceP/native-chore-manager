import React from 'react';
import { Scene, Router, Stack } from 'react-native-router-flux';

import LoginForm from './components/LoginForm';
import FamilySignIn from './components/FamilySignIn';
import Dashboard from './components/Dashboard';

export default function RouterComponent() {

    return (
        <Router>

            <Stack key='root'>
                <Scene key='login' component={LoginForm} title='Log in to your family' initial />
                <Scene key='signin' component={FamilySignIn} title='Sign in your to your profile'  />
                <Scene key='dashboard' component={Dashboard} title='Dashboard' />
            </Stack>
            
        </Router>
    )
}