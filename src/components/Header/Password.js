import {useState} from "react";
import Button from "react-bootstrap/Button";
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import './Share.scss'
import {toast} from "react-toastify";
import {changePassword} from "../../services/api/AuthService";
import {validatePass} from "../../utils/Utils";

export const Password = () => {
    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const validatePassword = () => {
        if (password === '' || newPassword === '' || confirmPassword === '') {
            toast.error('Please fill all fields');
            return false;
        }
        if (newPassword !== confirmPassword) {
            toast.error('New password and confirm password not match');
            return false;
        }

        // if (validatePass(newPassword) === false) {
        //     toast.error('Password must be at least 6 characters long');
        //     return false;
        // }
        return true;
    }
    const handleChangePass = async () => {
        if (!validatePassword()) return;

        const data = {
            current_password: password,
            new_password: newPassword,
        }

        let response = await changePassword(data);
        
        if (response && response.EC === 0) {
            toast.success('Change password successfully');
            setPassword('');
            setNewPassword('');
            setConfirmPassword('');
        } else {
            toast.error(response.EM);
        }
    };

    return (
        <>
            <div className={'password-group'}>
                <div className={'form-floating change-password'}>
                    <FloatingLabel controlId="floatingPassword" label="Current password" className="mb-3">
                        <Form.Control
                            type="password" placeholder="name@example.com"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </FloatingLabel>
                </div>

                <div className={'form-floating change-password'}>
                    <FloatingLabel controlId="floatingPassword" label="New Password" className="mb-3">
                        <Form.Control
                            type="password" placeholder="Password"
                            value={newPassword} onChange={(e) => setNewPassword(e.target.value)}
                        />
                    </FloatingLabel>
                </div>
            </div>

            <div className={'confirm-pass'}>
                <FloatingLabel controlId="floatingPassword" label="Confirm Password" className="mb-4">
                    <Form.Control
                        type="Change password" placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </FloatingLabel>

                <Button variant="primary" onClick={() => handleChangePass()}>
                    Save Changes
                </Button>
            </div>

        </>
    )
}