
import { useEffect, useState } from "react";
import {Form} from "react-bootstrap";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { USER } from "../../../Api/Api";
import { Axios } from "../../../Api/axios";
import Loading from "../../../Components/Loading/Loading"

export default function User(){
    const[name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [role , setRole] = useState("");
    const [disable, setDisable]=  useState(true);
    const [loading , setLoading] = useState(false); 

    const nav = useNavigate();
    //Id
    const {id} = useParams();
   
    useEffect(() => {
        setLoading(true);
        Axios.get(`${USER}/${id}`)
        .then((data)=> {
            setName(data.data.name);
            setEmail(data.data.email);
            setRole(data.data.role);
            setLoading(false);
        })
        .then(()=>setDisable(false))
        .catch(()=>nav("/dashboard/Users/users/page/404", {replace: true}));
    },[]);
   // Handle Submit
 async  function HandleSubmit(e){
    setLoading(true);
    e.preventDefault();
    try{
 const res = await  Axios.post(`${USER}/edit/${id}`, {
    name: name,
    email: email,
    role:role,
 });
 window.location.pathname="/dashboard/Users/users";
 console.log(res);
    }catch(err){
        setLoading(false);
        console.log(err);
    }
    

   }
    return (
       <> {loading &&  <Loading/>}
    <Form className="bg-white w-100 mx-2 p-3" onSubmit={HandleSubmit}>
       
        <Form.Group className="mb-3" contrilId="exampleForm.ControlTextarea1 ">
            <Form.Label>User Name</Form.Label>
                <Form.Control
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
        <button disabled={disable} className="btn btn-primary" >Save</button>
    </Form>
    </>
    
    );

        
  
}