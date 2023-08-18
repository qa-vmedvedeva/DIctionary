import React, {Component} from 'react';
import {
    FlatList, View, StyleSheet, Pressable, Image, Text, Platform,
    ScrollView,
    TextInput,
    TouchableOpacity,SafeAreaView, Alert,
} from 'react-native';
import {PersonListItem} from '../components/PersonListItem';
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { NavigationContainer, useIsFocused } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {AddWordScreen} from './AddWordScreen'
import { useState, useEffect } from "react";
import Constants from "expo-constants";
import * as SQLite from "expo-sqlite";
import {db} from "../services/db-service"
import {fetchItems, setupDatabase} from "../services/db-service";
import MyComponent from "../components/MyComponent"


export function PersonListScreen ({ navigation }) {

    const [items, setItems] = useState([]);
    const [empty, setEmpty] = useState([]);

    const isFocused = useIsFocused();
    useEffect(() => {
        db.transaction((tx) => {
            tx.executeSql(
                "select id, word, translation from Dictionary where id > 0 order by word asc;",
                [],
                (tx, results) => {
                    let temp = [];
                    for (let i = 0; i < results.rows.length; ++i)
                        temp.push(results.rows.item(i));
                    setItems(temp);
                    console.log(JSON.stringify(temp));
                    if (results.rows.length >= 1) {
                        setEmpty(false);
                    } else {
                        setEmpty(true)
                    }

                }
            );

        });
    }, [isFocused]);
    state = {
        list: [],
        isLoading: false,
    };

    componentDidMount = () => {
        setupDatabase();
        //this.onRefresh();

    };


    onRefresh = () => {
       // this.getMoreData(true);
    };

    onScrollToEnd = ({distanceFromEnd}) => {
       // this.getMoreData(false);
    };

    onItemPress = (item) => {
        navigation.navigate('Edit word', {word: item});
    };

    //keyExtractor = (person) => person.login.uuid;
    keyExtractor = (word) => word.id;

    renderItem = ({item}) => {
        return (
            <PersonListItem
                word={item}
              //  onPress={this.onItemPress.bind(this, item)}
            />
        );
    };

    const emptyMSG = (status) => {
        return (
            <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>

                <Text style={{ fontSize: 25, textAlign: 'center', color: '#3FD1C2B2' }}>
                    No words added to dictionary...
                </Text>
            </View>
        );
    }
    const navigateToEditScreen = (id, word, translation) => {

        navigation.navigate('Edit word', {
            id: id,
            word: word,
            translation: translation
        });
    }
    setupDatabase();
    //render = () => {
        return (
            <View>
            <View style={styles.container}>

                <FontAwesome.Button
                    style={styles.button}
                    name="plus-circle"
                    color='#3FD1C2B2'
                    size={40}
                    onPress={() => {
                        navigation.navigate('Add new word');
                    }}>
                </FontAwesome.Button>
                    <View >
                        <View style={styles.container}>
                            <View style={styles.cell} ><Text style={styles. headerWord}> Word </Text></View>
                            <View style={styles.cell}><Text style={styles.headerTranslation}>Translation </Text></View>
                        </View>
                            <FlatList
                                data={items}
                                keyExtractor={(item, index) => index.toString()}
                                renderItem={({ item }) =>
                                    <View key={item.id} >
                                        <TouchableOpacity style={styles.container}
                                        onPress={() => navigateToEditScreen(item.id, item.word, item.translation)}>
                                            <View style={styles.cell} ><Text style={styles.word}>  {item.word} </Text></View>
                                            <View style={styles.cell}><Text style={styles.translation}> {item.translation} </Text></View>
                                        </TouchableOpacity>
                                    </View>
                                }
                            />
                    </View>
                {/* <FlatList
                    style={styles.list}
                    data={list}
                    renderItem={this.renderItem}
                    keyExtractor={this.keyExtractor}
                    refreshing={isLoading}
                    onRefresh={this.onRefresh}
                    onEndReached={this.onScrollToEnd}
                    onEndReachedThreshold={0.2}
                /> */}
            </View>
                {/*} <MyComponent > </MyComponent>*/}
            </View>
        );
   // };
}


const styles = StyleSheet.create({
    container: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        flexWrap: 'wrap',
        padding: 12,
        color: '#3FD1C2B2',
        borderColor: '#3FD1C2',
        borderBottomWidth: 0.4,
        backgroundColor: '#2A2727',
    },
    cell: {
        width: '50%',
    },
    add: {
        color: '#3FD1C2B2',
    },
    button: {
        paddingLeft: 15,
        backgroundColor: '#2A2727FF',
        marginRight: 0,
    },
    word: {
        fontSize: 16,
        color: 'rgba(63,209,194,0.7)',
    },
    translation: {
        textAlign: "left",
        marginRight: 0,
        fontSize: 14,
        color: '#e3e2e2',
    },
    headerWord: {
        fontWeight: 'bold',
        fontSize: 16,
        color: 'rgba(63,209,194,0.7)',
    },
    headerTranslation: {
        fontWeight: 'bold',
        textAlign: "left",
        marginRight: 0,
        fontSize: 16,
        color: '#e3e2e2',
    },

});