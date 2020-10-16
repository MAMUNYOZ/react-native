import React, {useEffect, useContext} from 'react';
import {Container, H1, Content, Icon, Accordion, List, H3} from 'native-base';

import globalStyles from '../styles/global';

import ServerContext from '../context/server/serverContext';
import {Order} from '../components/order';

const OrdersPlaced = () => {
  // Context de Server
  const {user, orders, getOrders} = useContext(ServerContext);
  const {id} = user[0] || '';
  useEffect(() => {
    getOrders(id);
  }, [orders]);

  const dataArray = orders.map((shopping, index) => {
    return {
      title: 'Pedido' + shopping.id + " - Total: " + shopping.total + " €",
      content: (
        <List>
          {shopping.order.map((item, index) => {
            return <Order {...item} key={index} />;
          })}
        </List>
      ),
    };
  });

  console.log('dataAQrrary=', dataArray);

  return (
    <Container style={globalStyles.container}>
      <Content padder style={globalStyles.content}>
        <H1 style={globalStyles.title}><Icon name="md-gift-outline"/> Pedidos Realizados</H1>
        {orders.length !== 0 ? (
          <Accordion
            dataArray={dataArray}
            animation={true}
            expanded={true}
            renderContent={dataArray.content}
          />
        ) : (
          <H3 style={globalStyles.textcenter}> No hay pedidos realizados</H3>
        )}
      </Content>
    </Container>
  );
};

export default OrdersPlaced;
