import React, { useState, useEffect } from 'react';
import {
  Row,
  Col,
  Card,
  Button,
  Form,
  Spinner,
  Alert,
  Modal,
  Badge
} from 'react-bootstrap';
import { memeApi } from '../services/memeApi';

const SimpleMemeEditor = () => {
  const [templates, setTemplates] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [topText, setTopText] = useState('');
  const [bottomText, setBottomText] = useState('');
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState(null);
  const [showTemplateModal, setShowTemplateModal] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [memeCount, setMemeCount] = useState(0);

  useEffect(() => {
    fetchTemplates();
  }, []);

  const fetchTemplates = async () => {
    try {
      setLoading(true);
      const fetchedTemplates = await memeApi.getTemplates();
      setTemplates(fetchedTemplates);
      setSelectedTemplate(fetchedTemplates[0]);
    } catch (error) {
      console.error('Error fetching templates:', error);
      const fallbackTemplates = memeApi.getFallbackTemplates();
      setTemplates(fallbackTemplates);
      setSelectedTemplate(fallbackTemplates[0]);
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage({
          url: e.target.result,
          name: file.name,
          width: 500,
          height: 500
        });
        setSelectedTemplate(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setUploadedImage({
            url: e.target.result,
            name: file.name,
            width: 500,
            height: 500
          });
          setSelectedTemplate(null);
        };
        reader.readAsDataURL(file);
      }
    }
  };

  const generateMeme = async () => {
    const currentTemplate = uploadedImage || selectedTemplate;
    
    if (!currentTemplate || (!topText && !bottomText)) {
      setError('Please select a template or upload an image and add some text!');
      return;
    }

    setGenerating(true);
    setError(null);

    try {
      const memeDataUrl = await memeApi.generateMemeCanvas(currentTemplate, topText, bottomText);
      
      const link = document.createElement('a');
      link.download = 'meme.png';
      link.href = memeDataUrl;
      link.click();
      
      setMemeCount(prev => prev + 1);
      setGenerating(false);
    } catch (error) {
      console.error('Error generating meme:', error);
      setError('Failed to generate meme. Please try again.');
      setGenerating(false);
    }
  };

  const selectTemplate = (template) => {
    setSelectedTemplate(template);
    setUploadedImage(null);
    setShowTemplateModal(false);
  };

  const clearImage = () => {
    setUploadedImage(null);
    setSelectedTemplate(templates[0]);
  };

  if (loading) {
    return (
      <div className="text-center py-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
        <p className="mt-3">Loading meme templates...</p>
      </div>
    );
  }

  return (
    <div className="simple-meme-editor">
      <div className="text-center mb-4">
        <h1 className="display-4 mb-3">🎭 Create Your Meme</h1>
        <p className="lead">Choose a template, add your text, and download instantly!</p>
      </div>

      {/* Statistics Cards */}
      <Row className="mb-4">
        <Col md={4}>
          <div className="stats-card">
            <div className="stats-number">{templates.length}</div>
            <div className="stats-label">Available Templates</div>
          </div>
        </Col>
        <Col md={4}>
          <div className="stats-card">
            <div className="stats-number">{memeCount}</div>
            <div className="stats-label">Memes Created</div>
          </div>
        </Col>
        <Col md={4}>
          <div className="stats-card">
            <div className="stats-number">3</div>
            <div className="stats-label">Simple Steps</div>
          </div>
        </Col>
      </Row>

      {/* Step Indicators */}
      <div className="step-indicator">
        <div className={`step ${(selectedTemplate || uploadedImage) ? 'active' : ''}`}>
          <div className="step-number">1</div>
          <span>Choose Template</span>
        </div>
        <div className={`step ${topText || bottomText ? 'active' : ''}`}>
          <div className="step-number">2</div>
          <span>Add Text</span>
        </div>
        <div className={`step ${(topText || bottomText) && (selectedTemplate || uploadedImage) ? 'active' : ''}`}>
          <div className="step-number">3</div>
          <span>Download</span>
        </div>
      </div>

      <Row className="justify-content-center">
        <Col lg={8}>
          <Card className="mb-4">
            <Card.Body className="p-4">
              {/* Step 1: Template Selection */}
              <div className="mb-4">
                <h5>Step 1: Choose a Template or Upload Image</h5>
                
                {/* Upload Area */}
                <div 
                  className={`upload-area ${isDragging ? 'dragover' : ''}`}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onClick={() => document.getElementById('imageUpload').click()}
                >
                  <input
                    id="imageUpload"
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    style={{ display: 'none' }}
                  />
                  <div>
                    <i className="fas fa-cloud-upload-alt" style={{ fontSize: '2rem', marginBottom: '1rem' }}></i>
                    <p className="mb-2">Click to upload or drag & drop an image</p>
                    <small className="text-muted">Supports: JPG, PNG, GIF</small>
                  </div>
                </div>

                {/* Selected Template/Image Display */}
                {(selectedTemplate || uploadedImage) && (
                  <div className="mt-3">
                    <div className="d-flex align-items-center">
                      <img 
                        src={(uploadedImage || selectedTemplate).url} 
                        alt={(uploadedImage || selectedTemplate).name}
                        style={{ 
                          width: '120px', 
                          height: '90px', 
                          objectFit: 'cover',
                          borderRadius: '8px',
                          marginRight: '15px'
                        }}
                      />
                      <div className="flex-grow-1">
                        <p className="mb-1">
                          <strong>{(uploadedImage || selectedTemplate).name}</strong>
                          {uploadedImage && <Badge bg="success" className="ms-2">Custom Image</Badge>}
                        </p>
                        <div>
                          {uploadedImage ? (
                            <Button 
                              variant="outline-secondary" 
                              size="sm"
                              onClick={clearImage}
                              className="me-2"
                            >
                              Remove Image
                            </Button>
                          ) : (
                            <Button 
                              variant="outline-primary" 
                              size="sm"
                              onClick={() => setShowTemplateModal(true)}
                              className="me-2"
                            >
                              Change Template
                            </Button>
                          )}
                          <Button 
                            variant="outline-info" 
                            size="sm"
                            onClick={() => setShowTemplateModal(true)}
                          >
                            Browse Templates
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Step 2: Text Input */}
              <div className="mb-4">
                <h5>Step 2: Add Your Text</h5>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Top Text</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter top text..."
                        value={topText}
                        onChange={(e) => setTopText(e.target.value)}
                        maxLength={50}
                      />
                      <Form.Text className="text-muted">
                        {topText.length}/50 characters
                      </Form.Text>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Bottom Text</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter bottom text..."
                        value={bottomText}
                        onChange={(e) => setBottomText(e.target.value)}
                        maxLength={50}
                      />
                      <Form.Text className="text-muted">
                        {bottomText.length}/50 characters
                      </Form.Text>
                    </Form.Group>
                  </Col>
                </Row>
              </div>

              {/* Step 3: Generate */}
              <div className="text-center">
                <h5>Step 3: Download Your Meme</h5>
                <Button 
                  variant="success" 
                  size="lg"
                  onClick={generateMeme}
                  disabled={generating || (!topText && !bottomText) || (!selectedTemplate && !uploadedImage)}
                  className="px-5"
                >
                  {generating ? (
                    <>
                      <Spinner animation="border" size="sm" className="me-2" />
                      Generating...
                    </>
                  ) : (
                    '📥 Download Meme'
                  )}
                </Button>
              </div>

              {error && (
                <Alert variant="danger" className="mt-3">
                  {error}
                </Alert>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Feature Cards */}
      <Row className="mb-4">
        <Col md={4}>
          <div className="feature-card">
            <h6>🚀 Fast & Simple</h6>
            <p className="mb-0">Create memes in under 30 seconds with our streamlined 3-step process.</p>
          </div>
        </Col>
        <Col md={4}>
          <div className="feature-card">
            <h6>🎨 Custom Images</h6>
            <p className="mb-0">Upload your own images or choose from our curated meme templates.</p>
          </div>
        </Col>
        <Col md={4}>
          <div className="feature-card">
            <h6>📱 Mobile Friendly</h6>
            <p className="mb-0">Works perfectly on desktop, tablet, and mobile devices.</p>
          </div>
        </Col>
      </Row>

      {/* Template Selection Modal */}
      <Modal show={showTemplateModal} onHide={() => setShowTemplateModal(false)} size="xl">
        <Modal.Header closeButton>
          <Modal.Title>Choose a Meme Template</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            {templates.map((template) => (
              <Col key={template.id} xs={6} sm={4} md={3} className="mb-3">
                <Card 
                  className="template-card h-100"
                  style={{ cursor: 'pointer' }}
                  onClick={() => selectTemplate(template)}
                >
                  <Card.Img 
                    variant="top" 
                    src={template.url} 
                    alt={template.name}
                    style={{ height: '120px', objectFit: 'cover' }}
                  />
                  <Card.Body className="p-2">
                    <Card.Title className="h6 mb-0 text-center">
                      {template.name}
                    </Card.Title>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default SimpleMemeEditor;
