import axios from "axios"

const defualtURL = 'http://localhost:8888'

axios.defaults.baseURL = defualtURL
axios.defaults.headers['token'] = localStorage.getItem('token')
axios.defaults.headers['Content-Type'] = 'application/json'

axios.defaults.transformRequest = function(data) {
	//data = Qs.stringify(data);
	data = JSON.stringify(data);
	return data;
};

export default axios
