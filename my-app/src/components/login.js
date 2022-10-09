import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Cookies from 'universal-cookie';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";

function Login() {
    const [email,setEmail]=useState("");
    const[emailCheck,setEmailCheck]=useState(true);
    const [password,setPassword]=useState("");
    const[passwordCheck,setPasswordCheck]=useState(true);
    const [loader,setLoader]=useState(false);
    
    const navigate = useNavigate();
    const handleSignUp = () => navigate("/signup");
    const handleMiddleware=()=>navigate("/middleware");

    const emailSet=(e)=>{
        setEmail(e.target.value);
        let emailValidation = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,24}$/;
        emailValidation.test(e.target.value)?setEmailCheck(false):setEmailCheck(true);
    }

    const passwordSet=(e)=>{
        setPassword(e.target.value);
       e.target.value && e.target.value.length>=8?setPasswordCheck(false):setPasswordCheck(true);
    }
    const loginUser=async () => {
        try {
        if(!emailCheck && !passwordCheck)
        {
            setLoader(true);
            let data={
                "email":email,
                "password":password
            }
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            };
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/users/signin`,requestOptions)
            let json_res = await response.json();
            if (response.status===200) {
                const cookies = new Cookies();
                cookies.set('token',json_res.token);
                cookies.set('publicKey',json_res.publicKey);
                cookies.set('privateKey',json_res.privateKey);
                handleMiddleware();
                setLoader(false);
            }
            else{
                setLoader(false);
                alert(json_res.message);
            }
        }
        else{
            alert("Please sign in the fields with valid data.")
        }
        } catch (err) {
            setLoader(false);
            alert("Something went wrong please try again.")
        }
      };
    return(
        <Container id="main-container" className='d-grid h-100'>
            {!loader?<Form id="sign-up-form" className="w-100">
                <h1>Please Sign In</h1>

                <Form.Group>
                    <Form.Label className="text-left">Email Address:</Form.Label>
                    <Form.Control type='email' placeholder="Email Address" onChange={emailSet}></Form.Control>
                    { emailCheck?<Form.Text  style={{color:"red"}}>
                    Please Provide valid email.
                    </Form.Text>:""}
                </Form.Group>
                <Form.Group>
                    <Form.Label className="text-left">Password:</Form.Label>
                    <Form.Control type='password' placeholder="Password" onChange={passwordSet}></Form.Control>
                    { passwordCheck?<Form.Text  style={{color:"red"}}>
                    Please Provide valid password at lest length of 8 character.
                    </Form.Text>:""}
                </Form.Group>
                <div className='d-grid mt-3'>
                    <Button variant='primary' onClick={loginUser}>Log In</Button>
                </div>
                <div className='d-grid mt-3'>
                    <p>Don't have account please <Button onClick={() => handleSignUp()}>Sign Up</Button></p>
                </div>
            </Form>:"Please Wait..."}
        </Container>
    )
}

export default Login;