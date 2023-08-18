import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {DictionaryScreen} from '../screens/DictionaryScreen';
import {EditWordScreen} from '../screens/EditWordScreen';
import {AddWordScreen} from '../screens/AddWordScreen';

const Stack = createStackNavigator();

export const RootNavigator = () => {
    return (
        <Stack.Navigator initialRouteName={'My Dictionary'}>
            <Stack.Screen name={'My Dictionary'} component={DictionaryScreen}/>
            <Stack.Screen name={'Edit word'} component={EditWordScreen} />
            <Stack.Screen name={'Add new word'} component={AddWordScreen} />
        </Stack.Navigator>
    );
};

