import K from "@/lib";
import axios from "axios";

export async function getApiOld(url) {
  let data = undefined;
  let isError = false;
  let isEmpty = false;

  try {
    const res = await axios.get(K.API_URL + url);
    if (res.status === 200) {
      if (res.data.data.length) {
        data = res.data.data;
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
  return { data, isEmpty, isError };
}
