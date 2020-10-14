import {
    GUARDAR_FAVORITOS,
    ELIMINAR_PRODUCTO_FAVORITO
  } from '../../types';
  
  export default (state, action) => {
    switch (action.type) {
      case GUARDAR_FAVORITOS:
        return {
          ...state,
          favorites: [...state.favorites, action.payload],
        };
        case ELIMINAR_PRODUCTO_FAVORITO:
          return {
            ...state,
            favorites: state.favorites.filter( article => article.id !== action.payload)
          };    default:
        return state;
    }
  };
  