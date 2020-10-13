import React, {useContext} from 'react';

import {IconButton} from 'react-native-paper';

import {createStackNavigator} from '@react-navigation/stack';
import Home from '../views/Home';
import Products from '../views/Products';
import Favorites from '../views/Favorites';
import DetailProduct from '../views/DetailProduct';
import Search from '../views/Search';
import FormOrder from '../views/FormOrder';
import OrderSumary from '../views/OrderSumary';
import OrderProgress from '../views/OrderProgress';

import Login from '../views/Login';
import Register from '../views/Register';

const Stack = createStackNavigator();

export default function StackNavigation(props) {
  const {navigation} = props;
  const buttonLeft = (screen) => {
    switch (screen) {
      case 'search':
      case 'detailProduct':
      case 'formOrder':
      case 'login':
      case 'register':
        return (
          <IconButton icon="arrow-left" onPress={() => navigation.goBack()} />
        );
      default:
        return (
          <IconButton icon="menu" onPress={() => navigation.openDrawer()} />
        );
    }
  };

  const buttonRight = () => {
    return (
      <IconButton
        icon="magnify"
        onPress={() => navigation.navigate('search')}
      />
    );
  };
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#956769',
        },
      }}>
      <Stack.Screen
        name="home"
        component={Home}
        options={{
          title: 'WineApp',
          headerLeft: () => buttonLeft('home'),
          headerRight: () => buttonRight(),
        }}
      />
      <Stack.Screen
        name="detailProduct"
        component={DetailProduct}
        options={{
          title: '',
          headerLeft: () => buttonLeft('detailProduct'),
          headerRight: () => buttonRight(),
        }}
      />
      <Stack.Screen
        name="formOrder"
        component={FormOrder}
        options={{
          title: '',
          headerLeft: () => buttonLeft('formOrder'),
          headerRight: () => buttonRight(),
        }}
      />
      <Stack.Screen
        name="products"
        component={Products}
        options={{
          title: 'Nuestros productos',
          headerLeft: () => buttonLeft('products'),
          headerRight: () => buttonRight(),
        }}
      />
      <Stack.Screen
        name="orderSumary"
        component={OrderSumary}
        options={{
          title: 'Resumen del pedido',
          headerLeft: () => buttonLeft('orderSumary'),
          headerRight: () => buttonRight(),
        }}
      />
      <Stack.Screen
        name="favorites"
        component={Favorites}
        options={{
          title: 'Favoritos',
          headerLeft: () => buttonLeft('favorites'),
          headerRight: () => buttonRight(),
        }}
      />
      <Stack.Screen
        name="search"
        component={Search}
        options={{
          title: 'Buscador de productos',
          headerLeft: () => buttonLeft('search'),
        }}
      />
      <Stack.Screen
        name="orderProgress"
        component={OrderProgress}
        options={{
          title: 'Realizar Compra',
          headerLeft: () => buttonLeft('orderProgress'),
        }}
      />
      <Stack.Screen
        name="login"
        component={Login}
        options={{
          title: 'Login',
          headerLeft: () => buttonLeft('login'),
        }}
      />
      <Stack.Screen
        name="register"
        component={Register}
        options={{
          title: 'Registro',
          headerLeft: () => buttonLeft('register'),
        }}
      />
    </Stack.Navigator>
  );
}
