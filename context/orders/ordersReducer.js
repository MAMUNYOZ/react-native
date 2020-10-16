import {
  SELECCIONAR_PRODUCTO,
  CONFIRMAR_PEDIDO_PRODUCTO,
  MOSTRAR_RESUMEN,
  ELIMINAR_PRODUCTO,
  COMPRA_REALIZADA,
  ELIMINAR_PEDIDOS
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
        order: state.order.filter((article) => article.id !== action.payload),
      };
      case COMPRA_REALIZADA:
      return {
        ...state,
        order: [],
        total: 0,
        idOrder: action.payload,
      };
      case ELIMINAR_PEDIDOS:
        return {
          ...state,
          order: [],
          product: null,
          total: 0,
          idOrder: ''
        }; 
    default:
      return state;
  }
};
