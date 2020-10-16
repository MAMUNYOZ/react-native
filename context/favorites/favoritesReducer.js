import {
  GUARDAR_FAVORITOS,
  ELIMINAR_PRODUCTO_FAVORITO,
  OBTENER_FAVORITOS_STORAGE,
  ELIMINAR_FAVORITOS,
} from '../../types';

export default (state, action) => {
  switch (action.type) {
    case GUARDAR_FAVORITOS:
      return {
        ...state,
        favorites: [...state.favorites, action.payload],
      };
      case OBTENER_FAVORITOS_STORAGE:
      return {
        ...state,
        favorites: action.payload,
      };
    case ELIMINAR_PRODUCTO_FAVORITO:
      return {
        ...state,
        favorites: state.favorites.filter(
          (article) => article.id !== action.payload,
        ),
      };
      case ELIMINAR_FAVORITOS:
      return {
        ...state,
        favorites: [],
      };
    default:
      return state;
  }
};
