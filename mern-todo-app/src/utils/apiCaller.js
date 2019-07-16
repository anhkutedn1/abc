import axios from 'axios';

export default function callApi(endpoint, method = 'GET', body) {
    return axios({
        method,
        url: `http://localhost:${process.env.PORT}${endpoint}`,
        data: body
    }).catch(err => {
        console.log(err);
    });
}

// || `http://localhost:3000${endpoint}`