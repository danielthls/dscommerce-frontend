import { Link } from 'react-router-dom';
import * as authService from '../../services/AuthService'
import { useContext } from 'react';
import { ContextToken } from '../../utils/context-token';

export default function LoggedUser() {

    const { contextTokenPayload, setContextTokenPayload } = useContext(ContextToken);

    console.log(contextTokenPayload)

    function handleLogoutClick() {
        authService.logout();
        setContextTokenPayload(undefined);

    }

    return (
        contextTokenPayload &&
            authService.isAuthenticated()
            ? (
                < div className="dsc-logged-user" >
                    <p>{contextTokenPayload.username}</p>
                    <span onClick={handleLogoutClick}>Sair</span>
                </div >
            )
            : (
                <Link to="/login">
                    Entrar
                </Link>
            )


    );
}