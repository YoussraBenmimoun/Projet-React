import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { unblock_commentary, sign_out } from "../features/Slice";
import { useEffect } from "react";

export default function CommentairesBloques() {
  const user_connecte = useSelector((state) => state.r_reducer.connectedUser);
  const documents_data = useSelector((state) => state.r_reducer.documents);
  const commentaires_data = useSelector((state) => state.r_reducer.commentaires);

  const dispatch = useDispatch();
  const navigate = useNavigate()

  const commentaires_bloques =
    commentaires_data && commentaires_data.length > 0
      ? commentaires_data.filter((c) => c.etat_commentaire === "2")
      : [];

  const debloquer = (code) => {
    dispatch(unblock_commentary({code}));
  };

  useEffect(() => {
    console.log(commentaires_data);
  }, [debloquer]);

  const se_deconnecter = () => {
    dispatch(sign_out())
    navigate("/")
  }


  return (
    <div>
      <Link id="home-button" to={`/EspaceModerateur/${user_connecte.id}`}>Acceuil</Link>
      <button id="logout-button" onClick={se_deconnecter}>Se déconnecter</button>
      {commentaires_bloques && commentaires_bloques.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Login</th>
              <th>Document</th>
              <th>Date</th>
              <th>Commentaire</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {commentaires_bloques.map((commentaire) => {
              const document = documents_data.find(
                (d) => d.code_document === commentaire.code_document
              );
              const documentNom = document ? document.nom_document : "N/A";
              const dateCommentaire = new Date(commentaire.date_commentaire);
              return (
                <tr key={commentaire.code_commentaire}>
                  <td>{commentaire.code_commentaire}</td>
                  <td>{commentaire.login}</td>
                  <td>{documentNom}</td>
                  <td>{dateCommentaire.toLocaleDateString()}</td>
                  <td>{commentaire.texte_commentaire}</td>
                  <td>
                    <button onClick={() => debloquer(commentaire.code_commentaire)}>
                      Débloquer
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <div>Pas commentaires bloqués</div>
      )}
    </div>
  );
}
