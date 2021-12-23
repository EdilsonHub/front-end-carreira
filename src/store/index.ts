import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import stockReducer from './Stock.store';
import swipeableDrawer from './SwipeableDrawer.store';
import formProjeto from './FormProjeto.store';

export const store = configureStore({
    reducer: {
        stock: stockReducer,
        swipeableDrawer: swipeableDrawer,
        formProjeto: formProjeto
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch


export type AppThunk = ThunkAction<void, RootState, null, Action<string>>
export const useAppDispatch = () => useDispatch<AppDispatch>()