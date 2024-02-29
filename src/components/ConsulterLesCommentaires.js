import { useDispatch, useSelector } from "react-redux"
import { block_commentary, sign_out } from "../features/Slice"
import { useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"

export default function ConsulterLesCommentaires(){

    const commentaires_data = useSelector(state=>state.r_reducer.commentaires)
    const documents_data = useSelector(state=>state.r_reducer.documents)
    const user_connecte= useSelector(state=>state.r_reducer.connectedUser)
    
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const bloquer = (code) => {
        dispatch(block_commentary({code}))
        
    }

    useEffect(()=>{
        console.log(commentaires_data)
    }
    ,[bloquer])

    const se_deconnecter = () => {
      dispatch(sign_out())
      navigate("/")
    }

    return (
        <div>
          <Link id="home-button" to={`/EspaceModerateur/${user_connecte.id}`}>Acceuil</Link>
          <button id="logout-button" onClick={se_deconnecter}>Se déconnecter</button>
        
          {commentaires_data && commentaires_data.length > 0 ? (
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
                {[...commentaires_data]
                  .sort((a, b) => b.date_commentaire - a.date_commentaire)
                  .map((commentaire) => {
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
                          {commentaire.etat_commentaire === "1" ?
                        (
                          <button id="supprimer" onClick={() => bloquer(commentaire.code_commentaire)}>
                          Bloquer
                          </button>
                        )  
                        :
                        (
                        <p>Bloqué</p>
                        )
                        }
                          
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          ) : (
            <div>Aucun commentaire</div>
          )}
        </div>
      );
      
}
