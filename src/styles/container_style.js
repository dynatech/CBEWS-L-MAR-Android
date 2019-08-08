import { StyleSheet } from 'react-native'
import { Dimensions } from 'react-native';

let { width } = Dimensions.get('window');
let { height } = Dimensions.get('window');

const ContainerStyle = StyleSheet.create({
     fluid: {

     },
     solid: {

     },
     content: {
          flex: 1,
          alignContent: 'center',
          margin: '5%'
     },
     login_content: {
          flex: 1,
     },
     dashboard_content: {
          flex: 2.5
     },
     dashboard_menu: {
          flex: 1,
     },
     datatable_content: {
          flex: 0.5
     },
     input_label_combo: {
          // flexDirection: 'row'
          padding: 10
     },
     menu_row: {
          flexDirection: 'row',
          alignContent: 'center',
          justifyContent: 'space-around',
          marginBottom: height * 0.03,
     },
     seals: {
          flexDirection: 'row',
          flex: 0.5,
          alignItems: 'center',
          alignContent: 'center'
     },
     weather_container: {
          alignItems: 'center',
          paddingBottom: height * 0.03
     },
     menu_container: {
          textAlign: 'center',
     }
})

export { ContainerStyle }