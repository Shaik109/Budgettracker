import React from 'react'
import styles from  './Inputcontrol.module.css'
export default function Inputcontrol(props){

    return(
        <div className={styles.Container}>
            {props.label && <label>{props.label}</label>}
            <input type='text' {...props}/>    
        </div>
    )
}