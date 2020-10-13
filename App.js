import 'react-native-gesture-handler';
import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import Navigation from "./navigation/Navigation";
import {createStackNavigator} from '@react-navigation/stack';

// importar state de context
import ServerState from './context/server/serverState';
import OrdersState from './context/orders/ordersState';

const Stack = createStackNavigator();

const App = () => {
  return (
    <>
      <ServerState>
        <OrdersState>
          <NavigationContainer>
            <Navigation />
          </NavigationContainer>
        </OrdersState>
      </ServerState>
    </>
  );
};

export default App;
