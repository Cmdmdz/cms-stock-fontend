import { server, STOCK_CLEAR, STOCK_FAILED, STOCK_FETCHING, STOCK_SUCCESS } from "../Constants";
import { Stock } from "../types/stock.type";
import { httpClient } from "../utils/httpclient";
// import { history } from "..";
import { Dispatch } from "react";
import { AnyAction } from "redux";

export const setStockFetchingToState = () => ({
    type: STOCK_FETCHING,
});

export const setStockSuccessToState = (payload: Stock[]) => ({
    type: STOCK_SUCCESS,
    payload,
});

export const setStockFailedToState = () => ({
    type: STOCK_FAILED,
});

export const setStockClearToState = () => ({
    type: STOCK_CLEAR,
});

export const loadStock = () => {
    return (dispatch: any) => {
        dispatch(setStockFetchingToState());
        doGetProducts(dispatch);
    };
};


const doGetProducts = async (dispatch: any) => {
    try {
        const result = await httpClient.get<Stock[]>(server.STOCK_URL);
        console.log(result);
        dispatch(setStockSuccessToState(result.data));
    } catch (error) {
        dispatch(setStockFailedToState());
    }
};

export const addStock = (values: any, navigate: any) => {
    return async (dispatch: any) => {
        await httpClient.post(server.CREATE_URL, values);
         doGetProducts(dispatch);
        // navigate("/stock");
        // history.goBack();
    };
};

export const updateStock = (stockId: string,values: any) => {
    return async (dispatch: Dispatch<AnyAction>) => {
        dispatch(setStockFetchingToState());
        await httpClient.put(`${server.UPDATE_URL}/${stockId}`, values);
         doGetProducts(dispatch);
    };
};

export const deleteStock = (stockId: string) => {
    return async (dispatch: Dispatch<AnyAction>) => {
        dispatch(setStockFetchingToState());
        await httpClient.delete(`${server.REMOVE_URL}/${stockId}`);
         doGetProducts(dispatch);
    };
};
