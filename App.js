import React, {Component} from 'react';
import {SafeAreaView, StyleSheet, StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {RootNavigator} from './src/navigators/RootNavigator';

class App extends Component {
    render = () => {
        return (
            <SafeAreaView style={styles.container}>
                <StatusBar style="inverted" />
                <NavigationContainer theme={MyTheme}>
                    <RootNavigator />
                </NavigationContainer>
            </SafeAreaView>
        );
    };
}
const MyTheme = {
    colors: {
        primary: 'rgb(255, 45, 85)',
        background: '#2A2727',
        card: '#2A2727',
        text: 'rgb(227,226,226)',
        border: 'rgb(199, 199, 204)',
        notification: 'rgb(255, 69, 58)',
    },
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#2A2727',
    },
});

export default App;