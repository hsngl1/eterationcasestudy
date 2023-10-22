import React, { memo, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Cart from '../screens/cart';
import Favorite from '../screens/favorite';
import { HomeStack } from './homestack';
import { useDispatch, useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import { useAppSelector } from '../store/hooks';


const Tab = createBottomTabNavigator();

const HomeIcon = memo(({ color }: { color: string }) => <Icon name={'home'} size={34} color={color} />);
const ChartIcon = memo(({ color }: { color: string }) => <Icon name={'basket'} size={34} color={color} />);
const FavoriteIcon = memo(({ color }: { color: string }) => <Icon name={'star'} size={34} color={color} />);

export function Navigation() {
  const cartData = useSelector((state) => state.cart.totalCount);
  const [badge, setBadge] = React.useState(cartData)

  useEffect(() => { setBadge(cartData) }, [cartData]);
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name="Home" component={HomeStack}
          options={{
            headerShown: false,
            title: undefined,
            tabBarIcon: ({ focused, color }) => <HomeIcon color={color} />,
            unmountOnBlur: true,
          }}
        />
        <Tab.Screen
          name="Cart"
          component={Cart}
          options={{
            headerShown: true,
            headerStyle: {
              backgroundColor: 'rgba(42, 89, 254, 1)',
            },
            title: 'Cart',
            headerTitleStyle: {
              color: 'white',
              fontSize: 29,
              fontWeight: '800',
            },
            tabBarIcon: ({ color }) => <ChartIcon color={color} />,
            tabBarBadge: badge > 0 ? badge : '',
            tabBarBadgeStyle: {
              backgroundColor: badge === 0 ? 'white' : 'rgba(42, 89, 254, 1)',
              zIndex: badge === 0 ? -99 : 99,
              overflow: badge === 0 ? 'hidden' : undefined,
            },
            unmountOnBlur: true,
          }}
        />
        <Tab.Screen
          name="Favorite" component={Favorite}
          options={{
            title: "Favorite",
            tabBarIcon: ({ focused, color }) => <FavoriteIcon color={color} />,
            unmountOnBlur: true,
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}