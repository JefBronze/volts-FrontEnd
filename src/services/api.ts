import axios from 'axios';

export const api = axios.create({
    baseURL: 'http://35.175.139.235:3000'
})

export const getProfile = async (): Promise<any> => {
    try {
        const { data }= await api.get<{ data: VRM.Info }>('/vrm/info')
        return data
    } catch (error) {
        console.log(error)
    }
}