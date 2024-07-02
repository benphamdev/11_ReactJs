import {useEffect, useState} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import 'react-toastify/dist/ReactToastify.css';
import {useSelector} from "react-redux";
import {toast} from "react-toastify";
import {updateProfile} from "../../services/api/AuthService";
import {imgSrcBase64, toBase64, validateEmail} from "../../utils/Utils";

const InfoUser = (props) => {
    const infoUser = useSelector((state) => state.userReducer.account);

    // state
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('USER');
    const [avatar, setAvatar] = useState('');
    const [previewImage, setPreviewImage] = useState('');

    useEffect(() => {
        console.log("Modal useEffect : ", infoUser);
        if (infoUser !== null) {
            setUserName(infoUser?.username || '');
            setEmail(infoUser?.email || '');
            setRole(infoUser?.role || 'USER');
            if (infoUser?.image)
                setPreviewImage(`${infoUser.image}`);
        }
    }, [infoUser]);

    const handleClose = () => {
        setEmail('')
        setPassword('')
        setUserName('')
        setRole('USER')
        setAvatar('')
        setPreviewImage('')
    };

    const handleSave = async () => {
        // call api
        let data, response;

        try {
            data = {username: username, userImage: avatar}
            response = await updateProfile(data);

            if (response && response.EC === 0) {
                toast.success('Update user successfully');
                infoUser.username = response.DT.username;
                infoUser.image = previewImage;
            } else {
                toast.error(response.EM);
            }
        } catch (e) {
            toast.error(e.message);
        }
    }

    const handleUploadImage = (event) => {
        if (event) {
            // get file => convert to base64
            // console.log("avatar : ", event.target.files[0])    // File
            setAvatar(event.target.files[0]);
            // console.log("previewImage : ", previewImage)    // Base64
            setPreviewImage((URL.createObjectURL(event.target.files[0])));
        }
    }

    // console.log("render modal user")
    return (
        <>
            <form className="row g-3 needs-validation modal-user">
                <div className="col-md-6">
                    <label htmlFor="validationCustomUsername" className="form-label">Email</label>
                    <div className="input-group has-validation">
                        <span className="input-group-text" id="inputGroupPrepend">@</span>
                        <input type="text" className="form-control" id="validationCustomUsername"
                               aria-describedby="inputGroupPrepend" required
                               disabled={true} placeholder="benphamdev@gmail.com" value={email}
                               onChange={(e) => setEmail(e.target.value)}
                        />
                        <div className="invalid-tooltip">
                            Please choose a email.
                        </div>
                    </div>
                </div>

                <div className="col-md-6">
                    <label htmlFor="validationCustom02" className="form-label">Password</label>
                    <input type="password" className="form-control" id="validationCustom02" required
                           disabled={true} autoComplete={"current-password"}
                           placeholder="1234556789" value={password}
                           onChange={(e) => setPassword(e.target.value)}
                    />
                    <div className="valid-tooltip">
                        Looks good!
                    </div>
                </div>

                <div className="col-md-6">
                    <label htmlFor="validationCustom01" className="form-label">Username</label>
                    <input type="text" className="form-control" id="validationCustom01" required
                           autoComplete={"username"} disabled={false} placeholder="benphamdev" value={username}
                           onChange={(e) => setUserName(e.target.value)}
                    />
                    <div className="valid-tooltip">
                        Looks good!
                    </div>
                </div>

                <div className="col-md-3">
                    <label htmlFor="validationCustom04" className="form-label">Role</label>
                    <select className="form-select" id="validationCustom04" required value={role}
                            onChange={(e) => setRole(e.target.value)}
                            disabled={true}>
                        <option value="USER">USER</option>
                        <option value="ADMIN">ADMIN</option>
                    </select>
                    <div className="invalid-tooltip">
                        Please select a valid role.
                    </div>
                </div>

                {
                    !false && <div className="input-group mb-3">
                        <input type="file" className="form-control" id="inputGroupFile02"
                               onChange={(e) => handleUploadImage(e)}/>
                        <label className="input-group-text" htmlFor="inputGroupFile02">Upload</label>
                    </div>
                }

                <div className="col-md-12 img-preview">
                    {previewImage ? <img src={previewImage}/> : <span>Preview Image</span>}
                </div>

            </form>
            <div className="col-12 mt-3">
                <button
                    className="btn btn-primary" onClick={() => handleSave()}>
                    Submit form
                </button>
            </div>
        </>
    );
}

export default InfoUser;