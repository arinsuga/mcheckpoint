import { ReactNode } from "react";

const UsersLayout = ({children}: {children: ReactNode}) => {


    return (
        <div style={gaya.container}>
            <div>{children}</div>
            <div>{children}</div>
            <div>{children}</div>
            <div>{children}</div>
            
        </div>
    );
}

export default UsersLayout;

const gaya = {
    container: {
        display: 'flex',
        justifyContent: 'flex-end',
        alignItem: 'center',
        backgroundColor: 'blue',
        padding: '1rem'
    }
}