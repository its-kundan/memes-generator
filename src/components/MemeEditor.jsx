import React, { useState, useRef, useEffect } from 'react';
import {
  Row,
  Col,
  Card,
  Button,
  Form,
  InputGroup,
  Dropdown,
  DropdownButton,
  Badge,
  Alert,
  Modal
} from 'react-bootstrap';
import html2canvas from 'html2canvas';
import TextLayer from './TextLayer';

const MemeEditor = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [textLayers, setTextLayers] = useState([
    { id: 1, text: 'TOP TEXT', x: 50, y: 20, fontSize: 48, color: '#ffffff', fontFamily: 'Impact' }
  ]);
  const [selectedLayer, setSelectedLayer] = useState(1);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [showFontModal, setShowFontModal] = useState(false);
  const canvasRef = useRef(null);

  const fontOptions = [
    'Impact', 'Arial', 'Comic Sans MS', 'Times New Roman', 'Verdana', 
    'Georgia', 'Courier New', 'Lucida Console', 'Tahoma', 'Trebuchet MS'
  ];

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const addTextLayer = () => {
    const newId = Math.max(...textLayers.map(layer => layer.id)) + 1;
    const newLayer = {
      id: newId,
      text: 'NEW TEXT',
      x: 50,
      y: selectedImage ? 80 : 20,
      fontSize: 48,
      color: '#ffffff',
      fontFamily: 'Impact'
    };
    setTextLayers([...textLayers, newLayer]);
    setSelectedLayer(newId);
  };

  const updateTextLayer = (id, field, value) => {
    setTextLayers(textLayers.map(layer =>
      layer.id === id ? { ...layer, [field]: value } : layer
    ));
  };

  const removeTextLayer = (id) => {
    setTextLayers(textLayers.filter(layer => layer.id !== id));
    if (selectedLayer === id) {
      setSelectedLayer(textLayers[0]?.id || null);
    }
  };

  const handleDragStart = (e, id) => {
    e.dataTransfer.setData('text/plain', id);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const id = parseInt(e.dataTransfer.getData('text/plain'));
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    updateTextLayer(id, 'x', Math.max(0, Math.min(90, x)));
    updateTextLayer(id, 'y', Math.max(0, Math.min(90, y)));
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const downloadMeme = async () => {
    if (!canvasRef.current) return;
    
    try {
      const canvas = await html2canvas(canvasRef.current, {
        useCORS: true,
        allowTaint: true,
        backgroundColor: null
      });
      
      const link = document.createElement('a');
      link.download = 'meme.png';
      link.href = canvas.toDataURL();
      link.click();
    } catch (error) {
      console.error('Error generating meme:', error);
    }
  };

  const selectedLayerData = textLayers.find(layer => layer.id === selectedLayer);

  return (
    <div>
      <h1 className="mb-4">Create Your Meme</h1>
      
      <Row>
        <Col lg={8}>
          <Card className="mb-4">
            <Card.Header>
              <h5 className="mb-0">Meme Canvas</h5>
            </Card.Header>
            <Card.Body className="p-0">
              <div
                ref={canvasRef}
                className="meme-canvas"
                style={{
                  position: 'relative',
                  width: '100%',
                  height: '500px',
                  backgroundColor: '#f8f9fa',
                  border: '2px dashed #dee2e6',
                  overflow: 'hidden',
                  cursor: 'crosshair'
                }}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
              >
                {selectedImage && (
                  <img
                    src={selectedImage}
                    alt="Meme base"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'contain'
                    }}
                  />
                )}
                
                {textLayers.map((layer) => (
                  <TextLayer
                    key={layer.id}
                    layer={layer}
                    isSelected={selectedLayer === layer.id}
                    onSelect={setSelectedLayer}
                    onDragStart={handleDragStart}
                    onUpdate={updateTextLayer}
                  />
                ))}
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={4}>
          <Card className="mb-4">
            <Card.Header>
              <h5 className="mb-0">Image Upload</h5>
            </Card.Header>
            <Card.Body>
              <Form.Group>
                <Form.Label>Choose an image</Form.Label>
                <Form.Control
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="mb-3"
                />
              </Form.Group>
              
              <Button
                variant="outline-primary"
                onClick={downloadMeme}
                disabled={!selectedImage}
                className="w-100"
              >
                📥 Download Meme
              </Button>
            </Card.Body>
          </Card>

          <Card className="mb-4">
            <Card.Header className="d-flex justify-content-between align-items-center">
              <h5 className="mb-0">Text Layers</h5>
              <Button size="sm" variant="success" onClick={addTextLayer}>
                + Add Text
              </Button>
            </Card.Header>
            <Card.Body>
              {textLayers.map((layer) => (
                <div
                  key={layer.id}
                  className={`p-2 mb-2 border rounded ${
                    selectedLayer === layer.id ? 'border-primary bg-light' : 'border-secondary'
                  }`}
                  style={{ cursor: 'pointer' }}
                  onClick={() => setSelectedLayer(layer.id)}
                >
                  <div className="d-flex justify-content-between align-items-center">
                    <span className="text-truncate">{layer.text}</span>
                    <Button
                      size="sm"
                      variant="danger"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeTextLayer(layer.id);
                      }}
                    >
                      ×
                    </Button>
                  </div>
                </div>
              ))}
            </Card.Body>
          </Card>

          {selectedLayerData && (
            <Card>
              <Card.Header>
                <h5 className="mb-0">Text Properties</h5>
              </Card.Header>
              <Card.Body>
                <Form.Group className="mb-3">
                  <Form.Label>Text Content</Form.Label>
                  <Form.Control
                    type="text"
                    value={selectedLayerData.text}
                    onChange={(e) => updateTextLayer(selectedLayer, 'text', e.target.value)}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Font Size: {selectedLayerData.fontSize}px</Form.Label>
                  <Form.Range
                    min="12"
                    max="120"
                    value={selectedLayerData.fontSize}
                    onChange={(e) => updateTextLayer(selectedLayer, 'fontSize', parseInt(e.target.value))}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Font Family</Form.Label>
                  <DropdownButton
                    id="font-dropdown"
                    title={selectedLayerData.fontFamily}
                    variant="outline-secondary"
                    className="w-100"
                  >
                    {fontOptions.map((font) => (
                      <Dropdown.Item
                        key={font}
                        onClick={() => updateTextLayer(selectedLayer, 'fontFamily', font)}
                        style={{ fontFamily: font }}
                      >
                        {font}
                      </Dropdown.Item>
                    ))}
                  </DropdownButton>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Text Color</Form.Label>
                  <InputGroup>
                    <Form.Control
                      type="color"
                      value={selectedLayerData.color}
                      onChange={(e) => updateTextLayer(selectedLayer, 'color', e.target.value)}
                    />
                    <Button
                      variant="outline-secondary"
                      onClick={() => setShowColorPicker(!showColorPicker)}
                    >
                      {showColorPicker ? 'Hide' : 'Show'} Presets
                    </Button>
                  </InputGroup>
                  
                  {showColorPicker && (
                    <div className="mt-2">
                      {['#ffffff', '#000000', '#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'].map((color) => (
                        <Button
                          key={color}
                          size="sm"
                          className="me-1 mb-1"
                          style={{
                            backgroundColor: color,
                            borderColor: color,
                            width: '30px',
                            height: '30px'
                          }}
                          onClick={() => updateTextLayer(selectedLayer, 'color', color)}
                        />
                      ))}
                    </div>
                  )}
                </Form.Group>
              </Card.Body>
            </Card>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default MemeEditor;
