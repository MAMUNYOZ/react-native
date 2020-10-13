import React, {useContext, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {DrawerContentScrollView} from '@react-navigation/drawer';
import {Drawer, Switch, TouchableRipple, Text} from 'react-native-paper';

// Para mostrar la opción de resumen del pedido en el menú de navegación
import OrderContext from '../context/orders/ordersContext';

export default function DrawerContent(props) {
  const {order} = useContext(OrderContext);
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
