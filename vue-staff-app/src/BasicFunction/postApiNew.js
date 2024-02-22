import K from "@/lib";
import axios from "axios";

export async function postApiNew(url, body = {}) {
  let data = undefined;
  let isError = false;

  try {
    const res = await axios.post(K.API_URL + url, body);
    if (res.status === 200) {
      console.log('request completed successfully')
    }
    else if  (res.status >= 400 && res.status < 404) {
      K.cleanStorageData();
      this.$router.push({ name: res.data.url ? res.data.url : "login" });
      console.log('request completed with an error')
    }
  } catch (err) {
    isError = err;
  }

  return { data, isError };


 
}
