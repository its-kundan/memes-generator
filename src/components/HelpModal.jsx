import React from 'react';
import { Modal, Button, Table } from 'react-bootstrap';

const HelpModal = ({ show, onHide }) => {
  return (
    <Modal show={show} onHide={onHide} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>🎭 Meme Generator Help</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h5>🎨 How to Create a Meme</h5>
        <ol>
          <li><strong>Upload an Image:</strong> Click "Choose an image" to upload your own image or use a template</li>
          <li><strong>Add Text:</strong> Click "+ Add Text" to create text overlays</li>
          <li><strong>Position Text:</strong> Drag text layers around the canvas to position them</li>
          <li><strong>Customize:</strong> Select a text layer and use the controls to change font, size, and color</li>
          <li><strong>Download:</strong> Click "📥 Download Meme" to save your creation</li>
        </ol>

        <h5>⌨️ Keyboard Shortcuts</h5>
        <Table striped bordered>
          <thead>
            <tr>
              <th>Shortcut</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><kbd>Delete</kbd></td>
              <td>Delete selected text layer</td>
            </tr>
            <tr>
              <td><kbd>Ctrl</kbd> + <kbd>Z</kbd></td>
              <td>Undo last action</td>
            </tr>
            <tr>
              <td><kbd>Ctrl</kbd> + <kbd>Y</kbd></td>
              <td>Redo last action</td>
            </tr>
            <tr>
              <td><kbd>Ctrl</kbd> + <kbd>S</kbd></td>
              <td>Download meme</td>
            </tr>
            <tr>
              <td><kbd>Double-click</kbd></td>
              <td>Quick edit text content</td>
            </tr>
          </tbody>
        </Table>

        <h5>🎯 Tips & Tricks</h5>
        <ul>
          <li><strong>Text Positioning:</strong> Use drag-and-drop to position text precisely</li>
          <li><strong>Font Selection:</strong> Impact is the classic meme font, but try others for variety</li>
          <li><strong>Color Contrast:</strong> Use white text with black outline for best readability</li>
          <li><strong>Multiple Layers:</strong> Add several text layers for complex memes</li>
          <li><strong>Template Gallery:</strong> Browse templates for inspiration</li>
        </ul>

        <h5>📱 Mobile Usage</h5>
        <p>The meme generator works great on mobile devices! Touch and drag to position text, and use the responsive controls to customize your memes on the go.</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={onHide}>
          Got it!
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default HelpModal;
