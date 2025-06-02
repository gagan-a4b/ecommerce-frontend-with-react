const ERROR_MESSAGES = {
  CART: {
    FETCH_ERROR: {
      code: 'CART_FETCH_ERROR',
      message: 'Error fetching cart'
    },
    ENRICH_ERROR: {
      code: 'CART_ENRICH_ERROR',
      message: 'Failed to enrich cart items'
    },
    REMOVE_FAILED: {
      code: 'CART_REMOVE_FAILED',
      message: 'Failed to remove item'
    },
    REMOVE_ERROR: {
      code: 'CART_REMOVE_ERROR',
      message: 'Error removing item from cart'
    }
  },

  ORDERS: {
    FETCH_ERROR: {
      code: 'ORDERS_FETCH_ERROR',
      message: 'Failed to fetch orders'
    }
  },

  PRODUCTS: {
    FETCH_ERROR: {
      code: 'PRODUCTS_FETCH_ERROR',
      message: 'Failed to fetch products'
    },
    LOGIN_TO_ADD: {
      code: 'PRODUCTS_LOGIN_TO_ADD',
      message: 'Please log in to add items to cart'
    },
    NOT_LOGGED_IN: {
      code: 'PRODUCTS_NOT_LOGGED_IN',
      message: 'Not logged in'
    },
    ADD_TO_CART_FAILED: {
      code: 'PRODUCTS_ADD_TO_CART_FAILED',
      message: 'Failed to add to cart'
    }
  }
};

export default ERROR_MESSAGES;
