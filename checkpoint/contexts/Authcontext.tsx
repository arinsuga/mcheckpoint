import {
    ReactNode,
    Dispatch,
    useState,
    createContext,
    useContext,
} from 'react'

interface IUser {
    username?: string | null,
    roles?: string[] | null,
    email?: string | null
}

interface IState {
    user?: IUser | null,
    token?: string | null;
    authenticated?: boolean | null;
}

interface IProvider {
    authState?: IState | null;
    Login?: (username?: string, password?: string) => Promise<any | null>;
    Logout?: () => Promise<any | null>;
    Register?: (email?: string, password?: string) => Promise<any | null>;
}

const Providercontext = createContext<IProvider>({});

export const useAuth = () => {
    return useContext(Providercontext);
}


const Authprovider = ({ children }: { children: ReactNode }) => {
    const [authdata, setAuthdata] = useState<IState>({});

    const handleLogin = async (username?: string, password?: string) => {
        let result = false;

        //User
        if ((username?.toLocaleLowerCase() === 'user') && (password?.toLocaleLowerCase() === 'user')) {

            result = true;
            setAuthdata({
                user: {
                    username,
                    roles: ['user_roles'],
                    email: 'user@gmail.com',
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

        setAuthdata({
            user: null,
            token: null,
            authenticated: null,
        });

        return true;

    }

    const handleRegister = async (email?: string, password?: string) => {

        return true;
    }

    
    const value: IProvider = {
        authState: authdata,
        Login: handleLogin,
        Logout: handleLogout,
        Register: handleRegister,
    };

    return (
        <Providercontext.Provider value={ value }>

            { children }

        </Providercontext.Provider>
    )
}

export default Authprovider;