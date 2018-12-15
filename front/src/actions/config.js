import axios from 'axios'

const APIUrl = 'http://127.0.0.1:8000/api/'

const instance = axios.create({
  baseURL: APIUrl,
  timeout: 10000,
  headers: {'Content-Type': 'application/json'}
});

export const setRequest = (endpoint, method = 'GET', data) => {
  switch (method) {
    case 'GET':
      return instance.get(`${APIUrl}${endpoint}/`)
    case 'POST':
      return instance.post(`${APIUrl}${endpoint}/`, data)
    case 'PATCH':
      return instance.patch(`${APIUrl}${endpoint}/${data.id}/`, data)
    default:
      return null;
  }
}