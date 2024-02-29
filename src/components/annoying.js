import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function ConsulterCommentairesMembre() {
  const user_connecte = useSelector((state) => state.r_reducer.connectedUser);
  const commentaires_data = useSelector((state) => state.r_reducer.commentaires);
  const documents_data = useSelector((state) => state.r_reducer.documents);
  const [commentaires_a_afficher, setCommentaires_a_afficher] = useState([]);

  const [fitrer_par_utilisateur, setFitrer_par_utilisateur] = useState("");
  const [filter_par_theme, setFilter_par_theme] = useState("");
  const [filtrer_par_nom_document, setFiltrer_par_nom_document] = useState("");

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
    if (
      fitrer_par_utilisateur !== "" &&
      filter_par_theme === "" &&
      filtrer_par_nom_document === ""
    ) {
      const commentaires_filtres_par_utilisateur = commentaires_data.filter(
        (c) => c.login === fitrer_par_utilisateur
      );
      setCommentaires_a_afficher(commentaires_filtres_par_utilisateur);
    } else if (
      fitrer_par_utilisateur === "" &&
      filter_par_theme !== "" &&
      filtrer_par_nom_document === ""
    ) {
      let commentaires_filtrers_par_theme = [];
      const documents_filtres_par_theme = documents_data.filter(
        (d) => d.nom_theme === filter_par_theme
      );
      const codes = documents_filtres_par_theme.map((d) => d.code_document);
      if (codes.length > 0) {
        codes.forEach((code) => {
          commentaires_filtrers_par_theme = commentaires_data.filter(
            (c) => c.code_document === code
          );
        });
        setCommentaires_a_afficher(commentaires_filtrers_par_theme);
      }
    } else if (
      fitrer_par_utilisateur === "" &&
      filter_par_theme === "" &&
      filtrer_par_nom_document !== ""
    ) {
      let commentaires_filtrers_par_nom_document = [];
      const documents_filtres_par_nom_document = documents_data.filter(
        (d) => d.nom_document === filtrer_par_nom_document
      );
      const codes = documents_filtres_par_nom_document.map(
        (d) => d.code_document
      );
      if (codes.length > 0) {
        codes.forEach((code) => {
          commentaires_filtrers_par_nom_document = commentaires_data.filter(
            (c) => c.code_document === code
          );
        });
        setCommentaires_a_afficher(commentaires_filtrers_par_nom_document);
      }
    } else if (
        fitrer_par_utilisateur !== "" &&
        filter_par_theme !== "" &&
        filtrer_par_nom_document === ""
    ) {
        let commentaires_filtres = [];
        const documents_filtres_par_theme = documents_data.filter(
        (d) => d.nom_theme === filter_par_theme
        );
        const codes = documents_filtres_par_theme.map((d) => d.code_document);
        if (codes.length > 0) {
        codes.forEach((code) => {
            commentaires_filtres = commentaires_data.filter(
            (c) => c.code_document === code && c.login === fitrer_par_utilisateur
          );
        });
        setCommentaires_a_afficher(commentaires_filtres);
      }
    }
    else if (
        fitrer_par_utilisateur !== "" &&
        filter_par_theme === "" &&
        filtrer_par_nom_document !== ""
    ) {
        let commentaires_filtres = [];
        const documents_filtres_par_nom_document = documents_data.filter(
        (d) => d.nom_document === filtrer_par_nom_document
        );
        const codes = documents_filtres_par_nom_document.map(
        (d) => d.code_document
        );
        if (codes.length > 0) {
        codes.forEach((code) => {
            commentaires_filtres = commentaires_data.filter(
            (c) => c.code_document === code && c.login === fitrer_par_utilisateur
          );
        });
        setCommentaires_a_afficher(commentaires_filtres);
      }
    } 
    // else if (
    //     fitrer_par_utilisateur !== "" &&
    //     filter_par_theme !== "" &&
    //     filtrer_par_nom_document !== ""
    // ) {
    //     let commentaires_filtres = [];
    //     const documents_filtres_par_theme = documents_data.filter(
    //     (d) => d.nom_theme === filter_par_theme
    //     );
    //     const codes1 = documents_filtres_par_theme.map((d) => d.code_document);
    //     const documents_filtres_par_nom_document = documents_data.filter(
    //         (d) => d.nom_document === filtrer_par_nom_document
    //         );
    //     const codes2 = documents_filtres_par_nom_document.map(
    //         (d) => d.code_document
    //         );
    //     const codes = codes1.filter((value)=>codes2.includes(value))
    //     if (codes.length > 0) {
    //         codes.forEach((code) => {
    //             commentaires_filtres = commentaires_data.filter(
    //             (c) => c.code_document === code && c.login === fitrer_par_utilisateur
    //           );
    //         });
    //         setCommentaires_a_afficher(commentaires_filtres);
    //       }

    // }
    else if (
        fitrer_par_utilisateur !== "" &&
        filter_par_theme !== "" &&
        filtrer_par_nom_document !== ""
      ) {
        const documents_filtres = documents_data.filter(
          (document) =>
            document.nom_theme === filter_par_theme &&
            document.nom_document === filtrer_par_nom_document
        );
      
        const commentaires_filtres = commentaires_data.filter((commentaire) =>
          documents_filtres.some(
            (document) =>
              document.code_document === commentaire.code_document &&
              commentaire.login === fitrer_par_utilisateur
          )
        );
      
        setCommentaires_a_afficher(commentaires_filtres);
      }
      
      
      
      

  }

  const annuler_le_filtre = () => {
    setFitrer_par_utilisateur("")
    setFilter_par_theme("")
    setFiltrer_par_nom_document("")
    setCommentaires_a_afficher([])
  }

  return (
    <div>
      <Link to={`/EspaceMembre/${user_connecte.id}`}>Accueil</Link>
      <select
        value={fitrer_par_utilisateur}
        onChange={(event) => {
          setFitrer_par_utilisateur(event.target.value);
        }}
      >
        {utilisateurs_uniques &&
          utilisateurs_uniques.length > 0 &&
          utilisateurs_uniques.map((utilisateur, index) => {
            return (
              <option key={index} value={utilisateur}>
                {utilisateur}
              </option>
            );
          })}
      </select>
      <select
        value={filter_par_theme}
        onChange={(event) => {
          setFilter_par_theme(event.target.value);
        }}
      >
        {themes_uniques &&
          themes_uniques.length > 0 &&
          themes_uniques.map((theme, index) => {
            return (
              <option key={index} value={theme}>
                {theme}
              </option>
            );
          })}
      </select>
      <select
        value={filtrer_par_nom_document}
        onChange={(event) => {
          setFiltrer_par_nom_document(event.target.value);
        }}
      >
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
      <button onClick={filtrer}>Filtrer</button>
      <button onClick={annuler_le_filtre}>Annuler le fitre </button>
      {commentaires_a_afficher && commentaires_a_afficher.length > 0 ? (
        <table>
          <tbody>
            {commentaires_a_afficher.map((commentaire) => (
              <tr key={commentaire.code_commentaire}>
                <td>{commentaire.code_commentaire}</td>
                <td>{commentaire.texte_commentaire}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div>Aucun commentaire à afficher</div>
      )}
    </div>
  );
}