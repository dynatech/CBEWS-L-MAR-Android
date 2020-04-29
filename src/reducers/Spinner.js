import React from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';

const styles = StyleSheet.create({
    spinnerTextStyle: {
      color: '#FFF'
    },
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F5FCFF'
    },
    welcome: {
      fontSize: 20,
      textAlign: 'center',
      margin: 10
    },
    instructions: {
      textAlign: 'center',
      color: '#333333',
      marginBottom: 5
    }
});


function SpinnerLoader(props) {
    let { display } = props
    return (
        display == true ?
        <View style={styles.container}>
            <Spinner
            visible={display}
            textContent={'Loading...'}
            textStyle={styles.spinnerTextStyle}
            />
        </View>
        :
        <View>
        </View>
    )
}
export default SpinnerLoader;