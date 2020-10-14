import React, {useReducer} from 'react';

import {URL_HOST_DATA} from '../../config/constants';

import ServerReducer from './serverReducer';
import ServerContext from './serverContext';

import {OBTENER_PRODUCTOS_EXITO, REGISTRAR_USUARIO, VALIDAR_USUARIO, MODIFICAR_USUARIO} from '../../types';

const ServerState = (props) => {
  // Create state inicial
  const initialState = {
    products: [],
    user: [],
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
      payload: data,
    });
  };

  //Función para registrar usuarios
  const saveUser = async (user) => {
    const url = `${URL_HOST_DATA}/users`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(user),
    });
    const data = await response.json();

    dispatch({
      type: REGISTRAR_USUARIO,
      payload: data,
    });
  };

  //Función para modificar usuarios
  const updateUser = async (user, id) => {
    const url = `${URL_HOST_DATA}/users/${id}`;
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(user),
    });
    const data = await response.json();
    dispatch({
      type: MODIFICAR_USUARIO,
      payload: data,
    });
  };

  const getUser = async (user) => {
    const { email, password } = user;
    const url = `${URL_HOST_DATA}/users?email=${email}&password=${password}`;
    let result = [];
    
    const response = await fetch(url);
    const data = await response.json();
    if (data.length !=0) {
      result = data[0];
      dispatch({
        type: VALIDAR_USUARIO,
        payload: result,
      });
    } 
    
    return result;
  };
  
  return (
    <ServerContext.Provider
      value={{
        products: state.products,
        user: state.user,
        getProducts,
        saveUser,
        updateUser,
        getUser,
      }}>
      {props.children}
    </ServerContext.Provider>
  );
};


export default ServerState;
