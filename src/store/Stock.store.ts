import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { AppDispatch, AppThunk, RootState } from '../store'

const stock = createSlice({
    name: 'stock',
    initialState: {
        counter: 0
    },
    reducers: {
        increment (state, action: PayloadAction<number>) {
            state.counter += action.payload;
        },
        decrement (state) {
            state.counter -= 1;
        }
    } 
})

function sleep (ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms))
}

export const incrementAsync = (amount: number): AppThunk =>  async (dispatch: AppDispatch) => {
    await sleep(amount * 100);
    dispatch(increment(amount));
  };

export const { increment, decrement } = stock.actions;
export const selectCount = (state: RootState) => state.stock.counter
export default stock.reducer;