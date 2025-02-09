
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {  Pro, PRO } from "../../../Api/Api";
import { Axios } from "../../../Api/axios";
import TableShow from "../../../Components/Dashboard/Table";

export default function Products(){
         // States 
    const [products, setProducts] = useState([]);
    const [page,setPage]= useState(1);
    const [limit , setLimit] = useState(3);
    const [total , setTotal] = useState(0);
    const[loading , setLoading] = useState(false);
   
  

    console.log(products);
  // Get all Categories 
    useEffect(() => {
      setLoading(true);
        Axios.get(`/${PRO}?page=${page}&limit=${limit}`)
    .then((data)=>{
      setProducts(data.data.data)
      setTotal(data.data.total)
    })
    .catch((err) =>console.log(err))
    .finally(()=>setLoading(false));
    },[]);
        
const header = [
    {key:"images" ,
     name:"Images"},
    {
      key:"title",
      name:"Title",
    },
    {
        key:"description",
        name:"Description",
      },
    {
      key:"price",
      name:"Price",
    },
    
      {
        key:"rating",
        name:"Rating",
      },
      {
        key:"created_at",
        name:"Created",
      },
      {
        key:"updated_at",
        name:"Updated",
      },
];
            // Handle Delete 
            async function handleDelete(id){
              try{
                 await  Axios.delete(`${Pro}/${id}`);
               setProducts((prev) => prev.filter((item) => item.id !== id));
              }catch(err){
                console.log(err)
              
              }
             }
    return (
    <div className="bg-white w-100 p-2 "  >
      <div className="d-flex align-items-center justify-content-between">

      <h1>Products Page</h1>
      <Link className="btn btn-primary" to="/dashboard/category/add">Add Product</Link>
      </div>
        
   <TableShow  
   header ={header} 
   data={products}
   delete={handleDelete}
   setPage={setPage}
   limit={limit}
   setLimit={setLimit}
   page={page}
   loading={loading}
   total={total}
   search="title"
   searchLink={Pro}
   
  
   />
  </div>
    );
}