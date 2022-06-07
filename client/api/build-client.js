import axios from 'axios'

export const axiosConnectg = (req) => {

    if(typeof window === 'undefined') {

       return axios.create({
            baseURL : "http://ingress-nginx.ingress-nginx.svc.cluster.local/",
            req : req.headers
        })

    }else {
        return axios.create({
          baseURL: "/",
        })

    }
}