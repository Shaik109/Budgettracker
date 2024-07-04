
import React from 'react'
import Logout from '../Logout/Logout'
import Budget from '../React Table/React Table';




export default function Home2(){


    const userId = 'DyATNCaQMoMif6DSlOzsF4QdbXw2'; 
    return(
        <div>
              <div>
                <h1>Budget Tracker App</h1>
              <Logout/>
              </div>

              <br/>
               <div>
            <Budget/>
              </div>
              </div>

              )
};