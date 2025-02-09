import Cookie from "cookie-universal";
import { Navigate, Outlet } from "react-router-dom";

export default function RequireBack(){
    const cookie =  Cookie();
    const token = cookie.get("e-commerce")
    return token ? <Navigate to="/" /> : <Outlet/>;

    
}