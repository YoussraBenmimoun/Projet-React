import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { sign_out } from "../features/Slice";

export default function EspaceAdministrateur() {
    const first_user = useSelector((state) => state.r_reducer.users[0]);
    console.log(first_user);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const se_deconnecter = () => {
        dispatch(sign_out());
        navigate("/");
    };

    const containerStyle = {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    };

    const linkContainerStyle = {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: "20px", 
    };

    const linkStyle = {
        color: "#034d3d",
        backgroundColor: "#ffffff",
        border: "1px solid #034d3d",
        padding: "10px",
        margin: "5px 0",
        textDecoration: "none",
        textAlign: "center",
        width: "200px",
        borderRadius: "5px",
        fontSize: "16px",
    };

    const logoutButtonStyle = {
        position: "fixed", 
        top: "10px",
        right: "10px",
        background: "#034d3d",
        color: "#ffffff",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
    };

  return (
    <div>
      <button onClick={se_deconnecter} style={logoutButtonStyle}>
        Se déconnecter
      </button>
      <div style={linkContainerStyle}>
        <Link to={`/AfficherUtilisateurs/${first_user?.id - 1}`} style={linkStyle}>
          Afficher les utilisateurs
        </Link>
        <Link to={"/GererUtilisateurs/:l"} style={linkStyle}>
          Gérer les utilisateurs
        </Link>
        <Link to={"/GererCommentaires"} style={linkStyle}>
          Gérer les commentaires
        </Link>
      </div>
    </div>
  );
}




