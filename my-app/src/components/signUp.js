import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useEffect, useState } from 'react';

function SignUp() {
    const [firstName,setFirstName]=useState("");
    const[firstNameCheck,setFirstNameCheck]=useState(true);
    const [lastName,setLastName]=useState("");
    const[lastNameCheck,setLastNameCheck]=useState(true);
    const [emai,setEmail]=useState("");
    const[emailCheck,setEmailCheck]=useState(true);
    const [mobile,setMobile]=useState("");
    const[mobileCheck,setMobileCheck]=useState(true);
    const [password,setPassword]=useState("");
    const[passwordCheck,setPasswordCheck]=useState(true);

    const firstNameSet=(e)=>{
        setFirstName(e.target.value);
        let firstLastNameValidation = /^[A-Za-z]+$/; /** Alpha numeric,space,dot,single quotes and hyphen allowed */
        firstLastNameValidation.test(e.target.value)?setFirstNameCheck(false):setFirstNameCheck(true);
    }

    const lastNameSet=(e)=>{
        setLastName(e.target.value);
        let firstLastNameValidation = /^[A-Za-z]+$/; /** Alpha numeric,space,dot,single quotes and hyphen allowed */
        firstLastNameValidation.test(e.target.value)?setLastNameCheck(false):setLastNameCheck(true);
    }

    const emailSet=(e)=>{
        setEmail(e.target.value);
        let emailValidation = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,24}$/;
        emailValidation.test(e.target.value)?setEmailCheck(false):setEmailCheck(true);
    }

    const mobileSet=(e)=>{
        setMobile(e.target.value);
        let numberValidation = /^[0-9]+$/;
        numberValidation.test(e.target.value) && e.target.value.length>=8?setMobileCheck(false):setMobileCheck(true);
    }

    const passwordSet=(e)=>{
        setPassword(e.target.value);
       e.target.value && e.target.value.length>=8?setPasswordCheck(false):setPasswordCheck(true);
    }


    // useEffect(async()=>{
    //     try{
            
    //     }
    //     catch(e)
    //     {
    //         console.log(e);
    //     }

    // },[firstName])
    return(
        <Container id="main-container" className='d-grid h-100'>
            <Form id="sign-up-form" className="w-100">
                <h1>Please Sign Up</h1>
                <Form.Group>
                    <Form.Label className="text-left">First Name:</Form.Label>
                    <Form.Control type='text' placeholder="First Name" onChange={firstNameSet}></Form.Control>
                   { firstNameCheck?<Form.Text  style={{color:"red"}}>
                    Please Provide valid First Name.
                    </Form.Text>:""}
                </Form.Group>
                <Form.Group>
                    <Form.Label className="text-left">Last Name:</Form.Label>
                    <Form.Control type='text' placeholder="Last Name" onChange={lastNameSet}></Form.Control>
                    { lastNameCheck?<Form.Text  style={{color:"red"}}>
                    Please Provide valid Last Name.
                    </Form.Text>:""}
                </Form.Group>
                <Form.Group>
                    <Form.Label className="text-left">Email Address:</Form.Label>
                    <Form.Control type='email' placeholder="Email Address" onChange={emailSet}></Form.Control>
                    { emailCheck?<Form.Text  style={{color:"red"}}>
                    Please Provide valid email.
                    </Form.Text>:""}
                </Form.Group>
                <Form.Group>
                    <Form.Label className="text-left">Mobile Number:</Form.Label>
                    <Form.Control type='text' placeholder="Mobile Number" onChange={mobileSet}></Form.Control>
                    { mobileCheck?<Form.Text  style={{color:"red"}}>
                    Please Provide valid mobile Number from 0-9.
                    </Form.Text>:""}
                </Form.Group>
                <Form.Group>
                    <Form.Label className="text-left">New Password:</Form.Label>
                    <Form.Control type='password' placeholder="New Password" onChange={passwordSet}></Form.Control>
                    { passwordCheck?<Form.Text  style={{color:"red"}}>
                    Please Provide valid password at lest length of 8 character.
                    </Form.Text>:""}
                </Form.Group>
                <div className='d-grid mt-3'>
                    <Button variant='primary'>Sign Up</Button>
                </div>
            </Form>
        </Container>
    )
}

export default SignUp;