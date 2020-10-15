import 'react-native-gesture-handler';
import React from 'react';
import {Root} from 'native-base';

import {NavigationContainer} from '@react-navigation/native';
import Navigation from "./navigation/Navigation";
import {createStackNavigator} from '@react-navigation/stack';

// importar state de context
import ServerState from './context/server/serverState';
import OrdersState from './context/orders/ordersState';
import FavoritesState from './context/favorites/favoritesState';

const Stack = createStackNavigator();
const App = () => {
  return (
    <>
    <Root>
      <ServerState>
        <OrdersState>
          <FavoritesState>
          <NavigationContainer>
            <Navigation />
          </NavigationContainer>
          </FavoritesState>
        </OrdersState>
      </ServerState>
      </Root>
    </>
  );
};

export default App;
