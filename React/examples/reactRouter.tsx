// main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

// App.tsx
import './App.css'
import {Routes, Route} from 'react-router-dom'
import {Navbar, Container, Nav} from 'react-bootstrap'

import HomePage from './pages/HomePage';
import PeoplePage from './pages/PeoplePage';
import NotFound from './pages/NotFound';

/* 
npm create vite@latest my-react-app -- --template react-ts
npm install react-router-dom bootstrap react-bootstrap
cd my-react-app
npm run dev 
import 'bootstrap/dist/css/bootstrap.min.css'; in App or main
*/

function App() {
  return (
    <div>
        <Navbar bg="dark" data-bs-theme="dark" fixed="top">
          <Container>
            <Navbar.Brand href="#home">Navbar</Navbar.Brand>
            <Nav className="me-auto">
              <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#people">People</Nav.Link>
            </Nav>
          </Container>
        </Navbar>


      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/people" element={<PeoplePage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App
