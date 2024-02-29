import { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { sign_out } from "../features/Slice";


export default function ConsulterDocumentsMembre(){

    const user_connecte = useSelector((state) => state.r_reducer.connectedUser)
    const documents_data = useSelector((state) => state.r_reducer.documents)
    
    const [theme,setTheme] = useState("")
    const [documents_a_afficher,setDocuments_a_afficher] = useState([])
    const [afficherThead, setAfficherThead] = useState(false)

    const navigate = useNavigate()
    const dispatch = useDispatch()

    
    const themes_uniques = documents_data.reduce((accumulateur,document) => {
        if (!accumulateur.includes(document.nom_theme)) {
            accumulateur.push(document.nom_theme)
        }
        return accumulateur
    }, [])

    const afficher = () => {
        if (theme !== "") {
            const documents = documents_data.filter((document) => document.nom_theme === theme)
            setDocuments_a_afficher(documents)
        }else{
            setDocuments_a_afficher(documents_data)
        }
        setAfficherThead(true)
    }

    const afficher_commentaires = (code) => {
        navigate(`/AfficherCommentairesDocument/${code}`)
    }

    const se_deconnecter = () => {
        dispatch(sign_out())
        navigate(`/`)
      }

    return (
        <div className="container">
            <Link id="home-button" to={`/EspaceMembre/${user_connecte.id}`} >Acceuil</Link>
            <button id="logout-button" onClick={se_deconnecter}>Se déconnecter</button>
            <div className="commentaries-container">
                <select value={theme} onChange={(event)=>setTheme(event.target.value)}>
                {
                    themes_uniques && themes_uniques.map((theme,index)=> {
                        return (
                            <option key={index} value={theme}>{theme}</option>
                        )
                    })
                }
                </select>
                <button onClick={afficher} >Afficher les documents</button>
                {
                    documents_a_afficher ? 
                    (
                        <table>
                        {
                            afficherThead && 
                            <thead>
                                <tr>
                                    <th>Code du document</th>
                                    <th>Nom du document</th>
                                    <th>Thème</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                        }
                        <tbody>
                            {documents_a_afficher.map((document) => {
                                if (document.etat_document === "1") {
                                    
                                    return (
                                        <tr key={document.code_document}>
                                            <td>{document.code_document}</td>
                                            <td>{document.nom_document}</td>
                                            <td>{document.nom_theme}</td>
                                            <td><button onClick={()=>{afficher_commentaires(document.code_document)}}>Afficher les commentaires</button></td>
                                        </tr>
                                    );
                                }
                                return null; 
                            })}
                        </tbody>
                    </table>
                    ) : 
                    (
                        <div>Aucun document</div>
                    )
                    
                }
            </div>

            

        </div>
    )
}