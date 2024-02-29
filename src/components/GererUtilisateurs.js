import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sign_out, updatePassword } from "../features/Slice";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./GererUtilisateurs.css"

export default function GererUtilisateurs() {

    const user_connecte = useSelector((state) => state.r_reducer.connectedUser)
    const users_data = useSelector((state) => state.r_reducer.users)

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {l} = useParams()
    console.log("params",l)

    const user_selectionne = users_data.find((user) => user.login === l)
    console.log(user_selectionne)
    const [login, setLogin] = useState(l ? l : "")
    const [motdepasse, setMotdepasse] = useState("")
    const [confirmationMotdepasse, setConfirmationMotdepasse] = useState("")

    const rechercher = () => {
      navigate(`/GererUtilisateurs/${login}`)
      setConfirmationMotdepasse("")
    };

    useEffect(() => {
      setMotdepasse(user_selectionne ? user_selectionne.password : "")
    }, [l, users_data])

    const modifier = (event) => {
      event.preventDefault();
      if (motdepasse === confirmationMotdepasse) {
        dispatch(updatePassword({ login, password: motdepasse }))
      } else {
        alert("Confirmer le mot de passe correctement")
      }
    }
    const se_deconnecter = () => {
      dispatch(sign_out())
      navigate("/")
    }
  

  return (
    <div className="container">
        <Link id="home-button" to={`/EspaceAdministrateur/${user_connecte.id}`}>Acceuil</Link>
        <button id="logout-button" onClick={se_deconnecter}>Se déconnecter</button>
        <div>
        <div className="research-container">
          <select className="select-container" value={login} onChange={(event) => setLogin(event.target.value)}>
            {users_data &&
              users_data.map((u) => (
                <option key={u.login} value={u.login}>
                  {u.login}
                </option>
              ))}
          </select>
          <button onClick={rechercher}>Rechercher</button>
          <form onSubmit={modifier}>
            {user_selectionne && (
              <div className="research-result">
                <strong>Mot de passe</strong>
                <input type="text" value={motdepasse} onChange={(event) => setMotdepasse(event.target.value)} />
                <strong>Confirmer le mot de passe</strong>
                <input type="text" value={confirmationMotdepasse} onChange={(event) => setConfirmationMotdepasse(event.target.value)}/>
                <input type="submit" value={"Modifier"} />
              </div>
            )}
          </form>
        </div>
        </div>
    </div>
  );
}

