import React, {useReducer, useEffect} from 'react';

import {URL_HOST_DATA} from '../../config/constants';

import ServerReducer from './serverReducer';
import ServerContext from './serverContext';

import {
  OBTENER_PRODUCTOS_EXITO,
  REGISTRAR_USUARIO,
  VALIDAR_USUARIO,
  MODIFICAR_USUARIO,
  ELIMINAR_USUARIO,
  OBTENER_COMPRAS_REALIZADAS
} from '../../types';

import AsyncStorage from '@react-native-community/async-storage';

const ServerState = (props) => {
  
  // Create state inicial
  let initialState = {
    products: [],
    user: [],
    orders:[]
  };

  // useReducer con dispatch para ejecutar las funciones
  const [state, dispatch] = useReducer(ServerReducer, initialState);

  // obtener el usuario del storage del mobil

  const getUserStorage = async () => {
    try {
      const email = await AsyncStorage.getItem('email');
      const password = await AsyncStorage.getItem('password');
      const userLoged = {email: email, password: password};

      getUser(userLoged);
    } catch (error) {
      console.log(error);
    }
  };

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

  // Función que se ejecuta para obtener las compras realizadas por un usuario
  const getOrders = async (idUser) => {
    const urlOrders = `${URL_HOST_DATA}/orders?user=${idUser}`; // nos traemos todos los productos
    const response = await fetch(urlOrders);
    const data = await response.json();
    dispatch({
      type: OBTENER_COMPRAS_REALIZADAS,
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
    const {email, password} = user;
    const url = `${URL_HOST_DATA}/users?email=${email}&password=${password}`;
    let result = [];

    const response = await fetch(url);
    const data = await response.json();
    if (data.length != 0) {
      result = data[0];
      dispatch({
        type: VALIDAR_USUARIO,
        payload: result,
      });
    }

    return result;
  };

  const cleanUser = () => {
    dispatch({
      type: ELIMINAR_USUARIO,
      payload: '',
    });
  }

  return (
    <ServerContext.Provider
      value={{
        products: state.products,
        user: state.user,
        orders: state.orders,
        getProducts,
        getOrders,
        saveUser,
        updateUser,
        getUser,
        getUserStorage,
        cleanUser
      }}>
      {props.children}
    </ServerContext.Provider>
  );
};

export default ServerState;
