import React, { useState, useMemo, useRef } from "react";

import { useQuery } from "react-query";

import { AgGridReact } from "ag-grid-react";
import ClipLoader from "react-spinners/ClipLoader";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { getWords } from "../../services/wm_services";

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

function Main() {
  const { isLoading, isError, data, error } = useQuery("words", () =>
    getWords()
  );
  const gridRef = useRef();
  let [loading, setLoading] = useState(true);
  let [color, setColor] = useState("#ffffff");

  const [columnDefs] = useState([{ field: "word" }]);

  const defaultColDef = useMemo(() => ({ sortable: true, filter: true }));

  if (isLoading)
    return (
      <ClipLoader
        color={color}
        loading={loading}
        cssOverride={override}
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    );
  if (isError) throw error;

  return (
    <div className="App">
      <div className="ag-theme-alpine" style={{ height: 400, width: 600 }}>
        <AgGridReact
          ref={gridRef}
          rowData={data.data}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          animatedRoe={true}
          rowSelection="multiple"
        ></AgGridReact>
      </div>
    </div>
  );
}

export default Main;
