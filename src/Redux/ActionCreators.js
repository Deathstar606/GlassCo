import * as ActionTypes from './ActionTypes';
import { baseUrl } from "./shared/baseurl"

export const sunLoading = () => ({
  type: ActionTypes.SUNGLASSES_LOADING
});

export const sunFailed = (errmess) => ({
  type: ActionTypes.SUNGLASSES_FAILED,
  payload: errmess
});

export const addsun = (dishes) => ({
  type: ActionTypes.ADD_SUNGLASSES,
  payload: dishes
});

export const fetchSun = () => (dispatch) => {
  dispatch(sunLoading(true));

  return fetch(baseUrl + 'sunglass')
      .then(response => {
          if (response.ok) {
              return response;
          }
          else {
              var error = new Error('Error ' + response.status + ': ' + response.statusText);
              error.response = response;
              throw error;
          }
      },
      error => {
          var errmess = new Error(error.message);
          throw errmess;
      })
      .then(response => response.json())
      .then(dishes => dispatch(addsun(dishes)))
      .catch(error => dispatch(sunFailed(error.message)));
}

//////////////////////////

export const addOrders = (orders) => ({
    type: ActionTypes.ADD_ORDERS,
    payload: orders
});

export const addOrder = (order) => ({
    type: ActionTypes.ADD_ORDER,
    payload: order
});

export const orderFailed = (errMess) => ({
    type: ActionTypes.ORDERS_FAILED,
    payload: errMess
});

export const fetchOrders = () => (dispatch) => {
    try {
        const ordersFromStorage = JSON.parse(localStorage.getItem('Gorders')) || [];
        dispatch(addOrders(ordersFromStorage));
    } catch (error) {
        dispatch(orderFailed(error.message));
    }
};

export const addNewOrder = (order) => (dispatch) => {
    try {
        const ordersFromStorage = JSON.parse(localStorage.getItem('Gorders')) || [];
        ordersFromStorage.push(order);
        localStorage.setItem('Gorders', JSON.stringify(ordersFromStorage));
        dispatch(addOrder(order));
    } catch (error) {
        dispatch(orderFailed(error.message));
    }
};

export const removeExistingOrder = (order_id) => (dispatch) => {
    try {
        let ordersFromStorage = JSON.parse(localStorage.getItem('Gorders')) || [];
        ordersFromStorage = ordersFromStorage.filter(o => !(o._id === order_id));
        localStorage.setItem('Gorders', JSON.stringify(ordersFromStorage));
        dispatch(fetchOrders());
    } catch (error) {
        dispatch(orderFailed(error.message));
    }
};

export const requestLogin = (creds) => {
    return {
        type: ActionTypes.LOGIN_REQUEST,
        creds
    }
}
  
export const receiveLogin = (response) => {
    return {
        type: ActionTypes.LOGIN_SUCCESS,
        token: response.token
    }
}
  
export const loginError = (message) => {
    return {
        type: ActionTypes.LOGIN_FAILURE,
        message
    }
}

export const loginUser = (creds) => (dispatch) => {
    // We dispatch requestLogin to kickoff the call to the API
    dispatch(requestLogin(creds))

    return fetch('/users/login', {
        method: 'POST',
        headers: { 
            'Content-Type':'application/json',
        },
        body: JSON.stringify(creds)
    })
    .then(response => {
        if (response.ok) {
            return response;
        } else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
        },
        error => {
            throw error;
        })
    .then(response => response.json())
    .then(response => {
        if (response.success) {
            // If login was successful, set the token in local storage
            localStorage.setItem('token', response.token);
            localStorage.setItem('creds', JSON.stringify(creds));
            dispatch(receiveLogin(response));
        }
        else {
            var error = new Error('Error ' + response.status);
            error.response = response;
            throw error;
        }
    })
    .catch(error => dispatch(loginError(error.message)))
};

export const requestLogout = () => {
    return {
      type: ActionTypes.LOGOUT_REQUEST
    }
}
  
export const receiveLogout = () => {
    return {
      type: ActionTypes.LOGOUT_SUCCESS
    }
}

// Logs the user out
export const logoutUser = () => (dispatch) => {
    dispatch(requestLogout())
    localStorage.removeItem('token');
    localStorage.removeItem('creds');
    dispatch(receiveLogout())
}