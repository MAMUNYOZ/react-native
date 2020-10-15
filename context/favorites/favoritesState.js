import React, {useReducer} from 'react';

import FavoritesReducer from './favoritesReducer';
import FavoritesContext from './favoritesContext';

import AsyncStorage from '@react-native-community/async-storage';

import {
  GUARDAR_FAVORITOS,
  ELIMINAR_PRODUCTO_FAVORITO,
  OBTENER_FAVORITOS_STORAGE,
} from '../../types';

const FavoritesState = (props) => {
  // Create state inicial
  const initialState = {
    favorites: [],
  };

  // useReducer con dispatch para ejecutar las funciones
  const [state, dispatch] = useReducer(FavoritesReducer, initialState);

  //Seleccionar el Producto que el usuario ha elegido
  const saveFavorites = (product) => {
    // Almacenamos en el Storage
    saveStorage(product);
    dispatch({
      type: GUARDAR_FAVORITOS,
      payload: product,
    });
  };

  // Almacenar en el storage
  const saveStorage = async (product) => {
    try {
      favorites = await AsyncStorage.getItem('favorites');
      if (favorites) {
        favorites = JSON.parse(favorites);
      } else {
        favorites = [];
      }
      favorites.push(product);
      await AsyncStorage.setItem('favorites', JSON.stringify(favorites));
    } catch (error) {
      console.log(error);
    }
  };

  //Eliminar producto de storage
  const removeFavoritesStorage = async (id) => {
    try {
      favorites = await AsyncStorage.getItem('favorites');
      favorites = JSON.parse(favorites);
      favorites = favorites.filter((article) => article.id !== id);
      await AsyncStorage.setItem('favorites', JSON.stringify(favorites));
    } catch (error) {
      console.log(error);
    }
  };

  //Obtener favoritos del storage
  const getFavoritesStorage = async () => {
    favorites = await AsyncStorage.getItem('favorites');
    if (favorites) {
      favorites = JSON.parse(favorites);
    } else {
      favorites = [];
    }
    dispatch({
      type: OBTENER_FAVORITOS_STORAGE,
      payload: favorites,
    });
  };

  // Elimnina un artículo del carrito
  const removeFavorites = (id) => {
    removeFavoritesStorage(id);
    dispatch({
      type: ELIMINAR_PRODUCTO_FAVORITO,
      payload: id,
    });
  };

  return (
    <FavoritesContext.Provider
      value={{
        favorites: state.favorites,
        saveFavorites,
        removeFavorites,
        getFavoritesStorage,
      }}>
      {props.children}
    </FavoritesContext.Provider>
  );
};

export default FavoritesState;
