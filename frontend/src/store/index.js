// Redux store configuration
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

// Reducers
const authReducer = (state = { isAuthenticated: false, user: null }, action) => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return { isAuthenticated: true, user: action.payload };
    case 'LOGOUT':
      return { isAuthenticated: false, user: null };
    default:
      return state;
  }
};

const attendanceReducer = (state = { records: [], loading: false }, action) => {
  switch (action.type) {
    case 'FETCH_ATTENDANCE_START':
      return { ...state, loading: true };
    case 'FETCH_ATTENDANCE_SUCCESS':
      return { records: action.payload, loading: false };
    case 'FETCH_ATTENDANCE_ERROR':
      return { ...state, loading: false };
    default:
      return state;
  }
};

const resourceReducer = (state = { resources: [], loading: false }, action) => {
  switch (action.type) {
    case 'FETCH_RESOURCES_START':
      return { ...state, loading: true };
    case 'FETCH_RESOURCES_SUCCESS':
      return { resources: action.payload, loading: false };
    case 'FETCH_RESOURCES_ERROR':
      return { ...state, loading: false };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  auth: authReducer,
  attendance: attendanceReducer,
  resources: resourceReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
