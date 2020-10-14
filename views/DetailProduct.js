import React, {useContext, useState} from 'react';
import {Image, TouchableWithoutFeedback, View} from 'react-native';
import {
  Container,
  Content,
  Footer,
  FooterTab,
  Button,
  Icon,
  Text,
  H1,
  Body,
  Card,
  CardItem,
  Toast
} from 'native-base';
import {useNavigation} from '@react-navigation/native';
import globalStyles from '../styles/global';
import {findIndex} from 'lodash';

import {BASE_PATH_IMG} from '../config/constants';

import OrderContext from '../context/orders/ordersContext';
import FavoritesContext from '../context/favorites/favoritesContext';


const DetailProduct = () => {
  // Pedido context
  const {order, product} = useContext(OrderContext);
  const {name, subdescription, description, price, id} = product;

  //Favorites context
  const {favorites, saveFavorites} = useContext(FavoritesContext);

  const image = `${BASE_PATH_IMG}${id}.jpg`;

  // Mostrar mensajes error
  const [message, saveMesage] = useState(null);

  // Redireccionar
  const navigation = useNavigation();

  // Almacenar en favoritos
  const saveFavorite = (favorites, product) => {
    if (findIndex(favorites, {'id': product.id}) < 0) {
      saveFavorites(product);
    }
  };

 // Comprobar si el pedido ya está en la cesta 
  const checkOrder = (order, product) =>{
    if (findIndex(order, {'id': product.id}) < 0) {
      navigation.navigate('formOrder');
    } else {
      saveMesage('El producto ya está en la lista de la compra');
    }
  };

  // Mostrar alertas
  const showAlert = () => {
    Toast.show({
      text: message,
      buttonText: 'OK',
      duration: 5000,
    });
  };

  return (
    <Container style={globalStyles.container}>
      <Content style={globalStyles.content}>
        <H1 style={globalStyles.title}>{name}</H1>
        <Card>
          <CardItem>
            <Body>
              <Image style={globalStyles.image} source={{uri: image}} />
              <Text note style={{marginTop: 20}}>
                {' '}
                {subdescription}{' '}
              </Text>
              <Text style={{marginTop: 10}}> {description} </Text>
              <Text style={globalStyles.price}>Precio: {price} €</Text>
              <TouchableWithoutFeedback>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginLeft: 'auto',
                  }}>
                  <Icon
                    name="heart"
                    style={{marginRight: 5}}
                    onPress={() => {
                      saveFavorite(favorites, product);
                    }}
                  />
                  <Text>Añadir a favoritos</Text>
                </View>
              </TouchableWithoutFeedback>
            </Body>
          </CardItem>
        </Card>
      </Content>
      <Footer>
        <FooterTab>
          <Button
            style={globalStyles.button}
            onPress={() => checkOrder(order, product)}>
            <Text style={globalStyles.buttonText}>Comprar Producto</Text>
          </Button>
          {message && showAlert()}
        </FooterTab>
      </Footer>
    </Container>
  );
};

export default DetailProduct;
