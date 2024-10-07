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
    username?: string | null,
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

        setAuthdata({
            username: username,
            token: 'token authenticated',
            authenticated: true,
        });

        return true;

    }

    const handleLogout = async () => {

        setAuthdata({
            username: null,
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