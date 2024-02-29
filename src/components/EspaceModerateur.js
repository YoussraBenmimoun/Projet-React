import {  useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { sign_out } from "../features/Slice";

export default function EspaceModerateur(){

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const se_deconnecter = () => {
        dispatch(sign_out())
        navigate("/")
    };

    const consulter_les_commmentaires = () => {
        navigate("/ConsulterLesCommentaires")
    }
    const consulter_les_commmentaires_bloques = () => {
        navigate("/CommentairesBloques")
    }
    const consulter_les_documents = () => {
        navigate("/ConsulterLesDocumentairesModerateur")
    }
    const consulter_les_documents_bloques = () => {
        navigate("/DocumentsBloquésModerateur")
    }

    const containerStyle = {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }
    
      const linkContainerStyle = {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: "20px", 
      }
    
      const linkStyle = {
        color: "#034d3d",
        backgroundColor: "#ffffff",
        border: "1px solid #034d3d",
        padding: "10px",
        margin: "5px 0",
        textDecoration: "none",
        textAlign: "center",
        width: "500px",
        borderRadius: "5px",
        fontSize: "16px",
      }
    
      const logoutButtonStyle = {
        position: "fixed", 
        top: "10px",
        right: "10px",
        background: "#034d3d",
        color: "#ffffff",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
      }

    return(
        <div style={containerStyle}>
            <button onClick={se_deconnecter} style={logoutButtonStyle}>
                Se déconnecter
            </button>
            <div style={linkContainerStyle}>
                <button style={linkStyle} onClick={consulter_les_commmentaires}>Consulter les commentaires</button>
                <button style={linkStyle} onClick={consulter_les_commmentaires_bloques}>Consulter les commentaires bloqués</button>
                <button style={linkStyle} onClick={consulter_les_documents}>Consulter les documents</button>
                <button style={linkStyle} onClick={consulter_les_documents_bloques}>Consulter les documents bloqués</button>
            </div>
        </div>
    )
}
