
//Core Systems
import {
    ReactNode,
    useState,
    useContext,
    createContext,
    useEffect,
} from 'react'

//Packages
import { interval } from 'rxjs';

//Interfaces
import IAuth, { IUser } from '@/interfaces/IAuth';

//Services
import {
    login,
    logout,
    getUsername,
    getToken,
    verifyToken,
    authSubject,
    storeAuth,
    clearAuth,
    getAuth
} from '@/services/AuthService'

interface IProvider {
    authState?: IAuth | null;
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
    const [authdata, setAuthdata] = useState<IAuth | null>({authenticated: false});

    const handleLogin = async (username?: string, password?: string) => {
        let result = false;

        try {
            const auth = await login(username, password);
            setAuthdata(auth);
            result = true;

        } catch (error) {
            console.log(error);
        }

        return result;
    }

    const handleLogout = async () => {

        const auth = await logout();
        
        setAuthdata(auth);

        return true;

    }

    const handleRegister = async (email?: string, password?: string) => {

        return true;
    }

    const handleAuthantication = async () => {


        try {

            const username = await getUsername();
            const token = await getToken();
            const tokenInfo = await verifyToken(token);

            setAuthdata({    
                user: {
                    username,
                    roles: ['admin_roles'],
                },
                token: tokenInfo,
                authenticated: tokenInfo.status,
            });

            return tokenInfo.status;

        } catch (error) {

            console.log(error);
            return false;

        }

        
    }


    useEffect(() => {


        const loadAuth = async () => {

            const auth = await getAuth();
            authSubject.next(auth);

            console.log('Inside Authcontext - useEffect 1');
            console.log(auth);
    
        }
        loadAuth();

    }, []);

    useEffect(() => {

        const subscription = authSubject.subscribe((newAuth) => {


            setAuthdata(newAuth);
            newAuth && storeAuth(newAuth);
            // newAuth ? storeAuth(newAuth) : clearAuth();

            console.log('Inside Authcontext - useEffect 2 - authSubject: newAuth');
            console.log(newAuth);
            console.log('Inside Authcontext - useEffect 2 - authSubject: authdata');
            console.log(authdata);

        });
        return () => authSubject.unsubscribe();

    }, []);
    
    useEffect(() => {



    }, [authdata]);


    const value: IProvider = {
        authState: authdata,
        Login: handleLogin,
        Logout: handleLogout,
        Register: handleRegister,
        Authenticate: handleAuthantication,
    };

    // useEffect(() => {

    //     if (authdata) {

    //         const authenticate = interval(5000)
    //         .pipe()
    //         .subscribe


    //         return 
    //     }

    // }, [authdata]);



    return (
        <Providercontext.Provider value={ value }>

            { children }

        </Providercontext.Provider>
    )
}

export default Authprovider;