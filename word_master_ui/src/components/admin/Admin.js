import React from "react";
import ReactDOM from "react-dom";
import { Formik, Field, Form, ErrorMessage, useFormik } from "formik";
import { makeStyles, useTheme } from "@mui/styles";
import * as Yup from "yup";
import Grid from "@mui/material/Grid";
import { TextField, Button } from "@mui/material";

const WMSchema = Yup.object().shape({
  word: Yup.string("Enter a New Word before Submit").required(
    "Enter a New Word before Submit"
  ),
  def: Yup.string("Enter Definition for the new word").required(
    "Enter Definition for the new word"
  ),
});

const useStyles = makeStyles((theme) => ({
  _button: { mt: 4, mb: 4, pt: 1, margin: 2 },
}));

const Admin = (props) => {
  const theme = useTheme();

  const classes = useStyles();
  const handleSubmit = () => {
    alert("handle submit");
  };
  const handleReset = () => {
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
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid container>
        <Grid item>
          <TextField
            fullWidth
            id="word"
            label="New Word"
            value={formik.values.word}
            onChange={formik.handleChange}
            error={formik.touched.word && Boolean(formik.errors.word)}
            helperText={formik.touched.word && formik.errors.word}
          ></TextField>
        </Grid>
        <Grid item>
          <TextField
            fullWidth
            id="def"
            label="Definition"
            value={formik.values.def}
            onChange={formik.handleChange}
            error={formik.touched.def && Boolean(formik.errors.def)}
            helperText={formik.touched.def && formik.errors.def}
          ></TextField>
          <TextField
            fullWidth
            id="notes"
            label="notes"
            value={formik.values.notes}
            onChange={formik.handleChange}
            error={formik.touched.notes && Boolean(formik.errors.notes)}
            helperText={formik.touched.notes && formik.errors.notes}
          ></TextField>
        </Grid>
      </Grid>

      <Button variant="contained" type="submit" className={classes._button}>
        Submit
      </Button>
    </form>
  );
};

export default Admin;
