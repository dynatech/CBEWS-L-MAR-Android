import React from 'react';
import { SafeAreaView, ScrollView, TouchableOpacity, Text, Alert } from 'react-native';
import { createAppContainer, createDrawerNavigator, DrawerItems } from 'react-navigation';
import DashboardNavigation from './DashboardNavigation'
import AboutUsScreen from '../components/layout/AboutUsScreen'
import ContactUsScreen from '../components/layout/ContactUsScreen'

const CustomDrawerComponent = (props) => (
  <SafeAreaView>
    <ScrollView>
      <DrawerItems {...props} />
      <TouchableOpacity onPress={() =>
        Alert.alert(
          'Log out',
          'Do you want to logout?',
          [
            { text: 'Cancel', onPress: () => { return null } },
            {
              text: 'Confirm', onPress: () => {
                props.navigation.navigate('Login')
              }
            },
          ],
          { cancelable: false }
        )
      }>
        <Text style={{ margin: 16, fontWeight: 'bold', color: 'white' }}>Logout</Text>
      </TouchableOpacity>
    </ScrollView>
  </SafeAreaView>
)

const AppDrawerNavigator = createDrawerNavigator({
  Dashboard: {
    screen: DashboardNavigation,
    navigationOptions: {
      drawerLabel: "Home",
      title: "Main Dashboard",
    }
  },
  AboutUs: {
    screen: AboutUsScreen,
      navigationOptions: {
        drawerLabel: "About Us",
        headerTitleStyle: {
          textAlign: 'center',
          flex: 1,
          color: '#fff'
        },
        headerStyle: {
          backgroundColor: '#083451'
        },
        headerLeft: null,
        title: 'About Us',
      }
  },
  ContactUs: {
    screen: ContactUsScreen,
      navigationOptions: {
        drawerLabel: "Contanct Us",
        headerTitleStyle: {
          textAlign: 'center',
          flex: 1,
          color: '#fff'
        },
        headerStyle: {
          backgroundColor: '#083451'
        },
        headerLeft: null,
        title: 'Contact Us',
      }
  }
}, {
    contentComponent: CustomDrawerComponent,
    drawerBackgroundColor: '#083451',
    contentOptions: {
      activeBackgroundColor: 'white',
      inactiveTintColor: 'white',
    }
  })

const Landing = createAppContainer(AppDrawerNavigator);
export default Landing;