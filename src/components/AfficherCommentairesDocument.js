import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { add_commentary, sign_out } from "../features/Slice";
import { Link } from "react-router-dom";

export default function AfficherCommentairesDocument() {

    const user_connecte = useSelector((state) => state.r_reducer.connectedUser)
    const commentaires_data = useSelector((state) => state.r_reducer.commentaires)
    const {code} = useParams()
    const currentDate = new Date()

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [commentaires, setCommentaires] = useState([])
    const [display,setDisplay] = useState("none")
    const [commentaire, setCommentaire] = useState("")

    const ajouter = () => {
        const newCommentaire = {
        date_commentaire: currentDate.toString(),
        texte_commentaire: commentaire,
        code_document: code,
        login: user_connecte.login,
        }
        dispatch(add_commentary(newCommentaire))
        setCommentaire("")
        // navigate(`/AfficherCommentairesDocument/${code}`)
        setDisplay("block")
    };

    const se_deconnecter = () => {
        dispatch(sign_out())
        navigate(`/`)
    };

    useEffect(() => {
        setCommentaires(commentaires_data.filter((c) => c.code_document == code));
        console.log("Commentaires mis à jour :", commentaires_data)
        
    }, [commentaires_data, code])

  return (
    <div>
        <Link id="home-button" to={`/EspaceMembre/${user_connecte.id}`}>
            Acceuil
        </Link>
        <button id="logout-button" onClick={se_deconnecter}>
            Se déconnecter
        </button>
        {commentaires.length > 0 ? (
            <table>
            <tbody>
                {commentaires.map((c, index) => (
                <tr key={index}>
                    <td>{c.login}</td>
                    <td>{c.texte_commentaire}</td>
                </tr>
                ))}
                <tr>
                <td>Ajouter un commentaire :</td>
                <td>
                    <input type="text" value={commentaire} onChange={(event) => setCommentaire(event.target.value)} />
                </td>
                <td>
                    <button onClick={ajouter}>Ajouter</button>
                </td>
                </tr>
            </tbody>
            </table>
        ) : (
            <div>Aucun commentaire à afficher</div>
        )}
         <div style={{display: `${display}`, fontWeight: "bolder", marginTop: "40px", color: "#034d3d"}} >Commentaire ajouté</div>
    </div>
  );
}


