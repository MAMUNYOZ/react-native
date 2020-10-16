import {
  OBTENER_PRODUCTOS_EXITO,
  OBTENER_COMPRAS_REALIZADAS,
  REGISTRAR_USUARIO,
  MODIFICAR_USUARIO,
  VALIDAR_USUARIO,
  OBTENER_USUARIO_STORAGE,
  ELIMINAR_USUARIO,
} from '../../types';

export default (state, action) => {
  switch (action.type) {
    case OBTENER_PRODUCTOS_EXITO:
      return {
        ...state,
        products: action.payload,
      };
    case OBTENER_COMPRAS_REALIZADAS:
      return {
        ...state,
        orders: action.payload,
      };
    case REGISTRAR_USUARIO:
      return {
        ...state,
        user: [action.payload],
      };
    case MODIFICAR_USUARIO:
      return {
        ...state,
        user: [action.payload],
      };
    case VALIDAR_USUARIO:
      return {
        ...state,
        user: action.payload,
      };
    case OBTENER_USUARIO_STORAGE:
      return {
        ...state,
        user: action.payload,
      };
    case ELIMINAR_USUARIO:
      return {
        ...state,
        user: [],
      };
    default:
      return state;
  }
};
