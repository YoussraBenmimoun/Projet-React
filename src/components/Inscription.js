import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { AddUser, sign_In } from "../features/Slice"
import { Link, useNavigate } from "react-router-dom"

export default function Inscription(){

    const users_data = useSelector(state=>state.r_reducer.users)
    
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [login,setLogin] = useState("")
    const [name,setName] = useState("")
    const [password,setPassword] = useState("")
    const [confirmpassword,setConfirmPassword] = useState("")
    const [error, setError] = useState("")

    

    const user = users_data.find((u)=>u.login === login)

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!login || !name || !password || !confirmpassword) {
          setError("Tous les champs sont obligatoires")
          return
        }
        if (user) {
          setError("Le login est déjà utilisé")
          return
        }
        if (password !== confirmpassword) {
          setError("Les mots de passe ne correspondent pas")
          return
        }
    
        
        const id = Number(users_data[users_data.length - 1].id) + 1
        const new_user = { id, name, login, password, role: "membre" }
        dispatch(AddUser(new_user))
        dispatch(sign_In(new_user))
        navigate(`/EspaceMembre/${id}`)
      };

    const annuler = () => {
        setLogin("")
        setName("")
        setPassword("")
        setConfirmPassword("")
    }
    const retour = () => {
      navigate("/")
    }

    return(
        <div>
            <Link to={"/"} className="connexion-page-link">
              <a>Retour</a>
            </Link>
            <div className="container">
              <div >
                {error && <div style={{ color: "red" }}>{error}</div>}
                <form onSubmit={handleSubmit} className="research-result">
                    <strong>Login</strong>
                    <input type="text" value={login} onChange={(event)=>{setLogin(event.target.value)}}/>
                    
                    <strong>Name</strong>
                    <input type="text" value={name} onChange={(event)=>{setName(event.target.value)}}/>

                    <strong>Password</strong>
                    <input type="password" value={password} onChange={(event)=>{setPassword(event.target.value)}}/>

                    <strong>Confirm Password</strong>
                    <input type="password" value={confirmpassword} onChange={(event)=>{setConfirmPassword(event.target.value)}}/>
                    
                    <div>
                      <input style={{marginRight: "10px"}} type="submit" value={"Sign Up"}/>
                      <button type="reset" onClick={annuler}>Annuler</button>
                    </div>
                </form>
              </div>
            </div>
        </div>
    )
}