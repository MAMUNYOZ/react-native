import React, {useContext, Fragment} from 'react';
import {ListItem, Text, Thumbnail, Body} from 'native-base';
import {BASE_PATH_IMG} from '../config/constants';

import { useNavigation } from '@react-navigation/native';

import OrderContext from '../context/orders/ordersContext';

export const Product = (product) => {
  // Context del Pedido
  const {selectionProduct} = useContext(OrderContext);

  // Hook para redireccionar
  const navigation = useNavigation();

  const {name, description, price, id} = product;
  const image = `${BASE_PATH_IMG}${id}.jpg`;

  return (
    <Fragment key={id}>
      <ListItem
        key={id}
        onPress={() => {
          selectionProduct(product);
          navigation.navigate("detailProduct");
        }}>
        <Thumbnail large square source={{uri: image}} />
        <Body>
          <Text>{name}</Text>
          <Text note numberOfLines={2}>
            {description}
          </Text>
          <Text>Precio: {price} €</Text>
        </Body>
      </ListItem>
    </Fragment>
  );
};
