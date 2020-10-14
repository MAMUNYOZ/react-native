import React, {useContext, useState} from 'react';
import {StyleSheet} from 'react-native';
import {DrawerContentScrollView} from '@react-navigation/drawer';
import {Drawer} from 'react-native-paper';

// Para mostrar la opción de resumen del pedido en el menú de navegación
import OrderContext from '../context/orders/ordersContext';

// Para saber si hay un usuario logado
import ServerContext from '../context/server/serverContext';

export default function DrawerContent(props) {
  const {order} = useContext(OrderContext);
  const { user } = useContext(ServerContext);
  const {navigation} = props;
  const [active, setActive] = useState('home');

  const onChangeScreen = (screen) => {
    setActive(screen);
    navigation.navigate(screen);
  };
  return (
    <DrawerContentScrollView>
      <Drawer.Section>
        <Drawer.Item
          label="Inicio"
          active={active === 'home'}
          onPress={() => onChangeScreen('home')}
        />
        <Drawer.Item
          label="Nuestros Productos"
          active={active === 'products'}
          onPress={() => onChangeScreen('products')}
        />
        <Drawer.Item
          label="Favoritos"
          active={active === 'favorites'}
          onPress={() => onChangeScreen('favorites')}
        />
        {order.length > 0 ? (
          <Drawer.Item
            label="Resumen del pedido"
            active={active === 'orderSumary'}
            onPress={() => onChangeScreen('orderSumary')}
          />
        ) : null}
      </Drawer.Section>
      { user.length === 0 ? (
        <Drawer.Section>
        <Drawer.Item
          label="Login"
          active={active === 'login'}
          onPress={() => onChangeScreen('login')}
        />
        <Drawer.Item
          label="Registro"
          active={active === 'register'}
          onPress={() => onChangeScreen('register')}
        />
      </Drawer.Section>
      ): (
        <Drawer.Section>
        <Drawer.Item
          label="Datos del Usuario"
          active={active === 'dataUser'}
          onPress={() => onChangeScreen('dataUser')}
        />
        <Drawer.Item
          label="Pedidos Realizados"
          active={active === 'ordersPalced'}
          onPress={() => onChangeScreen('ordersPlaced')}
        />
        <Drawer.Item
          label="Logout"
          active={active === 'logout'}
          onPress={() => onChangeScreen('logout')}
        />
      </Drawer.Section> 
      ) }
      
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});
