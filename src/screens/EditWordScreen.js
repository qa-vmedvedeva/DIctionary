import React, {Component, useEffect, useState} from 'react';
import {StyleSheet, View, Image, Text, TextInput, Button, Alert, TouchableOpacity} from 'react-native';
import {db, fetchItems, setupDatabase} from "../services/db-service";


export function EditWordScreen ({route, navigation}) {

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
    function deleteWord () {
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
    const btnSaveName = "Save";
    const btnDeleteName = "Delete";
    return (
        <View style={styles.container}>
            <TextInput style={styles.cellWord}
                       multiline={true}
                       onChangeText={ (text) => setWord(text)}
                       value={S_Word}
                       placeholder="Word"
                       placeholderTextColor={'#3FD1C2B2'}
            />
            <TextInput style={styles.cellWord}
                       multiline={true}
                       onChangeText={ (text) => setTranslation(text)}
                       value={S_Translation}
                       placeholder= "Translation"
                       placeholderTextColor={'#3FD1C2B2'}
            />
            <TouchableOpacity style={styles.button}
                              onPress={handleSubmit} >
                <Text style={styles.buttonTitle}>{btnSaveName}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}
                              onPress={deleteWord}
                              color={'#460707'}>
                <Text style={styles.buttonDelete}>{btnDeleteName}</Text>
            </TouchableOpacity>
        </View>
    );

   //};
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2A2727',
        color: '#3FD1C2B2',
    },

    cell: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 50,
    },
    cellWord: {
        alignItems: 'center',
        fontSize: 36,
        color: '#3FD1C2B2',
        margin: 20,
    },
    cellValue: {
        fontSize: 16,
        color: 'rgba(63,209,194,0.7)',
    },
    button: {
        marginTop: 20,
    },
    buttonTitle: {
        justifyContent: 'center',
        paddingHorizontal: 150,
        paddingVertical: 7,
        color: 'white',
        fontSize: 20,
        backgroundColor: '#32b4a4',
        borderRadius: 8,
    },
    buttonDelete: {
        justifyContent: 'center',
        paddingHorizontal: 150,
        paddingVertical: 7,
        color: 'white',
        fontSize: 20,
        backgroundColor: '#2f0404',
        borderRadius: 8,
    }
});