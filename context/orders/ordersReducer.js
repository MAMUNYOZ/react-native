import {
  SELECCIONAR_PRODUCTO,
  CONFIRMAR_PEDIDO_PRODUCTO,
  MOSTRAR_RESUMEN,
  ELIMINAR_PRODUCTO
} from '../../types';

export default (state, action) => {
  switch (action.type) {
    case SELECCIONAR_PRODUCTO:
      return {
        ...state,
        product: action.payload,
      };
    case CONFIRMAR_PEDIDO_PRODUCTO:
      return {
        ...state,
        order: [...state.order, action.payload],
      };
    case MOSTRAR_RESUMEN:
      return {
        ...state,
        total: action.payload,
      };
      case ELIMINAR_PRODUCTO:
        return {
          ...state,
          order: state.order.filter( article => article.id !== action.payload)
        };    default:
      return state;
  }
};
