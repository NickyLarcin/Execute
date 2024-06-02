// utils/fetcher.js
import axios from 'axios';

export const fetcher = (url) => axios.get(url).then((res) => res.data);
export const updateData = (url, data) => axios.put(url, data).then((res) => res.data);

