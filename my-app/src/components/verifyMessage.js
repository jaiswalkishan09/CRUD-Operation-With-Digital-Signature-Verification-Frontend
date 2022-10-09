import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Cookies from 'universal-cookie';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
const _sodium = require('libsodium-wrappers');

function Login() {
    const cookies = new Cookies();
    const [orignalMessage,setOrignalMessage]=useState("");
    const[orignalMessageCheck,setOrignalMessageCheck]=useState(true);
    const [messageReceived,setMessageReceived]=useState("");
    const [result,setResult]=useState("");
    const[messageReceivedCheck,setMessageReceivedCheck]=useState(true);
    let[privateKey]=useState(cookies.get('privateKey'));
    let [publicKey]=useState(cookies.get('publicKey'));
    const [token]=useState("bearer "+cookies.get('token'))
    const [loader,setLoader]=useState(false);
    
    const navigate = useNavigate();

    const handleLogout=()=>{
        const cookies = new Cookies();
        cookies.remove('privateKey');
        cookies.remove('publicKey');
        cookies.remove('token');
        navigate("/");
    }

    const orignalMessageSet=(e)=>{
        setOrignalMessage(e.target.value);
        e.target.value.length>1?setOrignalMessageCheck(false):setOrignalMessageCheck(true);
    }

    const messageReceivedSet=(e)=>{
        setMessageReceived(e.target.value);
       e.target.value.length >1?setMessageReceivedCheck(false):setMessageReceivedCheck(true);
    }
    const verifyMessage=async () => {
        try {
            if(!orignalMessageCheck && !messageReceivedCheck)
            {
                setLoader(true);
                await _sodium.ready;
                let sodium = _sodium;
                publicKey=sodium.from_base64(publicKey);
                privateKey=sodium.from_base64(privateKey)
                let signature=sodium.crypto_sign_detached(orignalMessage,privateKey,"uint8array",publicKey);
                signature=sodium.to_base64(signature);
                let data={
                    "message":messageReceived
                }
                const requestOptions = {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json','Signature':signature,'Authorization':token },
                    body: JSON.stringify(data)
                };
                const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/usersauth/verify`,requestOptions)
                let json_res = await response.json();
                console.log(json_res)
                if (response.status===200) {
                    setResult("Orignal Message.It was not altered during transfer.")
                    setLoader(false);
                }
                else if(response.status===400)
                {
                    setResult("Not Orignal Message.It was altered/changed during transfer.")
                    setLoader(false);
                }
                else{
                    setLoader(false);
                    alert(json_res.message);
                }
            }
            else{
                alert("Please enter the fields with valid data.")
            }
        } catch (err) {
            console.log(err)
            setLoader(false);
            alert("Something went wrong please try again.")
        }
      };
    return(
        <Container id="main-container" className='d-grid h-100'>
            {!loader?<Form className="w-100">
                <h1>Verify Message Using Digital signature</h1>

                <Form.Group>
                    <Form.Label className="text-left">Orignal message you want to send:</Form.Label>
                    <Form.Control type='text' placeholder="Orignal Message" onChange={orignalMessageSet}></Form.Control>
                    { orignalMessageCheck?<Form.Text  style={{color:"red"}}>
                    Please Provide a message of atleast 1 length in character.
                    </Form.Text>:""}
                </Form.Group>
                <Form.Group>
                    <Form.Label className="text-left">Message user going to receive:</Form.Label>
                    <Form.Control type='text' placeholder="Received Message" onChange={messageReceivedSet}></Form.Control>
                    { messageReceivedCheck?<Form.Text  style={{color:"red"}}>
                    Please Provide a message of atleast 1 length in character.
                    </Form.Text>:""}
                </Form.Group>
                <Form.Group>
                    <Form.Label className="text-left">Result:</Form.Label>
                    <Form.Control type='text' placeholder="Click On Verify to see the result." value={result} disabled></Form.Control>
                </Form.Group>
                <div className='d-grid mt-3'>
                    <Button variant='primary' onClick={verifyMessage}>Verify</Button>
                </div>
                <div className='d-grid mt-3'>
                   <Button variant='warning' onClick={() => handleLogout()}>Log Out</Button>
                </div>
            </Form>:"Please Wait..."}
        </Container>
    )
}

export default Login;