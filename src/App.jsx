
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container, Navbar, Nav, Button } from 'react-bootstrap';
import MemeEditor from './components/MemeEditor';
import TemplateGallery from './components/TemplateGallery';
import HelpModal from './components/HelpModal';
import './App.css';

function App() {
  const [showHelp, setShowHelp] = useState(false);

  return (
    <Router>
      <div className="App">
        <Navbar bg="dark" variant="dark" expand="lg" className="mb-4">
          <Container>
            <Navbar.Brand href="/" className="fw-bold">
              🎭 Meme Generator
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ms-auto">
                <Nav.Link href="/">Create Meme</Nav.Link>
                <Nav.Link href="/templates">Templates</Nav.Link>
                <Button 
                  variant="outline-light" 
                  size="sm" 
                  className="ms-2"
                  onClick={() => setShowHelp(true)}
                >
                  ❓ Help
                </Button>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>

        <Container>
          <Routes>
            <Route path="/" element={<MemeEditor />} />
            <Route path="/templates" element={<TemplateGallery />} />
          </Routes>
        </Container>

        <HelpModal show={showHelp} onHide={() => setShowHelp(false)} />
      </div>
    </Router>
  );
}

export default App;
