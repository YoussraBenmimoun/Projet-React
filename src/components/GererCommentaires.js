import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { delete_commentaries, sign_out } from "../features/Slice";
import "./GererCommentaires.css"

export default function GererCommentaires() {

    const user_connecte = useSelector((state) => state.r_reducer.connectedUser)
    const commentaires_data = useSelector((state) => state.r_reducer.commentaires)
    const users_data = useSelector((state) => state.r_reducer.users)
    const documents_data = useSelector((state) => state.r_reducer.documents)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const users_membre = users_data.filter((user) => user.role === "membre");

    const [login, setLogin] = useState("")
    const [commentaires_membre_selectionne, setCommentaires_membre_selectionne] = useState([]);
    const [commentaires_des_membres, setCommentaires_des_membres] = useState([])
    const [commentaires_a_supprimer,setCommentaires_a_supprimer] = useState([])

    const afficher = () => {
        let commentaires_des_membres_temp = []

        if (login !== "") {
        const commentaires = commentaires_data.filter(
            (commetaire) => commetaire.login === login
        );
        setCommentaires_membre_selectionne(commentaires)
        } else {
        commentaires_data.forEach((commentaire) => {
            const membre = users_data.find(
            (user) =>
                user.login === commentaire.login && user.role === "membre"
            );
            if (membre) {
            commentaires_des_membres_temp.push(commentaire)
            }
        });
        setCommentaires_membre_selectionne([])
        }

        setCommentaires_des_membres(commentaires_des_membres_temp)
        console.log(commentaires_des_membres_temp)
    }

      const checkbox_selection = (event) => {
        const id = event.target.value;
        const checkbox_selected = commentaires_data.find((c)=> c.code_commentaire === id)
    
        if (commentaires_a_supprimer.includes(checkbox_selected)) {
            setCommentaires_a_supprimer(commentaires_a_supprimer.filter((c) => c !== checkbox_selected))
        } else {
            setCommentaires_a_supprimer([...commentaires_a_supprimer, {...checkbox_selected, date_commentaire: checkbox_selected.date_commentaire.toString()}])
        }
    }
    
    const supprimer = () => {
      dispatch(delete_commentaries({ commentaires: commentaires_a_supprimer }));
      
      const updatedCommentairesMembres = commentaires_des_membres.filter(commentaire =>
          !commentaires_a_supprimer.some(c => c.code_commentaire === commentaire.code_commentaire)
      )

      const updatedCommentairesMembreSelectionne = commentaires_membre_selectionne.filter(commentaire =>
          !commentaires_a_supprimer.some(c => c.code_commentaire === commentaire.code_commentaire)
      )

      setCommentaires_des_membres(updatedCommentairesMembres)
      setCommentaires_membre_selectionne(updatedCommentairesMembreSelectionne)
  }

    const se_deconnecter = () => {
      dispatch(sign_out())
      navigate("/")
    }



  return (
    <div className="container">
      <Link id="home-button" to={`/EspaceAdministrateur/${user_connecte.id}`}>Acceuil</Link>
      <button id="logout-button" onClick={se_deconnecter}>Se déconnecter</button>
      <div className="commentaries-container">
        <h2>Gérer les commentaires</h2>
        <select
          value={login}
          onChange={(event) => {
            setLogin(event.target.value);
          }}
        >
          {users_membre.length > 0 &&
            users_membre.map((membre) => {
              return (
                <option key={membre.id} value={membre.login}>
                  {membre.login}
                </option>
              );
            })}
        </select>
        <button onClick={afficher}>Afficher les commentaires</button>

        {(commentaires_membre_selectionne.length > 0 ||
          commentaires_des_membres.length > 0) && (
          <table>
            <thead>
              <tr>
                  <th></th>   
                  <th>Code</th>
                  <th>Login</th>
                  <th>Date du commentaire</th>
                  <th>Texte du commentaire</th>
                  <th>Etat</th>
                  <th>Document</th>
                  </tr>
            </thead>

            <tbody>
              {commentaires_membre_selectionne.length > 0
                ? commentaires_membre_selectionne.map((commentaire) => {
                    const document = documents_data.find(
                      (d) => d.code_document === commentaire.code_document
                    )
                    const documentNom = document ? document.nom_document : "N/A";
                    return (
                      <tr key={commentaire.code_commentaire}>
                          <td><input type="checkbox" value={commentaire.code_commentaire} onChange={checkbox_selection} /></td>
                          <td>{commentaire.code_commentaire}</td>
                          <td>{commentaire.login}</td>
                          <td>
                              {commentaire.date_commentaire.toLocaleString()}
                          </td>
                          <td>{commentaire.texte_commentaire}</td>
                          <td>{commentaire.etat_commentaire}</td>
                          <td>{documentNom}</td>
                      </tr>
                    )
                  })
                : commentaires_des_membres.map((commentaire) => {
                    const document = documents_data.find(
                      (d) => d.code_document === commentaire.code_document
                    )
                    const documentNom = document ? document.nom_document : "N/A";
                    return (
                      <tr key={commentaire.code_commentaire}>
                          <td><input type="checkbox" value={commentaire.code_commentaire} onChange={checkbox_selection} /></td>
                          <td>{commentaire.code_commentaire}</td>
                          <td>{commentaire.login}</td>
                          <td>
                              {commentaire.date_commentaire.toLocaleString()}
                          </td>
                          <td>{commentaire.texte_commentaire}</td>
                          <td>{commentaire.etat_commentaire}</td>
                          <td>{documentNom}</td>
                      </tr>
                    )
                  })}
            </tbody>
          </table>
        )}
        <button id="supprimer" onClick={supprimer}>Supprimer</button>
      </div>
    </div>
  );
}


