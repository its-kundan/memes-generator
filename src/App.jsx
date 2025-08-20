
import React, { useState } from 'react';
import { Container, Navbar, Button, Modal } from 'react-bootstrap';
import SimpleMemeEditor from './components/SimpleMemeEditor';
import './App.css';

function App() {
  const [showHelp, setShowHelp] = useState(false);

  return (
    <div className="App">
      <Navbar bg="dark" variant="dark" expand="lg" className="mb-4">
        <Container>
          <Navbar.Brand className="fw-bold">
            🎭 Meme Generator
          </Navbar.Brand>
          <div className="ms-auto d-flex align-items-center">
            <Button 
              variant="outline-light" 
              size="sm"
              className="me-2"
              onClick={() => setShowHelp(true)}
            >
              ❓ Help
            </Button>
            <Button 
              variant="outline-light" 
              size="sm"
              onClick={() => window.open('https://github.com/its-kundan/memes-generator', '_blank')}
              title="View on GitHub"
            >
              📁 GitHub
            </Button>
          </div>
        </Container>
      </Navbar>

      <div className="main-content">
        <Container>
          <SimpleMemeEditor />
        </Container>
      </div>

      {/* Footer */}
      <footer className="footer mt-5 py-4">
        <Container>
          <div className="row">
            <div className="col-md-6">
              <h5>🎭 Meme Generator</h5>
              <p className="text-muted">
                Create amazing memes in just 3 simple steps! Choose a template, add your text, and download instantly.
              </p>
            </div>
            <div className="col-md-3">
              <h6>Quick Links</h6>
              <ul className="list-unstyled">
                <li><a href="https://github.com/its-kundan/memes-generator" target="_blank" rel="noopener noreferrer">GitHub Repository</a></li>
                <li><a href="https://memes-generator-orcin.vercel.app/" target="_blank" rel="noopener noreferrer">Live Demo</a></li>
                <li><a href="#" onClick={() => setShowHelp(true)}>Help & Tips</a></li>
              </ul>
            </div>
            <div className="col-md-3">
              <h6>Connect</h6>
              <ul className="list-unstyled">
                <li><a href="https://github.com/its-kundan" target="_blank" rel="noopener noreferrer">GitHub Profile</a></li>
                <li><a href="mailto:contact@example.com">Contact</a></li>
                <li><a href="#" onClick={() => setShowHelp(true)}>Feedback</a></li>
              </ul>
            </div>
          </div>
          <hr className="my-3" />
          <div className="row align-items-center">
            <div className="col-md-6">
              <p className="mb-0 text-muted">
                © 2024 Meme Generator. Made with ❤️ by <a href="https://github.com/its-kundan" target="_blank" rel="noopener noreferrer">Kundan</a>
              </p>
            </div>
            <div className="col-md-6 text-md-end">
              <p className="mb-0 text-muted">
                Built with React, Bootstrap & Imgflip API
              </p>
            </div>
          </div>
        </Container>
      </footer>

      <Modal show={showHelp} onHide={() => setShowHelp(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>🎭 How to Create a Meme</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5>3 Simple Steps:</h5>
          <ol>
            <li><strong>Choose a Template:</strong> Pick from popular meme templates or upload your own image</li>
            <li><strong>Add Your Text:</strong> Type top and bottom text</li>
            <li><strong>Download:</strong> Save your meme instantly</li>
          </ol>
          
          <h5>🎯 Tips:</h5>
          <ul>
            <li>Keep text short and punchy for best results</li>
            <li>Use all caps for that classic meme feel</li>
            <li>Try different templates for variety</li>
            <li>Upload your own images for custom memes</li>
          </ul>

          <h5>🔗 Useful Links:</h5>
          <ul>
            <li><a href="https://github.com/its-kundan/memes-generator" target="_blank" rel="noopener noreferrer">GitHub Repository</a></li>
            <li><a href="https://memes-generator-orcin.vercel.app/" target="_blank" rel="noopener noreferrer">Live Demo</a></li>
            <li><a href="https://github.com/its-kundan" target="_blank" rel="noopener noreferrer">Developer Profile</a></li>
          </ul>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => setShowHelp(false)}>
            Got it!
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default App;
