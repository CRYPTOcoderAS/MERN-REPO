import React,{useState,useContext} from 'react'
import { Link,useHistory} from 'react-router-dom'
import { UserContext} from '../../App'
import M from 'materialize-css'

const SignIn=()=>{
    const {state,dispatch}= useContext(UserContext)
    const history=useHistory()

    const [password,setPassword]=useState("")
    const [email,setEmail]=useState("")
    const PostData = () => {
        fetch("/signin",{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
               
                password,
                email
                
            })
        }).then(res=>res.json())
        .then(data=>{
            console.log(data)
           if(data.error){
              M.toast({html: data.error,classes:"#c62828 red darken-3"})
           }
           else{
               localStorage.setItem("jwt",data.token)
               localStorage.setItem("user",JSON.stringify(data.user))
               dispatch({type:"USER",payload:data.user})
               M.toast({html:"signing successful",classes:"#43a047 green darken-1"})
               history.push('/')
            }
        })

    }
    return (
        
        <div className="mycard">
             <div className="card auth-card ">

                 <h2> 
                     VOCAL-LOCAL
                 </h2>
                 <input
                 type="text"
                 placeholder="email"
                 value={email}
                 onChange={(e)=> setEmail(e.target.value)}
                 />       
                 <input
                 type="password"
                 placeholder="password"
                 value={password}
                 onChange={(e)=> setPassword(e.target.value)}
                 />

                 <button className="btn waves-effect waves-light "
                 onClick={()=>PostData()}
                 >Login</button>
                 <h5>
                  <Link to="/signup">Register New Account</Link>
                   </h5>   
                 
      </div>
        </div>
    )
}


export default SignIn