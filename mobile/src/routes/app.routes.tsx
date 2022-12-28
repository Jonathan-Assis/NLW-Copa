import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as Pages from '../pages'

const { Navigator, Screen } = createBottomTabNavigator();

export function AppRoutes() {
    return (
        <Navigator>
            <Screen name="NewPoll" component={Pages.NewPoll} />
            <Screen name="Polls" component={Pages.Polls} />
        </Navigator>
    )
}