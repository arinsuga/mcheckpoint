
//Core Systems
import {
    ReactNode,
    useState,
    useContext,
    createContext,
    useEffect,
} from 'react'

//Packages
import AsyncStorage from '@react-native-async-storage/async-storage';

//Interfaces
import IUser from '@/interfaces/IUser';

//Services
import { login, logout, getUsername, getToken, verifyToken } from '@/services/AuthService'


interface IAuthState {
    user?: IUser | null,
    token?: string | null;
    authenticated?: boolean | null;
}

interface IProvider {
    authState?: IAuthState | null;
    Login?: (username?: string, password?: string) => Promise<any | null>;
    Logout?: () => Promise<any | null>;
    Register?: (email?: string, password?: string) => Promise<any | null>;
    Authenticate?: () => Promise<boolean>;
}

const Providercontext = createContext<IProvider>({});

export const useAuth = () => {
    return useContext(Providercontext);
}

const Authprovider = ({ children }: { children: ReactNode }) => {
    const [authdata, setAuthdata] = useState<IAuthState>({});

    const handleLogin = async (username?: string, password?: string) => {
        let result = false;

        try {
            await login(username, password);
            const token = await getToken();

            result = true;
            setAuthdata({
                user: {
                    username,
                    roles: ['admin_roles'],
                },
                token: token,
                authenticated: result,
            });

        } catch (error) {
            console.log(error);
        }

        //User
        if ((username?.toLocaleLowerCase() === 'user') && (password?.toLocaleLowerCase() === 'user')) {

            result = true;
            setAuthdata({
                user: {
                    username,
                    roles: ['user_roles'],
                },
                token: 'User token authenticated',
                authenticated: result,
            });
    
        }

        //Admin
        if ((username?.toLocaleLowerCase() === 'admin') && (password?.toLocaleLowerCase() === 'admin')) {

            result = true;
            setAuthdata({
                user: {
                    username,
                    roles: ['admin_roles'],
                    email: 'admin@gmail.com',
                },
                token: 'Admin token authenticated',
                authenticated: result,
            });
    
        }

        return result;
    }

    const handleLogout = async () => {

        await logout();
        
        setAuthdata({
            user: null,
            token: null,
            authenticated: false,
        });

        return true;

    }

    const handleRegister = async (email?: string, password?: string) => {

        return true;
    }

    const handleAuthantication = async () => {


        try {

            const username = await getUsername();
            const token = await getToken();
            const authenticated = await verifyToken(token);

            setAuthdata({    
                user: {
                    username,
                    roles: ['admin_roles'],
                },
                token,
                authenticated: authenticated.status,
            });

            return authenticated.status;

        } catch (error) {

            console.log(error);
            return false;

        }

        
    }
    
    const value: IProvider = {
        authState: authdata,
        Login: handleLogin,
        Logout: handleLogout,
        Register: handleRegister,
        Authenticate: handleAuthantication,
    };

    useEffect(() => {

        console.log('Inside Autcontext - useEffect...');

    }, []);




    return (
        <Providercontext.Provider value={ value }>

            { children }

        </Providercontext.Provider>
    )
}

export default Authprovider;