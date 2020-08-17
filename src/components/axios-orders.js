import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://burguer-app-ciro-rocha.firebaseio.com/'
})

export default instance