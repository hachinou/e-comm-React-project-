import { Link } from "react-router-dom";
import "./403.css";
export default function Err403({ role }){
    return(
        <div className="text-wrapper">
            <div className="title" data-content={404}>
                403 - ACCESS DENIED
            </div>
            <div className="subtitle">
            Oops, You don't have permission to access this page.
            </div>
            <div className="subtitle">
            <Link to= {role === "1996" ? "/dashboard/writer" : "/"} >
                 {role === "1996" ? "Go To Your writer Profile" : "Return To Home Page please"}
            </Link>
            </div>
        </div>
    );
}