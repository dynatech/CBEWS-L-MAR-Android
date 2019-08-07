import React from 'react';
import { SafeAreaView, ScrollView } from 'react-native';
import { createAppContainer, createDrawerNavigator, DrawerItems } from 'react-navigation';
import DashboardNavigation from './DashboardNavigation'
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
    screen: DashboardNavigation,
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