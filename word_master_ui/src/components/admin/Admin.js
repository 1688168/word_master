import { Formik, Field, Form, ErrorMessage } from "formik";
import { makeStyles, useTheme } from "@mui/styles";
import * as Yup from "yup";
import Grid from "@mui/material/Grid";
import { TextField, Button } from "@mui/material";

const WMSchema = Yup.object().shape({
  word: Yup.string().required("a new word"),
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
  const a_word = {};
  return (
    <Formik
      initialValues={{
        word: "",
        def: "",
        notes: "",
      }}
      onSubmit={handleSubmit}
      validationSchema={WMSchema}
    >
      {(Props) => (
        <Form>
          <Grid container>
            <Grid item>
              <TextField
                label="New Word"
                name="word"
                onChange={(e) => {
                  Props.setFieldValue("word", e.target.value);
                }}
                onBlur={(e) => {
                  Props.setFieldValue("word", e.target.value);
                }}
              ></TextField>
            </Grid>
          </Grid>

          <Button variant="contained" type="submit" className={classes._button}>
            Submit
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default Admin;
