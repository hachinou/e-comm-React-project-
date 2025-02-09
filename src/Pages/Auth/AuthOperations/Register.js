import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { baseURL,REGISTER } from "../../../Api/Api";
import LoadingSubmit from "../../../Components/Loading/Loading";
import Cookie from "cookie-universal";
import  Form  from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";

export default function Register(){
    // State 
    const [form ,setForm]=useState({
        name:"",
        email:"",
        password:"",
    });
    const navigate = useNavigate();
    // Coockies
    const cookie = Cookie();
    //Loadig
    const[loading,setLoading] = useState(false);
    //ERR
    const [err, setErr] = useState("");
    const focus = useRef("");
    // Handle Form Change
    function handleChange(e){
            setForm({...form,[e.target.name]: e.target.value })
    }
      // Handle Focus
      useEffect(()=>{
        focus.current.focus();
    },[]);

    //Handle Submit
    async function handleSubmit(e){
        e.preventDefault();
        setLoading(true);
        try{
       const res =   await    axios.post(`${baseURL}/${REGISTER}`, form);
            setLoading(false);
            const token = res.data.token;
            cookie.set("e-commerce", token);
            window.location.pathname ="/";
        }
        catch (err) {
            setLoading(false);
            if(err.response.status === 422){
                setErr("Email is alredy been taken");
            }else{
                setErr("internal server Err");
            }
        }

    }
    return(
        <>
        {loading && <LoadingSubmit/>}
        <div className="container">
            <div className="row" style={{height: "100vh"}}>
                <Form className="form " onSubmit={handleSubmit}>
                    <div className="custom-form">
                        <h1>Register Now</h1>

                        <Form.Group 
                        className="form-custom" 
                        controlId="exampleForm.ControlInput1">
                        
                        <Form.Control
                        ref={focus} 
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange} 
                        placeholder="Enter Your Name.." 
                        required
                        />
                        <Form.Label>Name :</Form.Label>
                        </Form.Group>

                        <Form.Group 
                        className="form-custom" 
                        controlId="exampleForm.ControlInput1">
                        
                        <Form.Control 
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange} 
                        placeholder="Enter Your Email.." 
                        required
                        />
                        <Form.Label>Email :</Form.Label>
                        </Form.Group>


                    <Form.Group 
                        className="form-custom" 
                        controlId="exampleForm.ControlInput2">
                        
                        <Form.Control 
                        type="password" 
                        name="password"
                        value={form.password}
                        onChange={handleChange}
                        placeholder="Enter Your password.."
                        minLength="6"
                        required
                        />
                        <Form.Label>Password :</Form.Label>
                        </Form.Group>



                        <Button variant="success" className="btn btn-primary" onClick={handleSubmit}>Register</Button>{' '}

                        <div className="google-btn">
                            <a href={`http://127.0.0.1:8000/login-google`}>
                                <div class="google-icon-wrapper">
                                    <img
                                    className="google-icon"
                                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/24px-Google_%22G%22_logo.svg.png"
                                    alt="G"
                                    />
                                </div>
                                <p class="btn-text">
                                    <h>Sign in with google</h>
                                </p>
                            </a>
                        </div>

                        {err !== "" && <span className="error">{err}</span>}
                  </div>
                </Form>
            </div>
        </div>
        </>
    );
}