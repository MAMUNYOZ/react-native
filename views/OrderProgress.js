import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Container, Text, Button, Content, H1, Icon} from 'native-base';
import globalStyles from '../styles/global';
import {useNavigation} from '@react-navigation/native';

const OrderProgress = () => {
  const navigation = useNavigation();

  return (
    <Container style={globalStyles.container}>
      <Content style={globalStyles.content}>
        <H1 style={globalStyles.title}>
          <Icon name="md-gift-outline" />
          Compra Realizada
        </H1>

        <View style={[globalStyles.content, {marginTop: 60}]}>
          <Text style={styles.textCenter}>Hemos recibido tu pedido...</Text>
          <Text style={styles.textCenter}>
            Lo revisaremos y te lo enviaremos lo antes posible
          </Text>
          <Text style={styles.textBold}>
            Gracias por utilizar nuestro servicio
          </Text>
          <Button
            full
            block
            style={globalStyles.button}
            onPress={() => navigation.navigate('home')}>
            <Text style={globalStyles.buttonText}>
              Realizar un nuevo pedido
            </Text>
          </Button>
        </View>
      </Content>
    </Container>
  );
};

const styles = StyleSheet.create({
  textCenter: {
    textAlign: 'center',
    paddingVertical: 5,
    fontSize: 18,
  },
  textBold: {
    fontWeight: 'bold',
    marginVertical: 50,
    textAlign: 'center',
    fontSize: 22,
  },
});

export default OrderProgress;
