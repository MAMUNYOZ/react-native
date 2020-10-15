import React, {useReducer} from 'react';

import OrderReducer from './ordersReducer';
import OrderContext from './ordersContext';

import {URL_HOST_DATA} from '../../config/constants';

import {
  SELECCIONAR_PRODUCTO,
  CONFIRMAR_PEDIDO_PRODUCTO,
  MOSTRAR_RESUMEN,
  ELIMINAR_PRODUCTO,
  COMPRA_REALIZADA
} from '../../types';

const OrderState = (props) => {
  // Create state inicial
  const initialState = {
    order: [],
    product: null,
    total: 0,
    idOrder: ''
  };

  // useReducer con dispatch para ejecutar las funciones
  const [state, dispatch] = useReducer(OrderReducer, initialState);

  //Seleccionar el Producto que el usuario ha elegido
  const selectionProduct = (product) => {
    dispatch({
      type: SELECCIONAR_PRODUCTO,
      payload: product,
    });
  };

  // Cuando el usuario confirma el pedido de un producto
  const saveOrder = (order) => {
    dispatch({
      type: CONFIRMAR_PEDIDO_PRODUCTO,
      payload: order,
    });
  };

  // Muestra el total a pagar en el resumen
  const showSumary = (total) => {
    dispatch({
      type: MOSTRAR_RESUMEN,
      payload: total,
    });
  };

  // Elimnina un artículo del carrito
const removeProduct = id => {
  dispatch({
    type: ELIMINAR_PRODUCTO,
    payload: id
  })
}

//Realizar la compra
const makeOrder = async ( order ) =>
{
  const url = `${URL_HOST_DATA}/orders`;
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify( order ),
  });
  const data = await response.json();
  return data;
}

const finishOrder = id => {
  dispatch({
    type: COMPRA_REALIZADA,
    payload: id
  })
}


  return (
    <OrderContext.Provider
      value={{
        order: state.order,
        product: state.product,
        total: state.total,
        idOrder: state.idOrder,
        selectionProduct,
        saveOrder,
        showSumary,
        removeProduct,
        makeOrder,
        finishOrder
      }}>
      {props.children}
    </OrderContext.Provider>
  );
};

export default OrderState;
