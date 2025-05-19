import axios from "axios";

export const api = axios.create({
  method: "GET",
  baseURL: "/ckan-api",
});
