import axios from 'axios';
import { User, AuthRequest} from '../../pages/registration/Registration.types';


export const login = (credentials: AuthRequest) => {
    return axios.post('/api/login', credentials);
};

export const register = (user: User) => {
    return axios.post('/api/register', user);
};
