import React, {useReducer} from 'react';

import OrderReducer from './ordersReducer';
import OrderContext from './ordersContext';

import {
  SELECCIONAR_PRODUCTO,
  CONFIRMAR_PEDIDO_PRODUCTO,
  MOSTRAR_RESUMEN,
  ELIMINAR_PRODUCTO,
} from '../../types';

const OrderState = (props) => {
  // Create state inicial
  const initialState = {
    order: [],
    product: null,
    total: 0,
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


  return (
    <OrderContext.Provider
      value={{
        order: state.order,
        product: state.product,
        total: state.total,
        selectionProduct,
        saveOrder,
        showSumary,
        removeProduct
      }}>
      {props.children}
    </OrderContext.Provider>
  );
};

export default OrderState;
