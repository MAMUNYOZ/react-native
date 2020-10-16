import React, {useState, useContext, useEffect} from 'react';

import {
  Container,
  Content,
  Form,
  Icon,
  Input,
  Grid,
  Col,
  Button,
  Text,
  Footer,
  FooterTab,
} from 'native-base';

import {Alert} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import globalStyles from '../styles/global';

import OrderContext from '../context/orders/ordersContext';

const FormOrder = () => {
  // State para las cantidades
  const [amount, saveAmount] = useState(1);
  const [total, saveTotal] = useState(0);

  // context
  const {product, saveOrder} = useContext(OrderContext);
  const {price} = product;

  // Redireccionar
  const navigation = useNavigation();

  // En cuanto el componente carga, calcula la cantidad a pagar
  useEffect(() => {
    calcTotal();
  }, [amount]);

  //Calcula el total del producto por su cantidad
  const calcTotal = () => {
    const totalPay = parseFloat(price.replace(',', '.') * amount).toFixed(2);
    saveTotal(totalPay);
  };

  //Decrementar en uno la cantidad
  const decreaseOne = () => {
    if (amount > 1) {
      const newAmount = parseInt(amount) - 1;
      saveAmount(newAmount);
    }
  };

  //Incrementar en uno la cantidad
  const increaseOne = () => {
    const newAmount = parseInt(amount) + 1;
    saveAmount(newAmount);
  };

  // Confirmar si el pedido es correcto
  const confirmOrder = () => {
    Alert.alert(
      '¿Deseas confirmar tu pedido?',
      'Un pedido confirmado ya no se podrá modificar',
      [
        {
          text: 'Confirmar',
          onPress: () => {
            // Añadir el pedido al pedido principal
            const order = {
              ...product,
              amount,
              total,
            };

            saveOrder(order);

            // Navegar hacia el resumen
            navigation.navigate("orderSumary");
          },
        },
        {
          text: 'Cancelar',
          style: 'calcel',
        },
      ],
    );
  };

  return (
    <Container>
      <Content>
        <Form>
          <Text style={globalStyles.title}><Icon name="md-albums-outline"/> Cantidad</Text>
          <Grid>
            <Col>
              <Button
                props
                dark
                style={{height: 80, justifyContent: 'center'}}
                onPress={() => decreaseOne()}>
                <Icon style={{fontSize: 40}} name="remove" />
              </Button>
            </Col>
            <Col>
              <Input
                style={{textAlign: 'center', fontSize: 20}}
                value={amount.toString()}
                keyboardType="numeric"
                onChangeText={(amount) => saveAmount(amount)}
              />
            </Col>
            <Col>
              <Button
                props
                dark
                style={{height: 80, justifyContent: 'center'}}
                onPress={() => increaseOne()}>
                <Icon style={{fontSize: 40}} name="add" />
              </Button>
            </Col>
          </Grid>
          <Text style={globalStyles.price}> Subtotal: {total} €</Text>
        </Form>
      </Content>
      <Footer>
        <FooterTab>
          <Button style={globalStyles.button} onPress={() => confirmOrder()}>
            <Text style={globalStyles.buttonText}>Agregar al Pedido</Text>
          </Button>
        </FooterTab>
      </Footer>
    </Container>
  );
};

export default FormOrder;
