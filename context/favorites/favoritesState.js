import React, {useReducer} from 'react';

import FavoritesReducer from './favoritesReducer';
import FavoritesContext from './favoritesContext';

import {
  GUARDAR_FAVORITOS,
  ELIMINAR_PRODUCTO_FAVORITO,
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
    dispatch({
      type: GUARDAR_FAVORITOS,
      payload: product,
    });
  };

  // Elimnina un artículo del carrito
const removeFavorites = id => {
  dispatch({
    type: ELIMINAR_PRODUCTO_FAVORITO,
    payload: id
  })
}


  return (
    <FavoritesContext.Provider
      value={{
        favorites: state.favorites,
        saveFavorites,
        removeFavorites
      }}>
      {props.children}
    </FavoritesContext.Provider>
  );
};

export default FavoritesState;
