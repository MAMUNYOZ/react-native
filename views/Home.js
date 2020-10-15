import React, {useContext, useEffect} from 'react';

import ServerContext from '../context/server/serverContext';
import OrderContext from '../context/orders/ordersContext';
import FavoritesContext from '../context/favorites/favoritesContext';

import {Container, Content, List, Text, Button, Separator} from 'native-base';
import {View, Image, ScrollView, StyleSheet} from 'react-native';
import globalStyles from '../styles/global';

import {map, filter, slice} from 'lodash';
import {Product} from '../components/product';
import {Offers} from '../components/offers';

import {useNavigation} from '@react-navigation/native';

const Home = () => {
  const navigation = useNavigation();
  // Context de Server
  const {products, getProducts} = useContext(ServerContext);
  const {getUserStorage} = useContext(ServerContext);
  const {getFavoritesStorage} = useContext(FavoritesContext);

  // Context del Pedido
  const {} = useContext(OrderContext);

  useEffect(() => {
    getProducts();
  }, []);

  useEffect(() => {
    getUserStorage();
  }, []);

  useEffect(() => {
    getFavoritesStorage();
  }, []);


  return (
    <Container style={globalStyles.container}>
      <Content style={{backgroundColor: '#FFF '}}>
        <Image
          style={globalStyles.banner}
          source={require('../assets/imgs/banner.jpg')}
        />
        <View style={globalStyles.container}>
          <Separator style={globalStyles.separator}>
            <Text style={globalStyles.separatorText}>Nuestras ofertas</Text>
          </Separator>

          <ScrollView horizontal>
            {map(filter(products, 'offer'), (product, index) => {
              return <Offers {...product} key={index} />;
            })}
          </ScrollView>
        </View>
        <View style={styles.containerList}>
          <Separator style={globalStyles.separator}>
            <Text style={globalStyles.separatorText}>Productos destacados</Text>
          </Separator>

          <List>
            {map(slice(products, 0, 8), (product, index) => {
              return <Product {...product} key={index}/>;
            })}
          </List>
        </View>
        <View style={styles.containerbutton}>
          <Button
            bordered
            danger
            onPress={() => navigation.navigate('products')}>
            <Text>Ver más</Text>
          </Button>
        </View>
      </Content>
    </Container>
  );
};

const styles = StyleSheet.create({
  containerbutton: {
    marginVertical: 20,
    alignSelf: 'center',
  },
  containerList: {
    flex: 1,
    marginVertical: 20,
  },
});

export default Home;
