import React, {Component} from 'react';
import {StyleSheet, View, Image, Text, TextInput, Button, Platform, Alert, TouchableOpacity} from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import AntDesign from '@expo/vector-icons';
import { useState, useEffect } from "react";
import * as SQLite from "expo-sqlite";
import {db} from "../services/db-service"


{/*export function openDatabase() {
    if (Platform.OS === "web") {
        return {
            transaction: () => {
                return {
                    executeSql: () => {},
                };
            },
        };
    }

    const db = SQLite.openDatabase("dictionary.db");
    return db;
}
const db = openDatabase();
const tableName = 'Dictionary';

export const createTable =  () => {
    // create table if not exists
    const query = `CREATE TABLE IF NOT EXISTS Dictionary (id integer primary key autoincrement, word text, translation text, photo BLOB);`;
    db.transaction((tx) =>
        tx.executeSql(query))
};
*/}

function addToDB  (word, translation)  {
    // is text empty?
    if (word === null || word === "" || translation === null || translation === "") {
        console.log("empty input");
        return false;
    }
    console.log("I'm going to add a word!");
    db.transaction(
        (tx) => {
            tx.executeSql("insert into Dictionary (word, translation) values ('" + word + "', '" + translation + "')", () => {
                // Database is successfully connected and table is created
                console.log(word, translation);
            });
            tx.executeSql("select * from Dictionary", [], (_ , { rows }) =>
                console.log(JSON.stringify(rows))
            );
        },
        null,
        //  forceUpdate
    );
}
export class AddWordScreen extends Component {
    componentDidMount() {
       // this.setupDatabase();
            }
    constructor(props) {
        super(props);
        this.state = {
            word: '',
            translation: '',// This will store the value from TextInput
        };
    }

    // Function to handle changes in TextInput
    handleInputWord = (text) => {
        this.setState({ word: text });
    }

    handleInputTranslation = (text) => {
        this.setState({ translation: text });
    }
    setupDatabase = () => {
        db.transaction(tx => {
            tx.executeSql(
                "CREATE TABLE IF NOT EXISTS Dictionary (id INTEGER PRIMARY KEY AUTOINCREMENT, word text, translation text, photo BLOB);",
                [],
                () => {
                    // Database is successfully connected and table is created
                    Alert.alert('Success', 'Database connected and table created.');
                },
                (txObj, error) => {
                    // Failed to establish a database connection
                    Alert.alert('Error', `Could not establish database connection: ${error.message}`);
                }
            );
        });
    }

    handleSubmit = () => {
        // Assuming you have a function to save data to the database
        addToDB(this.state.word, this.state.translation);
        if(this.state.word!=='' && this.state.translation !== 0) {
            this.setState({word: '', translation: ''});
            this.props.navigation.navigate('My Dictionary');
            // Clear the input fields after submission
        }

    }
    render = () => {
        const btnName = "Add word";
        return (
            <View style={styles.container} >

                <TextInput style={styles.cellWord}
                           multiline={true}
                           onChangeText={this.handleInputWord} // Call handleInputChange on text change
                           value={this.state.word} // Bind the input value to the state
                           placeholder="Word"
                           placeholderTextColor={'rgba(63,209,194,0.44)'}
                />
                <TextInput style={styles.cellWord}
                           multiline={true}
                           onChangeText={this.handleInputTranslation} // Call handleInputChange on text change
                           value={this.state.translation} // Bind the input value to the state
                           placeholder= "Translation"
                           placeholderTextColor={'rgba(63,209,194,0.44)'}
                />

                <TouchableOpacity style={styles.button}
                                  onPress={this.handleSubmit} >
                <Text style={styles.buttonTitle}>{btnName}</Text>
                </TouchableOpacity>
            </View>

        );
    };

}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#2A2727',
        color: '#3FD1C2B2',
    },
    cell: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 50,
        margin: 150,
    },
    cellWord: {
        fontSize: 30,
        color: '#3FD1C2B2',
        marginTop: 20,
        marginHorizontal: 10,

    },
    cellValue: {
        fontSize: 16,
        color: 'rgba(63,209,194,0.7)',
    },
    button: {
        paddingTop:40,
    },
    buttonTitle: {
        paddingHorizontal: 120,
        paddingVertical: 7,
        color: 'white',
        fontSize: 22,
        backgroundColor: '#3fd1c2',
        borderRadius: 8,
    }
});