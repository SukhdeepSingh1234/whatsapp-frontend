import axios from 'axios'

const instance=axios.create({
    baseURL:"http://localhost:9000",
    // baseURL:"https://whatsapp-mern-kappa.vercel.app"

})

export default instance;