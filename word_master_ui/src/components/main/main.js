import React, { useState, useMemo, useRef } from "react";
import { useQuery } from "react-query";
import { AgGridReact } from "ag-grid-react";
import ClipLoader from "react-spinners/ClipLoader";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { getWords } from "../../services/wm_services";
import Container from "@mui/material/Container";
import { makeStyles, useTheme } from "@mui/styles";

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};
const useStyles = makeStyles((theme) => ({
  container_grid: {
    spacing: 2,
  },
}));
function Main() {
  const { isLoading, isError, data, error } = useQuery("words", () =>
    getWords()
  );
  const gridRef = useRef();
  let [loading, setLoading] = useState(true);
  let [color, setColor] = useState("#ffffff");

  const [columnDefs] = useState([
    { field: "word" },
    { field: "def" },
    { field: "note" },
    { field: "last_update_time" },
  ]);

  const defaultColDef = useMemo(() => ({ sortable: true, filter: true }));
  const classes = useStyles();
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
    <Container maxWidth={false} style={{ height: "100%" }}>
      <div
        className="ag-theme-alpine"
        style={{ height: 500, width: "calc(100%-24px)" }}
      >
        <AgGridReact
          ref={gridRef}
          rowData={data.data || []}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          animatedRoe={true}
          rowSelection="multiple"
        ></AgGridReact>
      </div>
    </Container>
  );
}

export default Main;
