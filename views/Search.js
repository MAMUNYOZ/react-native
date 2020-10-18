import React, {useContext, useEffect, useState} from 'react';
import {View} from 'react-native';
import {
  Container,
  Content,
  Item,
  Input,
  Icon,
  List,
  H1
} from 'native-base';

import {Product} from '../components/product';

import globalStyles from '../styles/global';

import ServerContext from '../context/server/serverContext';

const Search = () => {
  const {products} = useContext(ServerContext);

  const [seach, setSeach] = useState('');
  const [seachResult, setResult] = useState('');

  const getProducts = (productsList, description) => {    
    if (description === '') {
      return [];
    }
    description = description.toLocaleLowerCase();
    return productsList.filter((product) =>
      product.description.toLocaleLowerCase().includes(description),
    ); 
  };

  useEffect(() => {
    setResult(getProducts(products, seach));
  }, [seach]);

  return (
    <Container style={globalStyles.container}>
      <Content style={globalStyles.content}>
      <H1 style={globalStyles.title}> <Icon name="md-wine"/> Buscador de Productos</H1>
        <View searchBar rounded>
          <Item>
            <Icon name="ios-search" />
            <Input placeholder="Palabra a buscar" 
            onChangeText= {(words) => setSeach(words)}/>
          </Item>
        </View>
        <List>
          {seachResult.map((product, index) => {
            return <Product {...product} key={index}/>;
          })}
        </List>
      </Content>
    </Container>
  );
};

export default Search;
