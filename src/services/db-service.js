import * as SQLite from "expo-sqlite";
import Constants from "expo-constants";
import { useState, useEffect } from "react";
import {Alert, Platform} from "react-native";

function openDatabase() {
    if (Platform.OS === "web") {
        return {
            transaction: () => {
                return {
                    executeSql: () => {},
                };
            },
        };
    }
    const db = SQLite.openDatabase("db.db");
    return db;
}
export const db = openDatabase();

const fetchItems = (callback) => {
    db.transaction(tx => {
        tx.executeSql(
            "select id, word, translation from Dictionary where id > 0 order by word asc;",
            [],
            (_, { rows: { _array } }) => callback(_array),
            (txObj, error) => {
                // Failed to establish a database connection
                Alert.alert('Error', `Could not fetch items: ${error.message}`);
            }
        )
    })
}
function editWord  (word, translation, old_word)  {
    // is text empty?
    if (word === null || word === "" || translation === null || translation === "" || old_word===null || old_word==="") {
        console.log("empty input");
        return false;
    }
    console.log("I'm going to edit a word!");
    db.transaction(
        (tx) => {
            tx.executeSql("update Dictionary set word ='" + word + "', translation= '" + translation + "' where" +
                "word='"+old_word+"';", () => {
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

export const setupDatabase = () => {
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

export { fetchItems }