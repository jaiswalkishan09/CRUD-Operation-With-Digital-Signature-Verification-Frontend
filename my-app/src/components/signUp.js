import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function SignUp() {
    return(
        <Container id="main-container" className='d-grid h-100'>
            <Form id="sign-up-form" className="w-100">
                <h1>Please Sign Up</h1>
                <Form.Group>
                    <Form.Label className="text-left">First Name:</Form.Label>
                    <Form.Control type='text' placeholder="First Name"></Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label className="text-left">Last Name:</Form.Label>
                    <Form.Control type='text' placeholder="Last Name"></Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label className="text-left">Email Address:</Form.Label>
                    <Form.Control type='email' placeholder="Email Address"></Form.Control>
                    <Form.Text className="text-muted">
                    Email address is used for log in.
                    </Form.Text>
                </Form.Group>
                <Form.Group>
                    <Form.Label className="text-left">Mobile Number:</Form.Label>
                    <Form.Control type='text' placeholder="Mobile Number"></Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label className="text-left">New Password:</Form.Label>
                    <Form.Control type='password' placeholder="New Password"></Form.Control>
                </Form.Group>
                <div className='d-grid mt-3'>
                    <Button variant='primary'>Sign Up</Button>
                </div>
            </Form>
        </Container>
    )
}

export default SignUp;