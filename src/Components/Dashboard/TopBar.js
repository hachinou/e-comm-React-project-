import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useEffect, useState } from "react";
import { USER,LOGOUT} from "../../Api/Api";
import { Axios } from "../../Api/axios";
import { Menu } from "../../Context/MenuContext";
import { useNavigate } from "react-router-dom";
import {DropdownButton} from "react-bootstrap";
import {Dropdown} from "react-bootstrap";
import Cookie from  "cookie-universal";

export default function TopBar(){
  const menu = useContext(Menu);
  const setIsOpen = menu.setIsOpen;
  const [name, setName] = useState("");
  const cookie = Cookie();

  const navigate = useNavigate();
  useEffect(()=> {
    Axios.get(`/${USER}`) 
    .then((data)=> setName(data.data.name))
    .catch(()=> navigate("/login", { replace: true }));

},[]);


  async   function handleLogOut(){
     try{
   const res =  await  Axios.get(`/${LOGOUT}`); 
   cookie.remove("e-commerce");
     window.location.pathname = "/login";
     }catch(err){
             console.log(err);
     }
     }
 


    return (
        <div className="top-bar">
          <div className=" d-flex align-items-center justify-content-between h-100">
            <div className="d-flex align-items-center gap-5">
            <h3>E-Commerce</h3>
            <FontAwesomeIcon       
            onClick={()=>setIsOpen(prev => !prev)} 
            cursor={"pointer"} 
            icon={faBars} 
            />
            </div>

              <div>
              <DropdownButton id="dropdown-basic-button" title={name}>
                <Dropdown.Item  onClick={handleLogOut}>Logout</Dropdown.Item>
              </DropdownButton>
              </div>

            </div>
          </div>
    );
}