import { combineReducers } from '@reduxjs/toolkit';
import uiReducer from './slices/ui';
 
export const rootReducer = combineReducers({
    ui: uiReducer,
});