import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { sign_In } from "../features/Slice";
import "./Connexion.css"; 

export default function Connexion() {
  const users = useSelector((state) => state.r_reducer.users);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const signIn = (e) => {
    e.preventDefault();
    const user = users.find(
      (elem) => elem.login === login && elem.password === password
    );

    if (user) {
      dispatch(sign_In(user));
      switch (user.role) {
        case "administrateur":
          navigate(`/EspaceAdministrateur/${user.id}`);
          break;
        case "modérateur":
          navigate(`/EspaceModerateur/${user.id}`);
          break;
        case "membre":
          navigate(`/EspaceMembre/${user.id}`);
          break;
        default:
          navigate("/");
      }
    } else {
      setError("Identifiants invalides");
    }
  };

  return (
    <div className="connexion-container">
      <h2>Connexion</h2>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={signIn} className="connexion-form">
        <label>Login</label>
        <input type="text" value={login} onChange={(event) => setLogin(event.target.value)} />
        <label>Mot de passe</label>
        <input type="password" value={password}  onChange={(event) => setPassword(event.target.value)}/>
        <input type="submit" value={"Se connecter"} />
      </form>
      <Link to={"/Inscription"} className="inscription-link">
        <a>S'inscrire</a>
      </Link>
    </div>
  );
}

