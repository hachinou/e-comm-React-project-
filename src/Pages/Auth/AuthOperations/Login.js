import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { baseURL,LOGIN } from "../../../Api/Api";
import LoadingSubmit from "../../../Components/Loading/Loading";
import Cookie from "cookie-universal";
import {Form} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import "../../Auth/AuthOperations/Auth.css";

export default function Login(){
    // State 
    const [form ,setForm]=useState({

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

     // use Ref 
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
     const res = await  axios.post(`${baseURL}/${LOGIN}`, form);
            setLoading(false);
            const token = res.data.token;
            const role = res.data.user.role;
            const go = role === "1995" ? "users" : "writer";
            cookie.set("e-commerce", token);
            window.location.pathname = `/dashboard/${go}` ;
        }catch (err) {
            setLoading(false);
            if(err.response.status === 401){
                setErr("Wrong Email or Password");
            }else{
                setErr("unAuthorized invalid credentials");
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
                        <h1>Login Now</h1>

                        <Form.Group 
                        className="form-custom" 
                        controlId="exampleForm.ControlInput1">
                        
                        <Form.Control
                        ref={focus} 
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



                        <button className="btn btn-primary" onClick={handleSubmit}>Login</button>

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