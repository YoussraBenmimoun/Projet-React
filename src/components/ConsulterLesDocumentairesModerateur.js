import { useDispatch, useSelector } from "react-redux"
import { block_documentary, sign_out } from "../features/Slice"
import { useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"

export default function ConsulterLesDocumentairesModerateur(){

    
    const documents_data = useSelector(state=>state.r_reducer.documents)
    const user_connecte= useSelector(state=>state.r_reducer.connectedUser)
    
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const bloquer = (code) => {
        dispatch(block_documentary({code}))
        
    }

    useEffect(()=>{
        console.log(documents_data)
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
        
          {documents_data && documents_data.length > 0 ? (
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
                {documents_data
                  .map((document) => {
                    return (
                      <tr key={document.code_document}>
                        <td>{document.code_document}</td>
                        <td>{document.nom_document}</td>
                        <td>{document.nom_theme}</td>
                        <td>{document.login}</td>
                        <td>
                          {document.etat_document === "1" ?
                        (
                          <button id="supprimer" onClick={() => bloquer(document.code_document)}>
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
            <div>Aucun document</div>
          )}
        </div>
      );
      
}
