import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import Grid from "@mui/material/Grid";

const WMSchema = Yup.object().shape({
  word: Yup.string().required("a new word"),
});

const Admin = (props) => {
  const handleSubmit = () => {};
  const a_word = {};
  return (
    <Formik
      initialValues={{
        word: "Enter a New Word",
        def: "Enter Definition",
        notes: "Enter Some Notes",
      }}
      onSubmit={handleSubmit}
      validationSchema={WMSchema}
    >
      {(Props) => (
        <Form>
          <Grid container>
            <Grid item>
              <Field type="text" name="word"></Field>
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  );
};

export default Admin;
