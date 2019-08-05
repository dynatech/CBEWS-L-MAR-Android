import React from 'react';
import { SafeAreaView, ScrollView } from 'react-native';
import { createAppContainer, createDrawerNavigator, DrawerItems } from 'react-navigation';
import DashboardScreen from '../components/layout/DashboardScreen'
import SettingsScreen from '../components/layout/SettingsScreen'

const CustomDrawerComponent = (props) => (
  <SafeAreaView>
    <ScrollView>
      <DrawerItems {...props} />
    </ScrollView>
  </SafeAreaView>
)

const AppDrawerNavigator = createDrawerNavigator({
  Dashboard: {
    screen: DashboardScreen,
    navigationOptions: {
      drawerLabel: "Home",
      title: "Main Dashboard"
    }
  },
  Settings: {
    screen: SettingsScreen,
    navigationOptions: {
      drawerLabel: "Settings"
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