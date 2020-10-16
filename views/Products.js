import React, {useContext, useEffect} from 'react';
import ServerContext from '../context/server/serverContext';

import {Container, Content, List, H1, Icon} from 'native-base';
import globalStyles from '../styles/global';

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
      <H1 style={globalStyles.title}><Icon name="md-wine"/> Nuestros Productos</H1>
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