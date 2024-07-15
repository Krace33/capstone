import axios from 'axios'
import { BASE_URL } from './constants'

const config = {
    headers: {
        "Content-Type": "Application/json",
        "Accept": "Application/json"
    }
};

export const callAPI = async (resource) => {
    const { data } = await axios.get(`${BASE_URL}/${resource}`, config)
    return data;
}