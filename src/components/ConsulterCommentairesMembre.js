import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { sign_out } from "../features/Slice";

export default function ConsulterCommentairesMembre() {

    const user_connecte = useSelector((state) => state.r_reducer.connectedUser);
    const commentaires_data = useSelector((state) => state.r_reducer.commentaires);
    const documents_data = useSelector((state) => state.r_reducer.documents);

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [commentaires_a_afficher, setCommentaires_a_afficher] = useState([]);

    const [fitrer_par_utilisateur, setFitrer_par_utilisateur] = useState("");
    const [filter_par_theme, setFilter_par_theme] = useState("");
    const [filtrer_par_nom_document, setFiltrer_par_nom_document] = useState("");
    const [afficherThead, setAfficherThead] = useState(false)

    const utilisateurs_uniques = commentaires_data.reduce(
      (accumulateur, commentaire) => {
        if (!accumulateur.includes(commentaire.login)) {
          accumulateur.push(commentaire.login);
        }
        return accumulateur;
      },
      []
    );

    const themes_uniques = documents_data.reduce(
      (accumulateur, document) => {
        if (!accumulateur.includes(document.nom_theme)) {
          accumulateur.push(document.nom_theme);
        }
        return accumulateur;
      },
      []
    );

    const noms_documents_uniques = documents_data.reduce(
      (accumulateur, document) => {
        if (!accumulateur.includes(document.nom_document)) {
          accumulateur.push(document.nom_document);
        }
        return accumulateur;
      },
      []
    );

    const filtrer = () => {
      let commentaires_filtres = commentaires_data;

      const filtres = [
        {
          critere: fitrer_par_utilisateur,
          condition: (c) => c.login === fitrer_par_utilisateur,
        },
        {
          critere: filter_par_theme,
          condition: (c) =>
            documents_data
              .filter((d) => d.nom_theme === filter_par_theme)
              .map((d) => d.code_document)
              .includes(c.code_document),
        },
        {
          critere: filtrer_par_nom_document,
          condition: (c) =>
            documents_data
              .filter((d) => d.nom_document === filtrer_par_nom_document)
              .map((d) => d.code_document)
              .includes(c.code_document),
        },
      ];

      filtres.forEach((filtre) => {
        if (filtre.critere !== "") {
          commentaires_filtres = commentaires_filtres.filter(filtre.condition);
        }
      });
      setAfficherThead(true)
      setCommentaires_a_afficher(commentaires_filtres);
    };

    const annuler_le_filtre = () => {
      setFitrer_par_utilisateur("");
      setFilter_par_theme("");
      setFiltrer_par_nom_document("");
      setCommentaires_a_afficher([]);
    };

    const se_deconnecter = () => {
      dispatch(sign_out())
      navigate("/")
    }

  return (
    <div className="container">
        <Link id="home-button" to={`/EspaceMembre/${user_connecte.id}`} >Acceuil</Link>
        <button id="logout-button" onClick={se_deconnecter}>Se déconnecter</button>
        <div className="commentaries-container">
          <div>
          <select value={fitrer_par_utilisateur} onChange={(event) => { setFitrer_par_utilisateur(event.target.value)}}>
            {utilisateurs_uniques &&
              utilisateurs_uniques.length > 0 &&
              utilisateurs_uniques.map((utilisateur, index) => {
                return (
                  <option key={index} value={utilisateur}>
                    {utilisateur}
                  </option>
                )
              })}
          </select>
          <select value={filter_par_theme} onChange={(event) => {setFilter_par_theme(event.target.value)}}>
            {themes_uniques &&
              themes_uniques.length > 0 &&
              themes_uniques.map((theme, index) => {
                return (
                  <option key={index} value={theme}>
                    {theme}
                  </option>
                )
              })}
          </select>
          <select value={filtrer_par_nom_document} onChange={(event) => {setFiltrer_par_nom_document(event.target.value)}}>
            {noms_documents_uniques &&
              noms_documents_uniques.length > 0 &&
              noms_documents_uniques.map((nom, index) => {
                return (
                  <option key={index} value={nom}>
                    {nom}
                  </option>
                );
              })}
          </select>
          <button id="filtrer" onClick={filtrer}>Filtrer</button>
          <button id="filtrer" onClick={annuler_le_filtre}>Annuler le filtre </button>
          </div>
          
          {commentaires_a_afficher && commentaires_a_afficher.length > 0 ? (
          <table>
            {afficherThead && <thead>
              <tr>
                <th>Code</th>
                <th>Login</th>
                <th>Texte</th>
                <th>Document</th>
              </tr>
            </thead>}
            <tbody>
              {commentaires_a_afficher.map((commentaire) => {
                const document = documents_data.find(
                  (d) => d.code_document === commentaire.code_document
                );

                return (
                  <tr key={commentaire.code_commentaire}>
                    <td>{commentaire.code_commentaire}</td>
                    <td>{commentaire.login}</td>
                    <td>{commentaire.texte_commentaire}</td>
                    <td>{document ? document.nom_document : ""}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <div></div>
        )}

        </div>
    </div>
  );
}


