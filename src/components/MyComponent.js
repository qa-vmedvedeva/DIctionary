import React, {Component, useEffect, useState} from 'react'
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native'
import { fetchItems } from '../services/db-service'

{/*function onItemPress (item)  {
    this.props.navigation.navigate('Edit word', {word: item});
} */}
const MyComponent  = () => {
    const [items, setItems] = useState([])

    useEffect(() => {
        fetchItems((data) => setItems(data))
    }, [])
    //const {onPress, word} = this.props;
   // onItemPress.bind(this, item){/*} onPress={ this.props.navigation.navigate('Add new word')}*/}
    const onLoad = () => {}
    return (

            <View style={styles.container}>
                {items.map(item => (

                    <Text style={styles.container} key={item.id} >
                        <Text style={styles.word}>{item.word} </Text>       <Text style={styles.translation}>{item.translation}</Text>
                    </Text>
                ))}
            </View>
    )
}

export default MyComponent;

const styles = StyleSheet.create({
    container: {
        padding: 12,
        color: '#3FD1C2B2',
        borderBottomColor: '#3FD1C2',
        borderBottomWidth: 0.4,
        backgroundColor: '#2A2727',
    },
    word: {
        fontSize: 16,
        color: 'rgba(63,209,194,0.7)',
    },
    translation: {
        textAlign: "right",
        marginRight: 0,
        marginTop: 10,
        fontSize: 14,
        color: '#e3e2e2',
    },
})