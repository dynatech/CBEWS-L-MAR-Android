import { Dimensions } from 'react-native';
import { createMaterialTopTabNavigator, createAppContainer } from 'react-navigation';
import TemplatesScreen from '../../../components/layout/menu/events/TemplatesScreen'
import TemplateSettingsScreen from '../../../components/layout/menu/events/TemplateSettingsScreen'

let {height} = Dimensions.get('window');

const Events = createMaterialTopTabNavigator({
    Templates: {
        screen: TemplatesScreen,
        navigationOptions: {
            tabBarLabel: 'Templates'
        },
    },
    TemplateSettings: {
        screen: TemplateSettingsScreen,
        navigationOptions: {
            tabBarLabel: 'Settings'
        },
    }
}, {
    tabBarOptions: {
        labelStyle: {
            fontSize: height * 0.019,
            alignContent: 'center'
        },
        style: {
            backgroundColor: '#083451',
            height: height* 0.07,
        },
        indicatorStyle: {
            backgroundColor: '#f27e10'
        }
    }
});

export default createAppContainer(Events);