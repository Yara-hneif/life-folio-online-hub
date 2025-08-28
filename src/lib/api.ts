import axios from "axios";

const base = "/api";
export const api = axios.create({ baseURL: base });