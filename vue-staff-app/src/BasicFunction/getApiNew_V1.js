import K from "@/lib";
import axios from "axios";

export async function getApiNew(url, params) {
  let data = undefined;

  try {
    let res = []
    if (params) {
      res = await axios.get(K.API_URL + url, { params: params }); 
    } else {
      res = await axios.get(K.API_URL + url);
    }
    if (res.status === 200) {
      if (res.data) {
        data = res.data;
      } else {
        isEmpty = true;
      
      }
    } else if (res.status >= 400 && res.status < 404) {
      K.cleanStorageData();
      this.$router.push({ name: res.data.url ? res.data.url : "login" });
    }
  } catch (err) {
    isError = err;
  }
  return { ...data };
}
