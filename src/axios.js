import axios from 'axios'

const instance=axios.create({
    // baseURL:"http://localhost:4000",
    baseURL:"https://whatsapp-backend-23n6.onrender.com"

})

export default instance;