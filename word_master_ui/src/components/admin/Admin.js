import React from "react";
import { Formik, Field, Form, ErrorMessage, useFormik } from "formik";
import { makeStyles, useTheme } from "@mui/styles";
import * as Yup from "yup";
import Grid from "@mui/material/Grid";
import { TextField, Button } from "@mui/material";
import { insert_a_word } from "../../services/wm_services";
//import theme from "../../Theme";

const WMSchema = Yup.object().shape({
  word: Yup.string("Enter a New Word before Submit").required(
    "Enter a New Word before Submit"
  ),
  def: Yup.string("Enter Definition for the new word").required(
    "Enter Definition for the new word"
  ),
});

const useStyles = makeStyles((theme) => ({
  button: {
    color: "red",
    padding: "2em",
    margin: "20em",
    height: "50px",
    backgroundColor: "red",
    "&:hover": {
      backgroundColor: theme.palette.secondary.light,
    },
  },
  grid: { margin: "20em", padding: "2px", border: "20px" },
  field: { margin: "2px", width: "500px" },
}));

const Admin = (props) => {
  const classes = useStyles();
  const theme = useTheme();

  const handleSubmit = async (values) => {
    const body = {
      word: values.word,
      def: values.def,
      notes: values.notes,
    };
    try {
      const resp = await insert_a_word(values);
    } catch (err) {
      console.log(JSON.stringify(err));
    }
  };
  const handleReset = (values) => {
    alert("handleReset");
  };

  const formik = useFormik({
    initialValues: {
      word: "",
      def: "",
      notes: "",
    },
    validationSchema: WMSchema,
    onSubmit: (values) => {
      console.log(JSON.stringify(values, null, 2));
      handleSubmit(values);
    },
  });

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <Grid container>
          <Grid item className={classes.grid}>
            <TextField
              fullWidth
              id="word"
              label="New Word"
              value={formik.values.word}
              onChange={formik.handleChange}
              error={formik.touched.word && Boolean(formik.errors.word)}
              helperText={formik.touched.word && formik.errors.word}
              className={classes.field}
            ></TextField>
          </Grid>
          <Grid item className={classes.grid}>
            <TextField
              fullWidth
              id="def"
              label="Definition"
              value={formik.values.def}
              onChange={formik.handleChange}
              error={formik.touched.def && Boolean(formik.errors.def)}
              helperText={formik.touched.def && formik.errors.def}
            ></TextField>
          </Grid>
          <Grid item className={classes.grid}>
            <TextField
              id="notes"
              label="notes"
              value={formik.values.notes}
              onChange={formik.handleChange}
              error={formik.touched.notes && Boolean(formik.errors.notes)}
              helperText={formik.touched.notes && formik.errors.notes}
              className={classes.field}
            ></TextField>
          </Grid>
        </Grid>
      </form>
      <Button
        variant="contained"
        type="submit"
        className={classes.button}
        sx={{ marginTop: "200px" }}
      >
        Submit
      </Button>
    </div>
  );
};

export default Admin;
