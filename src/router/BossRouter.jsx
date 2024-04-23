import {useNavigate} from "react-router-dom";
import {decodeUserToken} from "../api/authentication/AuthenticationApi.jsx";
import {useEffect} from "react";

const BossRouter = ({ element }) => {
    const navigate = useNavigate();
    const credentials = decodeUserToken();

    useEffect(() => {
        if (!credentials || (!credentials.roles.includes("BOSS") && !credentials.roles.includes("ADMIN"))) {
            navigate("/");
        }
    }, [navigate, credentials.roles]);

    return credentials && (credentials.roles.includes("BOSS") || credentials.roles.includes("ADMIN")) ? element : null;
};

export default BossRouter;