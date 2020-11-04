import axios from 'axios';

const search = axios.create({
  baseURL: 'https://openweathermap.org/data/2.5/find'
})

export default search;
