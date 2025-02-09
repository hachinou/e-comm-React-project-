
import { useEffect, useRef, useState } from "react";
import {Form} from "react-bootstrap";
import { Cat} from "../../../Api/Api";
import { Axios } from "../../../Api/axios";
import Loading from "../../../Components/Loading/Loading";

export default function AddCategory(){
    const [title, setTitle]= useState("");
    const [image, setImage]= useState("");
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
    const form = new FormData(); 
    form.append("title", title);
    form.append("image", image);

    try{
  await  Axios.post(`${Cat}/add`, form);
 window.location.pathname="/dashboard/category/add";
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
            <Form.Label>Title</Form.Label>
                <Form.Control
                ref={focus}
                value={title}
                onChange={(e)=> setTitle(e.target.value)}
                required
                type="text" 
                placeholder="title..."
                />
        </Form.Group>
        <Form.Group className="mb-3" contrilId="image">
            <Form.Label>Image</Form.Label>
            <Form.Control 
                onChange={(e)=> setImage(e.target.files.item(0))} 
                type="file">

            </Form.Control>
        </Form.Group>
        <button 
        disabled = {
            title.length > 1
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