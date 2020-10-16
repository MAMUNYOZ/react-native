import React, {useContext, useState} from 'react';
import {StyleSheet, Image, View, Text} from 'react-native';
import {DrawerContentScrollView} from '@react-navigation/drawer';
import {Drawer} from 'react-native-paper';

import globalStyles from '../styles/global';

// Para mostrar la opción de resumen del pedido en el menú de navegación
import OrderContext from '../context/orders/ordersContext';

// Para saber si hay un usuario logado
import ServerContext from '../context/server/serverContext';

export default function DrawerContent(props) {
  const {order} = useContext(OrderContext);
  const {user} = useContext(ServerContext);
  const {navigation} = props;
  const [active, setActive] = useState('home');

  const onChangeScreen = (screen) => {
    setActive(screen);
    navigation.navigate(screen);
  };
  return (
    <>
      <DrawerContentScrollView>
        <Drawer.Section style={globalStyles.section}>
          <Image
            style={globalStyles.logo}
            source={require('../assets/imgs/logo.png')}
          />
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
        {user.length === 0 ? (
          <Drawer.Section style={globalStyles.section}>
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
        ) : (
          <Drawer.Section style={globalStyles.section}>
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
        )}
        <View style={styles.footer}>
          <Text style={styles.footerText}>Bienvenido a Wine tu tienda de vinos de confianza</Text>

          <Text style={styles.footerText}>C/ Piquer, 6. 08004 Barcelona Tel. +34 93 244 14 33</Text>
</View>

      </DrawerContentScrollView>
    </>
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
  footer: {
    backgroundColor:'#FFF',
    marginTop: 80,
    flex: 1
  },
  footerText: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    textAlign:'center'
  }
});
