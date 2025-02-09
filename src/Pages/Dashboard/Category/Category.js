
import { useEffect, useState } from "react";
import {Form} from "react-bootstrap";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { Cat, USER } from "../../../Api/Api";
import { Axios } from "../../../Api/axios";
import Loading from "../../../Components/Loading/Loading"

export default function Category(){
    const[title, setTitle] = useState("");
    const [image, setImage] = useState("");
    const [disable, setDisable]=useState(true);
    const[loading ,setLoading]= useState(false);
    const nav = useNavigate();
    //Id
    const {id} = useParams();
   
    useEffect(() => {
        setLoading(true);
        Axios.get(`${Cat}/${id}`)
        .then((data)=> {
            setTitle(data.data.title);
            setImage(data.data.image);
            setLoading(false);
        })
        .then(()=>setDisable(false))
        .catch(()=>nav("/dashboard/categories/page/404", {replace: true}));
    },[]);
   // Handle Submit
 async  function HandleSubmit(e){
    setLoading(true);
    e.preventDefault();
    
    const form = new FormData(); 
    form.append("title", title);
    form.append("image", image);

    try{
 const res = await  Axios.post(`${Cat}/edit/${id}`, form);
 window.location.pathname="/dashboard/categories";
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
            <Form.Label>Title</Form.Label>
                <Form.Control
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
        <button disabled={disable} className="btn btn-primary" >Save</button>
    </Form>
    </>
    
    );

        
  
}