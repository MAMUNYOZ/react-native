import React, {Fragment} from 'react';
import {ListItem, Text, Thumbnail, Body} from 'native-base';
import {BASE_PATH_IMG} from '../config/constants';

export const Order = (order) => {
  const {name, subdescription, amount, id, total} = order;
  const image = `${BASE_PATH_IMG}${id}.jpg`;

  return (
    <Fragment key={id}>
      <ListItem key={id}>
        <Thumbnail large square source={{uri: image}} />
        <Body>
          <Text>{name}</Text>
          <Text note numberOfLines={2}>
            {subdescription}
          </Text>
          <Text>Cantidad: {amount}</Text>
          <Text>Total: {total} €</Text>
        </Body>
      </ListItem>
    </Fragment>
  );
};
