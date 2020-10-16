import React, {useContext, useEffect} from 'react';
import {Alert} from 'react-native';
import {BASE_PATH_IMG} from '../config/constants';

import {
  Container,
  Content,
  Thumbnail,
  List,
  ListItem,
  Body,
  Button,
  Text,
  Left,
  H1,
  Footer,
  FooterTab,
  Icon
} from 'native-base';

import {useNavigation} from '@react-navigation/native';
import globalStyles from '../styles/global';

import OrderContext from '../context/orders/ordersContext';
import ServerContext from '../context/server/serverContext';

const OrderSumary = () => {
  const navigation = useNavigation();

  // Context del pedido
  const {
    order,
    total,
    showSumary,
    removeProduct,
    makeOrder,
    finishOrder,
  } = useContext(OrderContext);

  const {user} = useContext(ServerContext);

  useEffect(() => {
    calcTotal();
  }, [order]);

  const calcTotal = () => {
    let newTotal = 0;
    newTotal = order.reduce(
      (newTotal, article) => newTotal + parseFloat(article.total),
      0,
    );
    showSumary(newTotal);
  };

  // redirecciona a Realizar Compra

  const makePurchase = async (id) => {
    Alert.alert(
      'Revisa tu pedido',
      'Una vez que realices tu pedido, no podrá cambiarlo',
      [
        {
          text: 'Confirmar',
          onPress: async () => {
            // crear un objeto con el pedido
            const orderObj = {
              user: id,
              order: order,
              total: total.toFixed(2)
            };

            // almacenar pedido en la base de datos
            try {
              const orderMaked = await makeOrder(orderObj);
              finishOrder(orderMaked.id);
              navigation.navigate('orderProgress');
            } catch (error) {
              console.log(error);
            }
          },
        },
        {
          text: 'Revisar',
          style: 'cancel',
        },
      ],
    );
  };

  // Eliminar un producto del pedido

  const confirmRemove = (id) => {
    Alert.alert(
      '¿Deseas eliminar el artículo?',
      'Una vez eliminado no se puede recuperar',
      [
        {
          text: 'Confirmar',
          onPress: () => {
            removeProduct(id);
          },
        },
        {
          text: 'Cancelar',
          style: 'cancel',
        },
      ],
    );
  };

  return (
    <Container style={globalStyles.container}>
      <Content style={globalStyles.content}>
        <H1 style={globalStyles.title}><Icon name="md-document-text-outline"/> Resumen del Pedido</H1>
        {order.map((product, i) => {
          const {amount, name, id, price} = product;
          return (
            <List key={id + i}>
              <ListItem thumbnail>
                <Left>
                  <Thumbnail
                    large
                    square
                    source={{uri: `${BASE_PATH_IMG}${id}.jpg`}}
                  />
                </Left>
                <Body>
                  <Text>{name}</Text>
                  <Text>Cantidad: {amount}</Text>
                  <Text>Precio: {price} €</Text>
                  <Button
                    full
                    danger
                    style={{marginTop: 20}}
                    onPress={() => confirmRemove(id)}>
                    <Text style={[globalStyles.buttonText, {color: '#FFF'}]}>
                      Eliminar
                    </Text>
                  </Button>
                </Body>
              </ListItem>
            </List>
          );
        })}
        <Text style={globalStyles.price}>
          Total a Pagar: {total.toFixed(2)} €
        </Text>
        <Button
          onPress={() => navigation.navigate('products')}
          style={{marginTop: 30}}
          full
          bordered
          danger>
          <Text>Seguir Pidiendo</Text>
        </Button>
      </Content>
      {user.length && user.length !== 0 ? (
        <Footer>
          <FooterTab>
            <Button
              onPress={() => makePurchase(user[0].id)}
              style={globalStyles.button}
              full>
              <Text style={globalStyles.buttonText}>Realizar Compra</Text>
            </Button>
          </FooterTab>
        </Footer>
      ) : null}
    </Container>
  );
};

export default OrderSumary;
