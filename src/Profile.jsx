import React, { useState } from 'react';
import axios from 'axios';

function Profile() {

    const [file, setFile] = useState({});
    const uploadFile =  () => {
        const formData = new FormData();
        formData.append('file', file)
        axios.post('http://localhost:8000/profile' , formData, { mode: 'cors' })
        // const response = await fetch('http://localhost:8080/cors', { mode: 'cors' });
        .then(res => console.log("res ==>" , res))
        .catch(err => console.log("err ==> ", err));
        console.log(file)
    }

  return (
    <div>
        <h2 style={{color: 'blueviolet'}}> Profile</h2>
        <input type="file"  
        onChange = {(e) => setFile(e.target.files[0])}
        />
        <button onClick={uploadFile} > Upload! </button>
        
    </div>
  )
}

export default Profile;
