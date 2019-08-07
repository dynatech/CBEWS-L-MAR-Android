import { createStackNavigator, createAppContainer } from "react-navigation";
import CommunityRiskAssessment from "./menu_navigation/community_risk_assessment/CommunityRiskAssessmentLanding";
import AlertGeneration from './menu_navigation/alert_generation/AlertGenerationLanding';
import DataAnalysis from './menu_navigation/data_analysis/DataAnalysisLanding';
import DashboardScreen from "../components/layout/DashboardScreen";

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
    // GroundData: {
    //     screen: GroundData,
    //     navigationOptions: {
    //         header: null
    //     }
    // },
    // SensorData: {
    //     screen: SensorData,
    //     navigationOptions: {
    //         header: null
    //     }
    // },
    // Maintenance: {
    //     screen: Maintenance,
    //     navigationOptions: {
    //         header: null
    //     }
    // },
    // Events: {
    //     screen: Events,
    //     navigationOptions: {
    //         header: null
    //     }
    // },
    // DataSync: {
    //     screen: DataSync,
    //     navigationOptions: {
    //         header: null
    //     }
    // },
});
export default createAppContainer(DashboardNavigation);
