import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Connexion from './components/Connexion';
import Inscription from './components/Inscription';
import EspaceMembre from './components/EspaceMembre';
import ConsulterLesCommentaires from './components/ConsulterLesCommentaires';
import EspaceModerateur from './components/EspaceModerateur';
import CommentairesBloques from './components/CommentairesBloques';
import EspaceAdministrateur from './components/EspaceAdministrateur';
import AfficherUtilisateurs from './components/AfficherUtilisateurs';
import GererUtilisateurs from './components/GererUtilisateurs';
import GererCommentaires from './components/GererCommentaires';
import ConsulterDocumentsMembre from './components/ConsulterDocumentsMembre';
import ConsulterCommentairesMembre from './components/ConsulterCommentairesMembre';
import ConsulterLesDocumentairesModerateur from './components/ConsulterLesDocumentairesModerateur';
import DocumentsBloquésModerateur from './components/DocumentsBloquésModerateur';
import PublierDocument from './components/PublierDocument';
import AfficherCommentairesDocument from './components/AfficherCommentairesDocument';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path='/' element={<Connexion/>} />
          <Route path='/Inscription' element={<Inscription/>} />
          <Route path='/EspaceMembre/:id' element={<EspaceMembre/>} />
          <Route path='/ConsulterLesCommentaires' element={<ConsulterLesCommentaires/>} />
          <Route path='/EspaceModerateur/:id' element={<EspaceModerateur/>} />
          <Route path='/CommentairesBloques' element={<CommentairesBloques/>} />
          <Route path='/EspaceAdministrateur/:id' element={<EspaceAdministrateur/>} />
          <Route path='/AfficherUtilisateurs/:id' element={<AfficherUtilisateurs/>} />
          <Route path='/GererUtilisateurs/:l' element={<GererUtilisateurs/>} />
          <Route path='/GererCommentaires' element={<GererCommentaires/>} />
          <Route path='/ConsulterDocumentsMembre' element={<ConsulterDocumentsMembre/>} />
          <Route path='/ConsulterCommentairesMembre' element={<ConsulterCommentairesMembre/>} />
          <Route path='/ConsulterLesDocumentairesModerateur' element={<ConsulterLesDocumentairesModerateur/>} />
          <Route path='/DocumentsBloquésModerateur' element={<DocumentsBloquésModerateur/>} />
          <Route path='/PublierDocument' element={<PublierDocument/>} /> 
          <Route path='/AfficherCommentairesDocument/:code' element={<AfficherCommentairesDocument/>} /> 
        </Routes>
      </div>
    </Router>
  );
}

export default App;
