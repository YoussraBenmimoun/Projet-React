import { createSlice } from "@reduxjs/toolkit";
import { initialStateValue } from "./data";


const Slice = createSlice({
  name: "r_reducer",
  initialState: initialStateValue,
  reducers: {
    AddUser: (state, action) => {
      state.users.push(action.payload);
    },
    sign_In: (state, action) => {
      state.connectedUser = action.payload;
    },
    block_commentary: (state,action) => {
      state.commentaires = state.commentaires.map((c)=>
        c.code_commentaire === action.payload.code ?
        {...c,etat_commentaire:"2",  date_commentaire: c.date_commentaire.toString()}
        : c

      )
    },
    unblock_commentary: (state,action) => {
      state.commentaires = state.commentaires.map((c)=>
      c.code_commentaire === action.payload.code ?
      {...c,etat_commentaire:"1", date_commentaire: c.date_commentaire.toString()}
      : c
      )
    },
    updateRole: (state,action) => {
      state.users = state.users.map((u)=>
      u.id === action.payload.id ?
      {...u, role: action.payload.role}
      : u
      )
    },
    deleteUser: (state,action) => {
      state.users = state.users.filter((u)=> u.id !== action.payload.id)
    },
    updatePassword: (state,action) => {
      state.users = state.users.map((u)=>
        u.login === action.payload.login ?
        {...u,password: action.payload.password} 
        : u
      )
    },
    delete_commentaries: (state, action) => {
      const commentaires_a_supprimer = action.payload.commentaires
      state.commentaires = state.commentaires.filter((commentaire) => {
        return !commentaires_a_supprimer.some((c) => c.code_commentaire === commentaire.code_commentaire);
      });
    
      state.commentaires.forEach((commentaire) => {
        commentaire.date_commentaire = commentaire.date_commentaire.toString();
      });
    },
    sign_out: (state) => {
      state.connectedUser = null
    },
    block_documentary: (state,action) => {
        state.documents = state.documents.map((c)=>
        c.code_document === action.payload.code ?
        {...c,etat_document:"2"}
        : c

      )
    },
    unblock_documentary: (state,action) => {
      state.documents = state.documents.map((c)=>
      c.code_document === action.payload.code ?
      {...c,etat_document:"1"}
      : c
      )
    },
    publish_document: (state,action) => {
      const document = {
        code_document : Number(state.documents[state.documents.length-1].code_document)+1,
        nom_document : action.payload.nom_document,
        etat_document : "1",
        nom_theme: action.payload.nom_theme,
        login : action.payload.login
      }
      state.documents.push(document)
    },
    add_commentary: (state,action) => {
      const commentaire = {
        code_commentaire :Number(state.commentaires[state.commentaires.length-1].code_commentaire)+1,
        date_commentaire : action.payload.date_commentaire.toString(),
        texte_commentaire : action.payload.texte_commentaire,
        etat_commentaire: "1",
        code_document: action.payload.code,
        login: action.payload.login,

      }
      state.commentaires.push(commentaire)
      
    }
            
  },

});

export default Slice.reducer;
export const { AddUser, sign_In, block_commentary, unblock_commentary, updateRole, deleteUser, updatePassword,
   delete_commentaries, sign_out, block_documentary,unblock_documentary, publish_document, add_commentary } = Slice.actions;
