
import { useEffect, useRef, useState } from "react";
import {Form} from "react-bootstrap";
import { USER } from "../../../Api/Api";
import { Axios } from "../../../Api/axios";
import Loading from "../../../Components/Loading/Loading";

export default function AddUser(){
    const[name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [role , setRole] = useState("");
    const[password ,setPassword] = useState("");
    const [loading , setLoading] = useState(false); 
    
    const focus = useRef("");
       // Handle Focus
       useEffect(()=>{
        focus.current.focus();
    },[]);
   // Handle Submit
 async  function HandleSubmit(e){
    setLoading(true);
    e.preventDefault();
    try{
  await  Axios.post(`${USER}/add`, {
    name: name,
    email: email,
    password: password,
    role:role,
 });
 window.location.pathname="/dashboard/users";
    }catch(err){
        setLoading(false);
        console.log(err);
    }
   

   }
    return (
       <>
     {loading &&  <Loading/>}
    <Form className="bg-white w-100 mx-2 p-3" onSubmit={HandleSubmit}>
       
        <Form.Group className="mb-3" contrilId="exampleForm.ControlTextarea1 ">
            <Form.Label> User Name</Form.Label>
                <Form.Control
                ref={focus}
                value={name}
                onChange={(e)=> setName(e.target.value)}
                required
                type="text" 
                placeholder="name..."
                />
        </Form.Group>
        <Form.Group className="mb-3" contrilId="exampleForm.ControlInput2 ">
            <Form.Label>Email</Form.Label>
                <Form.Control
                value={email}
                onChange={(e)=> setEmail(e.target.value)}
                required
                type="email" 
                placeholder="name@example.com" />
        </Form.Group>
        <Form.Group className="mb-3" contrilId="exampleForm.ControlInput3 ">
            <Form.Label>Role</Form.Label>
                <Form.Select
                value={role}
                onChange={(e)=> setRole(e.target.value)}
                >
                    <option disabled value=""> Select Role</option>
                    <option value=  "1995">Admin</option>
                    <option value=  "2001">User</option>
                    <option value=  "1996">Writer</option>
                    <option value=  "1999">Product Manager</option>
            </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3" contrilId="exampleForm.ControlInput4 ">
            <Form.Label>Password</Form.Label>
                <Form.Control
                value={password}
                onChange={(e)=> setPassword(e.target.value)}
                required
                type="password" 
                placeholder="your password..." />
        </Form.Group>
        <button 
        disabled = {
            name.length > 1 &&
            email.length >1 &&
            password.length > 6  && 
            role !== ""
            ? false
            : true 
            }
        className="btn btn-primary" 
        >
        Save
        </button>
    </Form>
    </>
    
    );

        
  
}