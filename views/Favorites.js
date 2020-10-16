import React, {useContext, useEffect} from 'react';
import {Alert} from 'react-native';
import {BASE_PATH_IMG} from '../config/constants';

import {
  Container,
  Content,
  Thumbnail,
  List,
  Icon,
  ListItem,
  Body,
  Button,
  Text,
  Left,
  H1,
} from 'native-base';
import { useNavigation } from '@react-navigation/native';

import globalStyles from '../styles/global';

import FavoritesContext from '../context/favorites/favoritesContext';
import OrderContext from '../context/orders/ordersContext';

const Favorites = () => {
  // Context de favoritos
  const {favorites, removeFavorites} = useContext(FavoritesContext);

    // Context del producto
    const {selectionProduct} = useContext(OrderContext);

    // Hook para redireccionar
    const navigation = useNavigation();

  // Eliminar un producto del pedido

  const confirmRemove = (id) => {
    Alert.alert(
      '¿Deseas eliminar el artículo?',
      'Puedes añadirlo de nuevo pulsando sobre el artículo',
      [
        {
          text: 'Confirmar',
          onPress: () => {
            removeFavorites(id);
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
        <H1 style={globalStyles.title}><Icon name="md-star-outline"/> Favoritos</H1>
        {favorites.length === 0 ? (
          <Text style={globalStyles.price}>
            No has añadido ningún producto a favoritos
          </Text>
        ) : (
          <>
            {favorites.map((product, i) => {
              const {name, price, id} = product;
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
                      <Text
                        onPress={() => {
                          selectionProduct(product);
                          navigation.navigate("detailProduct");
                        }}>
                        {name}
                      </Text>
                      <Text>Precio: {price} €</Text>
                      <Button
                        full
                        danger
                        style={{marginTop: 20}}
                        onPress={() => confirmRemove(id)}>
                        <Text
                          style={[globalStyles.buttonText, {color: '#FFF'}]}>
                          Eliminar
                        </Text>
                      </Button>
                    </Body>
                  </ListItem>
                </List>
              );
            })}
          </>
        )}
      </Content>
    </Container>
  );
};

export default Favorites;
