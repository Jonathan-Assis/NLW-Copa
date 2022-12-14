import { Platform } from 'react-native';
import { useTheme } from 'native-base';
import { PlusCircle, SoccerBall } from 'phosphor-react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import * as Pages from '../pages';

const { Navigator, Screen } = createBottomTabNavigator();

export function AppRoutes() {
    const { colors, sizes } = useTheme()
    const size = sizes[6]

    return (
        <Navigator screenOptions={{
            headerShown: false,
            tabBarLabelPosition: 'beside-icon',
            tabBarActiveTintColor: colors.yellow[500],
            tabBarInactiveTintColor: colors.gray[300],
            tabBarStyle: {
                position: 'absolute',
                height: sizes[20],
                borderTopWidth: 0,
                backgroundColor: colors.gray[800]
            },
            tabBarItemStyle: {
                position: 'relative',
                top: Platform.OS === 'android' ? -5 : 0
            }
        }}>
            <Screen
                name="NewPoll"
                component={Pages.NewPoll}
                options={{
                    tabBarIcon: ({ color }) => <PlusCircle color={color} size={size} />,
                    tabBarLabel: 'Novo bolão'
                }}
            />
            <Screen
                name="Polls"
                component={Pages.Polls}
                options={{
                    tabBarIcon: ({ color }) => <SoccerBall color={color} size={size} />,
                    tabBarLabel: 'Meus bolões'
                }}
            />
            <Screen
                name="FindPoll"
                component={Pages.FindPoll}
                options={{ tabBarButton: () => null }}
            />
            <Screen
                name="Details"
                component={Pages.Details}
                options={{ tabBarButton: () => null }}
            />
        </Navigator>
    )
}