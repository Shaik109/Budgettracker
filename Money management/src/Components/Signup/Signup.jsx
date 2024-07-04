import React, { useState } from 'react'
import styles from './Signup.module.css'
import Inputcontrol from '../InputControl/Inputcontrol'
import {Link, useNavigate} from 'react-router-dom'
import{createUserWithEmailAndPassword, updateProfile} from 'firebase/auth'
import { auth } from '../Firebase'
export default function Signup(){
    const navigate = useNavigate();
  const [values, setValues] = useState({
    name: '',
    email:'',
    password:''
  });
  const[errormessg,setErrorMessg] = useState('')
  const[submitButtonDisabled,setSubmitButtonDisabled]=useState(false);

  const handleSubmission=()=>{
    if(!values.name || !values.email || !values.password){
        setErrorMessg('Fill all fields')
        return;
    }
       setErrorMessg("")


        setSubmitButtonDisabled(true);
       
     createUserWithEmailAndPassword(auth,values.email,values.password)
        .then(async(res)=>{
            setSubmitButtonDisabled(false);

            const user= res.user
            await updateProfile(user, {
                displayName: values.name ,
            })
            console.log(user)
           navigate("/")
        })
        .catch((err)=>{
            setSubmitButtonDisabled(false);
            console.error('Error:', err);
            setErrorMessg(err.message);
  })
    
  }
    return(
             <div className={styles.container}>
                   <div className={styles.innerbox}>
                    <h1 className={styles.heading}>Signup</h1>
                    <Inputcontrol label='Name' placeholder='Enter your Name here' 
                    onChange={(e)=>
                        setValues((prev)=>({...prev,name: e.target.value}))
                    }
                    />


                    <Inputcontrol label='Email' placeholder='Enter your Email Address'
                    onChange={(e)=>
                        setValues((prev)=>({...prev,email:e.target.value}))
                    }
                    />


                    <Inputcontrol label='Password' placeholder='Enter your Password'
                     onChange={(e)=>
                        setValues((prev)=>({...prev,password:e.target.value}))
                    }
                    />



                    <div className={styles.footer}>
                        <b className={styles.error}>{errormessg}</b>
                        <button onClick={handleSubmission} disabled={submitButtonDisabled}>
                        {submitButtonDisabled ? 'Submitting...' : 'Signup'}</button>
                        <p>Already have an account?{''}
                        <span>
                            <Link to='/login'>Login</Link>
                        </span>
                        </p>
                    </div>
                   </div>
                    </div>

    )

}