import { createContext } from 'react';

import { useReducer } from 'react';
import { createAction } from '../../utils/reducer/reducer.utils';
const INIT_STATE = {
  loading: false,
  workers: [],
  products: [],
  currentWorker: null,
};

export const AdminContext = createContext(INIT_STATE);

const ACTION_TYPES = {
  SET_WORKERS: 'SET_WORKERS',
  ADD_WORKER: 'ADD_WORKER',
  SET_LOADING: 'SET_LOADING',
  SET_CURRENT_WORKER: 'SET_CURRENT_WORKER',
};

const adminReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case ACTION_TYPES.SET_WORKERS:
      return { ...state, workers: payload };

    case ACTION_TYPES.ADD_WORKER:
      return { ...state, workers: [...state.workers, payload] };

    case ACTION_TYPES.SET_LOADING:
      return { ...state, loading: payload };

    case ACTION_TYPES.SET_CURRENT_WORKER:
      return { ...state, currentWorker: payload };
    default:
      console.log('ACTION TYPE MISMATCH IN ADMIN REDUCER ', type);
      return { ...state };
  }
};

export const AdminProvider = ({ children }) => {
  const [state, dispatch] = useReducer(adminReducer, INIT_STATE);

  const setWorkers = (workers) => {
    dispatch(createAction(ACTION_TYPES.SET_WORKERS, workers));
  };

  const addWorker = (worker) => {
    dispatch(createAction(ACTION_TYPES.ADD_WORKER, worker));
  };

  const setLoading = (loading) => {
    dispatch(createAction(ACTION_TYPES.SET_LOADING, loading));
  };

  const setCurrentWorker = (workerId) => {
    const worker = state.workers.find((worker) => worker.workerId === workerId);
    dispatch(createAction(ACTION_TYPES.SET_CURRENT_WORKER, worker));
  };
  const newValue = {
    ...state,
    setWorkers,
    addWorker,
    setLoading,
    setCurrentWorker,
  };
  return (
    <AdminContext.Provider value={newValue}>{children}</AdminContext.Provider>
  );
};
