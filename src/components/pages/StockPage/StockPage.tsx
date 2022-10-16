import MaterialTable from "material-table";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootReducers } from "../../../reducers";
import * as stockAction from "../../../actions/stock.action";
import React from "react";
import { useNavigate } from "react-router-dom";

const StockPage: React.FC<any> = () => {
  const [coourse, setCoourse] = useState<any[]>([]);
  const dispatch = useDispatch<any>();
  const stockReducer = useSelector((state: RootReducers) => state.stockReducer);
  const navigate = useNavigate();

  // React.useEffect(() => {
  //   ;

  //   // setCoourse();
  // }, []);

  React.useEffect(() => {
    dispatch(stockAction.loadStock());
  }, []);

  const handleRowUpdate = (newData: any, resolve: any) => {
    dispatch(stockAction.updateStock(newData.stockId,newData));
      resolve();
  };

  const handleRowDelete = (oldData: any, resolve: any) => {
    dispatch(stockAction.deleteStock(oldData.stockId));
    resolve();
  };

  const handleRowAdd = (newData: any, resolve: any) => {
    dispatch(stockAction.addStock(newData, navigate));
    resolve();
  };

  const [columns, setColumns] = useState([
    { title: "Name", field: "name", type: "string" as const },
    {
      title: "Price",
      field: "price",
      type: "numeric" as const,
    },
    { title: "Amount", field: "amount", type: "numeric" as const },
    { title: "Type", field: "type", type: "string" as const },
  ]);

  return (
    <MaterialTable
      title="Stock Product"
      columns={columns}
      data={stockReducer.result}
      editable={{
        onRowUpdate: (newData) =>
          new Promise((resolve: any) => {
            handleRowUpdate(newData, resolve);
          }),
        onRowDelete: (oldData) =>
          new Promise((resolve) => {
            handleRowDelete(oldData, resolve);
          }),
        onRowAdd: (newData) =>
          new Promise((resolve: any) => {
            handleRowAdd(newData, resolve);
          }),
      }}
    />
  );
};
export default StockPage;
