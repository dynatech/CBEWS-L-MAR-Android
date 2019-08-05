import { StyleSheet } from 'react-native'
import {Dimensions} from 'react-native';
  
let {width} = Dimensions.get('window');
let {height} = Dimensions.get('window');

const InputStyle = StyleSheet.create({
    large: {
        margin: 10,
        color: '#000'
    },
    medium: {
        marginLeft: 10,
        marginRight: 10,
        color: '#000'
    },
    small: {
        marginLeft: 10,
        marginRight: 10,
        color: '#000'
    },
    default: {
        borderBottomWidth: 3,
        borderBottomColor: '#083451',
        textAlign: 'center',
        color: '#fff',
        fontWeight: 'bold',
        borderRadius: 5,
        elevation: 3
    },
    disabled: {

    },
    success: {

    },
    error: {

    }
})

export { InputStyle }