import axios from "axios";

export async function getWords() {
  try {
    //const resp = await axios.get("http://localhost:5000/wm/get_words");
    const { data } = await axios({
      method: "get",
      url: "http://localhost:5000/wm/get_words",
      headers: {
        "Cache-Control": "no-cache",
        "Access-Control-Allow-Origin": "*",
      },
    });

    //alert("data 001: " + JSON.stringify(data));
    return data;
  } catch (e) {
    console.log("error");
  } finally {
    console.log("finally");
  }
}
