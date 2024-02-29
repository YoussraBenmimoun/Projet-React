import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { sign_out, unblock_documentary } from "../features/Slice";
import { useEffect } from "react";

export default function DocumentsBloquésModerateur() {

    const user_connecte = useSelector((state) => state.r_reducer.connectedUser);
    const documents_data = useSelector((state) => state.r_reducer.documents);
    

    const dispatch = useDispatch();
    const navigate = useNavigate()

    const documents_bloques =
        documents_data && documents_data.length > 0
        ? documents_data.filter((d) => d.etat_document === "2")
        : [];

    const debloquer = (code) => {
        dispatch(unblock_documentary({code}));
    };

    useEffect(() => {
        console.log(documents_data);
    }, [debloquer]);

    const se_deconnecter = () => {
        dispatch(sign_out())
        navigate("/")
    }


  return (
    <div>
        <Link id="home-button" to={`/EspaceModerateur/${user_connecte.id}`}>Acceuil</Link>
        <button id="logout-button" onClick={se_deconnecter}>Se déconnecter</button>
        {documents_bloques && documents_bloques.length > 0 ? (
            <table>
            <thead>
                <tr>
                    <th>Code</th>
                    <th>Nom du document</th>
                    <th>Thème</th>
                    <th>Login</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {documents_bloques.map((document) => {
                
                return (
                    <tr key={document.code_document}>
                        <td>{document.code_document}</td>
                        <td>{document.nom_document}</td>
                        <td>{document.nom_theme}</td>
                        <td>{document.login}</td>
                    <td>
                        <button onClick={() => debloquer(document.code_document)}>
                        Débloquer
                        </button>
                    </td>
                    </tr>
                );
                })}
            </tbody>
            </table>
        ) : (
            <div>Pas documents bloqués</div>
        )}
    </div>
  );
}
