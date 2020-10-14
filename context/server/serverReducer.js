import {OBTENER_PRODUCTOS_EXITO, REGISTRAR_USUARIO, VALIDAR_USUARIO} from '../../types';

export default (state, action) => {
  switch (action.type) {
    case OBTENER_PRODUCTOS_EXITO:
      return {
        ...state,
        products: action.payload,
      };
    case REGISTRAR_USUARIO:
      return {
        ...state,
        user: [action.payload],
      };
    case VALIDAR_USUARIO:
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
};
