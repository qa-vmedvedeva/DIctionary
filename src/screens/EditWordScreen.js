import React, {Component, useEffect, useState} from 'react';
import {StyleSheet, View, Image, Text, TextInput, Button, Alert} from 'react-native';
import {db, fetchItems, setupDatabase} from "../services/db-service";


export function PersonInfoScreen ({route, navigation}) {

    const [S_Id, setID] = useState('');
    const [S_Word, setWord] = useState('');
    const [S_Translation, setTranslation] = useState('');

    useEffect(() => {

        setID(route.params.id);
        setWord(route.params.word);
        setTranslation(route.params.translation);

    }, []);

    function editWord  ()  {
        // is text empty?
        if (S_Word === null || S_Word === "" || S_Translation === null || S_Translation === "" ) {
            console.log("empty input");
            return false;
        }
        console.log("I'm going to edit a word!");
        db.transaction(
            (tx) => {
                tx.executeSql("update Dictionary set word=?, translation=? where id=?;",[S_Word, S_Translation, S_Id], (tx, results) => {
                    // Database is successfully connected and table is created
                    console.log('Results', results.rowsAffected);
                });
                tx.executeSql("select * from Dictionary", [], (_ , { rows }) =>
                    console.log(JSON.stringify(rows))
                );
            },
            null,
            //  forceUpdate
        );
    }
    function deleteWorld () {
        db.transaction(
            (tx) => {
                tx.executeSql("delete from Dictionary where id=?;",[S_Id], (tx, results) => {
                    // Database is successfully connected and table is created
                    console.log('Results', results.rowsAffected);
                if (results.rowsAffected > 0) {
                    Alert.alert(
                        'Done',
                        'Record Deleted Successfully',
                        [
                            {
                                text: 'Ok',
                                onPress: () => navigation.navigate('My Dictionary'),
                            },
                        ],
                        { cancelable: false }
                    );
                }
            }
        );
    });
}

function handleSubmit ()  {
        editWord();
        navigation.navigate('My Dictionary');
    }
    //render = () => {
       // const {word} = this.props.route.params;
        return (
            <View >
                <TextInput style={styles.cellWord}
                           onChangeText={ (text) => setWord(text)}
                           value={S_Word}
                           placeholder="Word"
                />
                <TextInput style={styles.cellWord}
                           onChangeText={ (text) => setTranslation(text)}
                           value={S_Translation}
                           placeholder= "Translation"
                />
                <View style={styles.container}>
                    <Button style={styles.button}
                            color={'#3FD1C2B2'}
                            title={'Save'}
                            onPress={handleSubmit}
                    />
                    <Button
                            color={'#460707'}
                            title={'Delete'}
                            onPress={deleteWorld}
                    />
                </View>
            </View>
        );

   //};
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'stretch',
        justifyContent: 'space-evenly',
        flexDirection: 'row',
        flexWrap: 'wrap',
        padding: 12,
        color: '#3FD1C2B2',
        backgroundColor: '#2A2727',
    },

    cell: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 50,
    },
    cellWord: {
        fontSize: 36,
        color: '#3FD1C2B2',
    },
    cellValue: {
        fontSize: 16,
        color: 'rgba(63,209,194,0.7)',
    },
    button: {
        width: '50%',
    },
});