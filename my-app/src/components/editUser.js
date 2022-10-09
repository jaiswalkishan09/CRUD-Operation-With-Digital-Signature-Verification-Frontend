import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Cookies from 'universal-cookie';
import { useState,useEffect } from 'react';
import { useNavigate } from "react-router-dom";

function EditUser() {
    const cookies = new Cookies();
    const [firstName,setFirstName]=useState("");
    const[firstNameCheck,setFirstNameCheck]=useState(false);
    const [lastName,setLastName]=useState("");
    const[lastNameCheck,setLastNameCheck]=useState(false);
    const [email,setEmail]=useState("");
    const [mobile,setMobile]=useState("");
    const[mobileCheck,setMobileCheck]=useState(false);
    const [loader,setLoader]=useState(false);
    const [token]=useState("bearer "+cookies.get('token'))
    
    const navigate = useNavigate();
    const handleDeleteLogout=()=>{
        cookies.remove('privateKey');
        cookies.remove('publicKey');
        cookies.remove('token');
        navigate("/");
    }

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

    const mobileSet=(e)=>{
        setMobile(e.target.value);
        let numberValidation = /^[0-9]+$/;
        numberValidation.test(e.target.value) && e.target.value.length>=8?setMobileCheck(false):setMobileCheck(true);
    }

    useEffect(() => {
        async function fetchMyApi()
        {
            try {
                const requestOptions = {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' ,'Authorization':token},
                };
                const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/usersauth/getuserDetails`,requestOptions)
                let json_res = await response.json();
                if (response.status===200) {
                    setEmail(json_res.email)
                    setFirstName(json_res.firstName);
                    setLastName(json_res.lastName);
                    setMobile(json_res.mobileNo);
                }
                else{
                    alert(json_res.message);
                }
            } catch (err) {
                alert("Something went wrong please try again.")
            }
        }
        if(token)
        {
            fetchMyApi();
        }
      }, [token]);

    const editUser=async () => {
        try {
        if(!firstNameCheck && !lastNameCheck  && !mobileCheck )
        {
            setLoader(true);
            let data={
                "firstName":firstName,
                "lastName":lastName,
                "mobileNo":mobile,
            }
            const requestOptions = {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json','Authorization':token },
                body: JSON.stringify(data)
            };
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/usersauth/updateUserDetails`,requestOptions)
            let json_res = await response.json();
            if (response.status===200) {
                setFirstName(json_res.firstName);
                setLastName(json_res.lastName);
                setMobile(json_res.mobileNo);
                setLoader(false);
            }
            else{
                setLoader(false);
                alert(json_res.message);
            }
        }
        else{
            alert("Please sign up all the fields with valid data.")
        }
        } catch (err) {
            setLoader(false);
            alert("Something went wrong please try again.")
        }
    };

    const deleteUser=async()=>{
        try {
            setLoader(true);
            const requestOptions = {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json','Authorization':token },
            };
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/usersauth/deleteUser`,requestOptions)
            let json_res = await response.json();
            if (response.status===200) {
                setLoader(false);
                handleDeleteLogout();
            }
            else{
                setLoader(false);
                alert(json_res.message);
            }
        } catch (err) {
            setLoader(false);
            alert("Something went wrong please try again.")
        }
    }
    return(
        <Container id="main-container" className='d-grid h-100'>
            {!loader?<Form id="sign-up-form" className="w-100">
                <h1>Update user details.</h1>
                <Form.Group>
                    <Form.Label className="text-left">Email Address:</Form.Label>
                    <Form.Control type='email' placeholder="Email Address" value={email} disabled></Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label className="text-left">First Name:</Form.Label>
                    <Form.Control type='text' placeholder="First Name" onChange={firstNameSet} value={firstName}></Form.Control>
                   { firstNameCheck?<Form.Text  style={{color:"red"}}>
                    Please Provide valid First Name.
                    </Form.Text>:""}
                </Form.Group>
                <Form.Group>
                    <Form.Label className="text-left">Last Name:</Form.Label>
                    <Form.Control type='text' placeholder="Last Name" onChange={lastNameSet} value={lastName}></Form.Control>
                    { lastNameCheck?<Form.Text  style={{color:"red"}}>
                    Please Provide valid Last Name.
                    </Form.Text>:""}
                </Form.Group>
          
                <Form.Group>
                    <Form.Label className="text-left">Mobile Number:</Form.Label>
                    <Form.Control type='text' placeholder="Mobile Number" onChange={mobileSet} value={mobile}></Form.Control>
                    { mobileCheck?<Form.Text  style={{color:"red"}}>
                    Please Provide valid mobile Number from 0-9.
                    </Form.Text>:""}
                </Form.Group>
                <div className='d-grid mt-3'>
                    <Button variant='primary' onClick={editUser}>Update User</Button>
                </div>

                <div className='d-grid mt-3'>
                    <Button variant='warning' onClick={handleDeleteLogout}>Log Out</Button>
                </div>

                <div className='d-grid mt-3'>
                    <Button variant='danger' onClick={deleteUser}>Delete User</Button>
                </div>
            </Form>:"Please Wait it will take some time to load..."}
        </Container>
    )
}

export default EditUser;