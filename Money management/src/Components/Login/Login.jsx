import React,{useState} from 'react'
import styles from './Login.module.css'
import Inputcontrol from '../InputControl/Inputcontrol'
import {Link,useNavigate} from 'react-router-dom'
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../Firebase';
export default function Login(){
    const navigate = useNavigate();
    const [values, setValues] = useState({
      email:'',
      password:''
    });
    const[errormessg,setErrorMessg] = useState('')
    const[submitButtonDisabled,setSubmitButtonDisabled]=useState(false);
  
    const handleSubmission=()=>{
      if( !values.email || !values.password){
          setErrorMessg('Fill all fields')
          return;
      }
         setErrorMessg("")
  
  
          setSubmitButtonDisabled(true);
         
       signInWithEmailAndPassword(auth,values.email,values.password)
          .then(async(res)=>{
              setSubmitButtonDisabled(false);
  
              const user= res.user
              console.log(user)
             navigate("/Home2");
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
                    <h1 className={styles.heading}>Login</h1>
                    <Inputcontrol label='Email' placeholder='Enter your Email Address'
                      onChange={(e)=>
                        setValues((prev)=>({...prev,email:e.target.value}))
                    }
                    />
                    <Inputcontrol label='Password' placeholder='Enter your Password'
                     onChange={(e)=>
                        setValues((prev)=>({...prev,password:e.target.value}))
                    }/>

                    <div className={styles.footer}>
                    <b className={styles.error}>{errormessg}</b>
                        <button onClick={handleSubmission} disabled={submitButtonDisabled}>  {submitButtonDisabled ? 'Submitting...' : 'Login'}</button>
                        <p>Already have an account?{''}
                        <span>
                            <Link to='/signup'>Signup</Link>
                        </span>
                        </p>
                    </div>
                   </div>
                    </div>

    )

}