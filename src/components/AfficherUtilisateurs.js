import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { deleteUser, updateRole, sign_out } from "../features/Slice"
import { Link, useNavigate, useParams } from "react-router-dom"
import "./AfficherUtilisateurs.css"

export default function AfficherUtilisateurs(){

    const user_connecte = useSelector((state) => state.r_reducer.connectedUser);
    const users_data = useSelector(state=>state.r_reducer.users)

    const dispatch = useDispatch()
    const navigate = useNavigate()
    
    const i = useParams()
    console.log("params : ",i)

    const [currentIndex,setCurrentIndex] = useState(i.id)
    const [newRole,setNewRole] = useState("") 

    const currentUser = users_data[currentIndex]

    const modifier = (id) => {
        dispatch(updateRole({id: id, role: newRole}))
    }   

    const Supprimer = (id) => {
        dispatch(deleteUser({id}))
    }
    
    const naviguer = (destination) => {
        if(destination === "premier"){
            setCurrentIndex(0)
            navigate("/AfficherUtilisateurs/0")
        }else if(destination === "précédent"){
            if(currentIndex > 0){
                setCurrentIndex(Number(currentIndex)-1)
                navigate(`/AfficherUtilisateurs/${currentIndex-1}`)
            }
        }else if(destination === "suivant"){
            if (currentIndex < users_data.length-1){
                setCurrentIndex(Number(currentIndex)+1)
                navigate(`/AfficherUtilisateurs/${Number(currentIndex)+1}`)
            }
        }else if(destination === "dernier"){
            setCurrentIndex(users_data.length-1)
            navigate(`/AfficherUtilisateurs/${users_data.length-1}`)
        }

    }
    const se_deconnecter = () => {
        dispatch(sign_out());
        navigate("/");
      };

    return (
        <div className="container">
            <button id="logout-button" onClick={se_deconnecter}>
                Se déconnecter
            </button>
            <Link id="home-button" to={`/EspaceAdministrateur/${user_connecte.id}`} >Acceuil</Link>
            <div className="user-details">
            {users_data.length > 0 ?
            (
                <div>
                    <div className="user-details">
                        <h5>{currentUser.id}</h5>
                        <strong>{currentUser.login}</strong>
                        <select value={currentUser.role} onChange={(event)=>setNewRole(event.target.value)}>
                            <option value={"membre"}>Membre</option>
                            <option value={"modérateur"}>Modérateur</option>
                            <option value={"administrateur"}>Administrateur</option>
                        </select>
                        <button onClick={()=>{modifier(currentUser.id)}}>Modifier le rôle</button>
                        <button onClick={()=>{Supprimer(currentUser.id)}}>Supprimer</button>
                    </div>
                    <div className="small-buttons-container">
                        <button onClick={()=>{naviguer("premier")}}>Premier</button>
                        <button onClick={()=>{naviguer("précédent")}}>Précédent</button>
                        <button onClick={()=>{naviguer("suivant")}}>Suivant</button>
                        <button onClick={()=>{naviguer("dernier")}}>Dernier</button>
                    </div>
                </div>
            )
            : 
            (
               <div className="Default">Pas d'utilisateurs</div> 
            )
                
                
            }
            </div>
        </div>
    )
}