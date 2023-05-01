import React, { useState, useMemo, useRef } from "react";
import { useQuery } from "react-query";
import { AgGridReact } from "ag-grid-react";
import ClipLoader from "react-spinners/ClipLoader";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { getWords } from "../../services/wm_services";
import Container from "@mui/material/Container";
import { makeStyles } from "@mui/styles";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";
import Admin from "components/admin/Admin";
import Button from "@mui/material/Button";

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

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
function Main() {
  const { isLoading, isError, data, error } = useQuery("words", () =>
    getWords()
  );
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const gridRef = useRef();
  let [loading, setLoading] = useState(true);
  let [color, setColor] = useState("#ffffff");

  const [columnDefs] = useState([
    { field: "word" },
    { field: "def" },
    { field: "notes" },
    { field: "SuccessRate" },
    { field: "ReviewCnt" },
    { field: "ReviewCorrectCnt" },
    { field: "LastReviewDate" },
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
        <Button variant="outlined" onClick={handleClickOpen}>
          Add New Word
        </Button>
        <AgGridReact
          ref={gridRef}
          rowData={data.data || []}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          animatedRoe={true}
          rowSelection="multiple"
        ></AgGridReact>
      </div>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <Admin onClose={handleClose} />
      </Dialog>
    </Container>
  );
}

export default Main;
