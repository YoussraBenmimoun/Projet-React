import { useState } from "react"
import { useDispatch } from "react-redux"
import { publish_document, sign_out } from "../features/Slice"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"


export default function PublierDocument(){

    const user_connecte= useSelector(state=>state.r_reducer.connectedUser)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [nomDocument,setNomDocument] = useState("")
    const [themeDocument,setThemeDocument] = useState("")
    const [display,setDisplay] = useState("none")
    

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(publish_document({
            nom_document : nomDocument,
            nom_theme : themeDocument,
            login : user_connecte.login
        }))
        setNomDocument("")
        setThemeDocument("")
        setDisplay("block")

    }

    const se_deconnecter = () => {
        dispatch(sign_out())
        navigate("/")
      }
  
    return (
        <div className="container">
            <Link id="home-button" to={`/EspaceMembre/${user_connecte.id}`}>Acceuil</Link>
            <button id="logout-button" onClick={se_deconnecter}>Se déconnecter</button>
            <div className="research-result">
                <h3 style={{marginBottom : "120px", textDecoration: "underline"}}>Publier un document</h3>
                <form onSubmit={handleSubmit}>
                    <strong>Nom du document</strong>
                    <input type="text" value={nomDocument} onChange={(event)=>{setNomDocument(event.target.value)}}/>
                    <strong>Thème du document</strong>
                    <input type="text" value={themeDocument} onChange={(event)=>{setThemeDocument(event.target.value)}}/>
                    <input type="submit" value={"Publier"}/>
                </form>
            </div>
            <div style={{display: `${display}`, fontWeight: "bolder", marginTop: "40px", color: "#034d3d"}} >Document ajouté</div>
        </div>
    )
}