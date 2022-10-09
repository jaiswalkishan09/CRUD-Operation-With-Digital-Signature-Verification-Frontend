import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import { useNavigate } from "react-router-dom";
import Cookies from 'universal-cookie';

function Middleware() {
    const navigate = useNavigate();
    const handleCrud = () => navigate("/edit");
    const handleLogout=()=>{
        const cookies = new Cookies();
        cookies.remove('privateKey');
        cookies.remove('publicKey');
        cookies.remove('token');
        navigate("/");
    }
    return(
        <Container id="main-container" className='d-grid h-100'>
            <div className='d-grid mt-3'>
                <Button variant='primary' className='p-5' onClick={handleCrud}>Do CRUD Operation On User.It will also use libsodium for req body verification</Button>
                <Button variant='info' className='mt-3 p-5'>Get visualization of digital signature to verify data using libsodium.</Button>
                <Button variant='warning' className='mt-3 p-3' onClick={handleLogout}>Log Out</Button>
            </div>
        </Container>
    )
}

export default Middleware;