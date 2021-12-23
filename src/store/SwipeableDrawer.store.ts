import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from '../store'


const swipeableDrawer = createSlice({
    name: 'swipeableDrawer',
    initialState: {
        show: false
    },
    reducers: {
        open (state) {
            state.show = true;
        },
        close (state) {
            state.show = false;
        }
    } 
})

export const { open, close } = swipeableDrawer.actions;
export const selectCount = (state: RootState) => state.swipeableDrawer.show
export default swipeableDrawer.reducer;