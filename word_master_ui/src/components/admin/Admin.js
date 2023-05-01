import React from "react";
import { Formik, Field, Form, ErrorMessage, useFormik } from "formik";
import { makeStyles, useTheme } from "@mui/styles";
import * as Yup from "yup";
import Grid from "@mui/material/Grid";
import { TextField, FormControl, Button, Stack } from "@mui/material";
import { insert_a_word } from "../../services/wm_services";
import Box from "@mui/material/Box";
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
    height: "50px",
    backgroundColor: "red",
    "&:hover": {
      backgroundColor: theme.palette.secondary.light,
    },
    width: "500px",
  },
  field: { padding: "20em", width: "500px" },
}));

const Admin = ({ open, onClose }) => {
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
    <form onSubmit={formik.handleSubmit}>
      <Stack spacing={2} direction="column" sx={{ marginBottom: 4 }}>
        <TextField
          variant="outlined"
          id="word"
          label="New Word"
          value={formik.values.word}
          onChange={formik.handleChange}
          error={formik.touched.word && Boolean(formik.errors.word)}
          helperText={formik.touched.word && formik.errors.word}
          className={classes.field}
        ></TextField>

        <TextField
          variant="outlined"
          id="def"
          label="Definition"
          value={formik.values.def}
          onChange={formik.handleChange}
          error={formik.touched.def && Boolean(formik.errors.def)}
          helperText={formik.touched.def && formik.errors.def}
          className={classes.field}
          multiline
          maxRows={4}
        ></TextField>

        <TextField
          variant="outlined"
          className={classes.field}
          id="notes"
          label="notes"
          value={formik.values.notes}
          onChange={formik.handleChange}
          error={formik.touched.notes && Boolean(formik.errors.notes)}
          helperText={formik.touched.notes && formik.errors.notes}
          multiline
          maxRows={4}
        ></TextField>
        <Button variant="contained" type="submit" className={classes.button}>
          Submit
        </Button>
        <Button
          variant="contained"
          className={classes.button}
          onClick={() => onClose()}
        >
          Close
        </Button>
      </Stack>
    </form>
  );
};

export default Admin;
