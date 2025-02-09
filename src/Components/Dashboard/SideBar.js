
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { USER } from "../../Api/Api";
import { Axios } from "../../Api/axios";
import { Menu } from "../../Context/MenuContext";
import { WindowSize } from "../../Context/WindowContext";
import "./Bars.css";
import { links } from "./NavLink";

export default function SideBar(){
    const menu = useContext(Menu);
    const WindowContext = useContext(WindowSize);
    const windowSize = WindowContext.windowSize;
    const isOpen = menu.isOpen;
    console.log(isOpen);

//User
const [user,setUser] = useState("");
const navigate = useNavigate();

useEffect(()=> {
    Axios.get(`/${USER}`) 
    .then((data)=> setUser(data.data))
    .catch(()=> navigate("/login", { replace: true }));

},[]);


    return (
        <>
        <div
        style={{
            position:"fixed",
            top:"70px",
            left:"0",
            width:"100%",
            height:"100vh",
            backgroundColor:"rgba(0, 0, 0, 0.2)",
            display: windowSize < "768" && isOpen ? "block" : "none",

        }}
        ></div>
    <div 
    className="side-bar pt-3" 
    style={{
        left : windowSize < "768" ? (isOpen ? 0 : "-100%") : 0,
        width: isOpen ?"240px" : "fit-content",
        position: windowSize < "768" ? "fixed" : "sticky",
        }}
        >
           
         {links.map(
            (link , key) => 
                  link.role.includes(user.role) && (
                <NavLink
                key={key}
                 to={link.path} 
                 className="d-flex align-items-center gap-2 side-bar-link" 
                 >
                <FontAwesomeIcon 
                    style={{padding: isOpen ? "10px 8px 10px 15px" : "10px 14px", transition:"0.5s", }} 
                    icon={link.icon} />
                <p className="m-0"
                 style={{
                    display: isOpen ? "block" :"none",
                 }}
                 > 
                 {link.name}
                 </p>
                 </NavLink>
            ))}
    </div>
    </>    
    );
}