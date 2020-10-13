import React, {useReducer} from 'react';

import {URL_HOST_DATA} from '../../config/constants';

import ServerReducer from './serverReducer';
import ServerContext from './serverContext';

import {OBTENER_PRODUCTOS_EXITO} from '../../types';

const ServerState = (props) => {
  // Create state inicial
  const initialState = {
    products: [],
  };

  // useReducer con dispatch para ejecutar las funciones
  const [state, dispatch] = useReducer(ServerReducer, initialState);

  // Función que se ejecuta para obtener los productos de la base de datos
  const getProducts = async () => {
    const urlOffers = `${URL_HOST_DATA}/products`; // nos traemos todos los productos
    const response = await fetch(urlOffers);
    const data = await response.json();
     dispatch({
      type: OBTENER_PRODUCTOS_EXITO,
      payload: data
    });
  };
  return (
    <ServerContext.Provider
      value={{
        products: state.products,
        getProducts,
      }}>
      {props.children}
    </ServerContext.Provider>
  );
};

export default ServerState;
