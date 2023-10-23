import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../screens/home';
import Detail from '../screens/detail';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
const Stack = createStackNavigator();

export function HomeStack() {
  const nav = useNavigation();
  return (
    <Stack.Navigator screenOptions={{
      headerShown: false,
    }}>
      <Stack.Screen
        name="E-Market" component={Home}
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: 'rgba(24, 69, 214, 1)',
          },
          title: 'E-Market',
          headerTitleStyle: {
            color: 'white',
            fontSize: 29,
            fontWeight: '800',
          },
        }}

      />
      <Stack.Screen
        name="DetailScreen" component={Detail}
        options={({ route }) => ({
          headerShown: true,
          title: route.params.product.name,
          headerStyle: {
            backgroundColor: 'rgba(42, 89, 254, 1)',
          },
          headerLeft: (props) => (
            <TouchableOpacity onPress={() => {
              nav.navigate("E-Market")
            }}>
              <Icon name={'arrow-back-outline'} size={36} color={'#ffff'} />
            </TouchableOpacity>),
          headerTitleStyle: {
            color: 'white',
            fontSize: 29,
            fontWeight: '800',
          },
        })}
      />
    </Stack.Navigator>
  );
}