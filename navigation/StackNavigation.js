import React, {useContext} from 'react';

import {Icon, Text} from 'native-base';
import {View, TouchableWithoutFeedback} from 'react-native';

// Para saber si hay un usuario logado
import ServerContext from '../context/server/serverContext';

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
import DataUser from '../views/DataUser';
import OrdersPlaced from '../views/OrdersPlaced';
import Logout from '../views/Logout';

const Stack = createStackNavigator();

export default function StackNavigation(props) {
  const {user} = useContext(ServerContext);
  const {navigation} = props;
  const buttonLeft = (screen) => {
    switch (screen) {
      case 'search':
      case 'detailProduct':
      case 'formOrder':
      case 'login':
      case 'register':
        return <Icon name="arrow-back" onPress={() => navigation.goBack()} />;
      default:
        return <Icon name="menu" onPress={() => navigation.openDrawer()} />;
    }
  };

  const buttonRight = () => {
    return (
      <View style={{flexDirection: 'row'}}>
        <Icon
          name="search"
          onPress={() => navigation.navigate('search')}
          style={{marginRight: 15}}
        />
        {user.length !== 0 ? (
          <TouchableWithoutFeedback onPress={() => navigation.openDrawer()}>
            <View style={{flexDirection: 'row'}}>
              <Icon name="ios-person-circle" />
              <Text>{user[0].name} </Text>
            </View>
          </TouchableWithoutFeedback>
        ) : null}
      </View>
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
          title: 'Detalle del producto',
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
          headerRight: () => buttonRight(),
        }}
      />
      <Stack.Screen
        name="orderProgress"
        component={OrderProgress}
        options={{
          title: 'Realizar Compra',
          headerLeft: () => buttonLeft('orderProgress'),
          headerRight: () => buttonRight(),
        }}
      />
      <Stack.Screen
        name="login"
        component={Login}
        options={{
          title: 'Login',
          headerLeft: () => buttonLeft('login'),
          headerRight: () => buttonRight(),
        }}
      />
      <Stack.Screen
        name="register"
        component={Register}
        options={{
          title: 'Registro',
          headerLeft: () => buttonLeft('register'),
          headerRight: () => buttonRight(),
        }}
      />
      <Stack.Screen
        name="dataUser"
        component={DataUser}
        options={{
          title: 'Dato del usuario',
          headerLeft: () => buttonLeft('dataUser'),
          headerRight: () => buttonRight(),
        }}
      />
      <Stack.Screen
        name="ordersPlaced"
        component={OrdersPlaced}
        options={{
          title: 'Pedidos realizados',
          headerLeft: () => buttonLeft('ordersPlaced'),
          headerRight: () => buttonRight(),
        }}
      />
      <Stack.Screen
        name="logout"
        component={Logout}
        options={{
          title: 'Logout',
          headerLeft: () => buttonLeft('logout'),
          headerRight: () => buttonRight(),
        }}
      />
    </Stack.Navigator>
  );
}
