import {SharedState} from "./state";
import {createFeatureSelector, createSelector, MemoizedSelector} from "@ngrx/store";

export const getLastModalRef = (state: SharedState) => state.modals[state.modals.length - 1];
export const getActiveRoute = (state: SharedState) => state.activeRoute;
export const getCurrentMonthNumber = (state: SharedState) => state.currentMonthNumber;
export const getCurrentMonth = (state: SharedState) => state.currentMonth;
export const getSmallCalendarCurrentMonthNumber = (state: SharedState) => state.smallCalendarCurrentMonthNumber;
export const getSmallCalendarCurrentMonth = (state: SharedState) => state.smallCalendarCurrentMonth;


export const selectSharedState: MemoizedSelector<object, SharedState> = createFeatureSelector<SharedState>('shared');

export const selectLastModalRef: MemoizedSelector<object, any> = createSelector(selectSharedState, getLastModalRef);
export const selectActiveRoute: MemoizedSelector<object, any> = createSelector(selectSharedState, getActiveRoute);
export const selectCurrentMonthNumber: MemoizedSelector<object, any> = createSelector(selectSharedState, getCurrentMonthNumber);
export const selectCurrentMonth: MemoizedSelector<object, any> = createSelector(selectSharedState, getCurrentMonth);
export const selectSmallCalendarCurrentMonthNumber: MemoizedSelector<object, any> = createSelector(selectSharedState, getSmallCalendarCurrentMonthNumber);
export const selectSmallCalendarCurrentMonth: MemoizedSelector<object, any> = createSelector(selectSharedState, getSmallCalendarCurrentMonth);
