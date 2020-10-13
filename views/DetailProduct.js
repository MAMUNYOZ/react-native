import React, {useContext} from 'react';
import {Image} from 'react-native';
import {
  Container,
  Content,
  Footer,
  FooterTab,
  Button,
  Bady,
  Text,
  H1,
  Body,
  Card,
  CardItem,
} from 'native-base';
import { useNavigation } from '@react-navigation/native';
import globalStyles from '../styles/global';

import {BASE_PATH_IMG} from '../config/constants';

import OrderContext from '../context/orders/ordersContext';

const DetailProduct = () => {
  // Pedido context
  const {product} = useContext(OrderContext);
  const {name, subdescription, description, price, id} = product;

  const image = `${BASE_PATH_IMG}${id}.jpg`;

  // Redireccionar
  const navigation = useNavigation();

  return (
    <Container style={globalStyles.container}>
      <Content style={globalStyles.content}>
        <H1 style={globalStyles.title}>{name}</H1>
        <Card>
          <CardItem>
            <Body>
              <Image style={globalStyles.image} source={{uri: image}} />
              <Text note style={{ marginTop: 20}}> {subdescription} </Text>
              <Text style={{ marginTop: 10}}> {description} </Text>
              <Text style={globalStyles.price}>Precio: {price} €</Text>
            </Body>
          </CardItem>
        </Card>
      </Content>
      <Footer>
          <FooterTab>
              <Button style={globalStyles.button} onPress={() => navigation.navigate("formOrder")}>
                  <Text style={globalStyles.buttonText}>Comprar Producto</Text>
              </Button>
          </FooterTab>
      </Footer>
    </Container>
  );
};

export default DetailProduct;
