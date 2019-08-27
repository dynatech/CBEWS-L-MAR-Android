import { createStackNavigator, createAppContainer } from "react-navigation";
import CommunityRiskAssessment from './menu_navigation/community_risk_assessment/CommunityRiskAssessmentLanding';
import AlertGeneration from './menu_navigation/alert_generation/AlertGenerationLanding';
import DataAnalysis from './menu_navigation/data_analysis/DataAnalysisLanding';
import GroundData from './menu_navigation/ground_data/GroundDataLanding';
import SensorData from './menu_navigation/sensor_data/SensorDataLanding';
import Maintenance from './menu_navigation/maintenance/MaintenanceLanding';
import Events from './menu_navigation/events/EventsLanding';
import DataSyncScreen from '../components/layout/menu/data_sync/DataSyncScreen'; 
import DashboardScreen from '../components/layout/DashboardScreen';

const DashboardNavigation = createStackNavigator({
    Dashboard: {
        screen: DashboardScreen,
        navigationOptions: {
            header: null
        }
    },
    CommunityRiskAssessment: {
        screen: CommunityRiskAssessment,
        navigationOptions: {
            header: null
        }
    },
    AlertGeneration: {
        screen: AlertGeneration,
        navigationOptions: {
            header: null
        }
    },
    DataAnalysis: {
        screen: DataAnalysis,
        navigationOptions: {
            header: null
        }
    },
    GroundData: {
        screen: GroundData,
        navigationOptions: {
            header: null
        }
    },
    SensorData: {
        screen: SensorData,
        navigationOptions: {
            header: null
        }
    },
    Maintenance: {
        screen: Maintenance,
        navigationOptions: {
            header: null
        }
    },
    Events: {
        screen: Events,
        navigationOptions: {
            header: null
        }
    },
    DataSync: {
        screen: DataSyncScreen,
        navigationOptions: {
            headerTitleStyle: {
                textAlign: 'center',
                flex: 1,
                color: '#fff'
            },
            headerStyle: {
                backgroundColor: '#083451'
            },
            headerLeft: null,
            title:'Data Synchronization',
        }
    }
});
export default createAppContainer(DashboardNavigation);
