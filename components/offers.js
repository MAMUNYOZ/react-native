import React, {useContext} from 'react';
import {BASE_PATH_IMG} from '../config/constants';
import {Image, StyleSheet, View, Text} from 'react-native';

import {useNavigation} from '@react-navigation/native';

import OrderContext from '../context/orders/ordersContext';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';

export const Offers = (product) => {
  // Context del Pedido
  const {selectionProduct} = useContext(OrderContext);

  // Hook para redireccionar
  const navigation = useNavigation();

  const {name, description, price, id} = product;
  const image = `${BASE_PATH_IMG}${id}.jpg`;

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        selectionProduct(product);
        navigation.navigate('detailProduct');
      }}>
      <View style={styles.container}>
        <Image source={{uri: image}} style={styles.banner} />
        <Text numberOfLines={2} style={styles.text}>
          {name}
        </Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
  },
  banner: {
    height: 270,
    width: 250,
    marginRight: 10,
  },
  text: {
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
