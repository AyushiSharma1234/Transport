import axios from "axios";

interface IFormInput {
  name: string;
  role: string;
  email: string;
  password: string;
  phone: string;
}

interface LoginInput {
  email: string;
  password: string;
}

const cookieValue = document.cookie.split(`jwt=`);

const api = axios.create({
  baseURL: "http://localhost:4000", // base URL
  withCredentials: true,
});

// Request interceptor for adding the bearer token
api.interceptors.request.use(
  (config) => {
    console.log("config.method", config.method);
    console.log("config.body", config.data);

    const token = cookieValue[1];
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor
api.interceptors.response.use(
  (response) => {
    // Modify the response data here (e.g., parse, transform)
    console.log("response interceptor");

    return response;
  },
  (error) => {
    // Handle response errors here
    console.log('error response',error.response)
    if (error.response.status === 403 || error.response.status === 400) {
      return error.response;
    }
    console.log('after response')
    return Promise.reject(error);
  }
);

// API endpoints

export const signUpUser = async (data: IFormInput) => {
  let response = await api.post("/user/signUp", data);
  return response.data;
};

export const loginUser = async (data: LoginInput) => {
  let response = await api.post("/user/login", data);
  return response.data;
};

export const logoutUser = () => {
  return api.get("/user/logout");
};

export const forgetPasswordUser = async (data: any) => {
  let resposneObj = await api.post("/user/forget-password", data);
  return resposneObj.data;
};

export const verifyOtpUser = async (data: any) => {
  let resposneObj = await api.put("/user/verify-otp", data);
  return resposneObj;
};

// Export the api instance
export default api;
