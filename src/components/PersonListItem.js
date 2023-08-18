import React, {Component} from 'react';
import {StyleSheet, TouchableOpacity, Image, Text, View} from 'react-native';

export class PersonListItem extends Component {


    render = () => {
       // const {onPress, person} = this.props;
        const {onPress, word} = this.props;
        return (
            <TouchableOpacity style={styles.container}>
                {/*<Image onPress={onPress}
                    source={{uri: person.picture.medium}}
                    resizeMode={'contain'}
                    style={styles.avatar}
                /> */}
                <View style={styles.col}>
                    <Text style={styles.name}>
                        {/*} {person.name.first} {person.name.last} */}
                        {word.word}
                    </Text>
                    {/*  <Text style={styles.email}>{person.email}</Text> */}
                    <Text style={styles.email}>{word.translation}</Text>
                </View>
            </TouchableOpacity>
        );
    };
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
        borderBottomColor: '#3FD1C2',
        borderBottomWidth: 0.4,
        backgroundColor: '#2A2727',
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    col: {
        marginLeft: 10,
    },
    name: {
        fontSize: 16,
        color: 'rgba(63,209,194,0.7)',
    },
    email: {
        marginTop: 10,
        fontSize: 13,
        color: '#e3e2e2',
    },
});