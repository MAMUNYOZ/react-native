import React, {useContext, useEffect, Fragment} from 'react';
import {StyleSheet} from 'react-native';
import ServerContext from '../context/server/serverContext';

import {Container, Content, List} from 'native-base';
import globalStyles from '../styles/global';

import {map, filter} from 'lodash';
import {Product} from '../components/product';

const Products = () => {
    // Context de Server
  const {products, getProducts} = useContext(ServerContext);

  useEffect(() => {
    getProducts();
  }, []);
  return (
    <Container style={globalStyles.Contenedor}>
      <Content style={{backgroundColor: '#FFF '}}>
        <List>
          {products.map((product, index) => {
            return <Product {...product} key={index}/>;
          })}
        </List>
      </Content>
    </Container>
  );
};


export default Products;