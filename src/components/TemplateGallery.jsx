import React, { useState } from 'react';
import { Row, Col, Card, Button, Badge, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const TemplateGallery = () => {
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const memeTemplates = [
    {
      id: 1,
      name: 'Distracted Boyfriend',
      category: 'Relationship',
      image: 'https://via.placeholder.com/400x300/ff6b6b/ffffff?text=Distracted+Boyfriend+Meme',
      description: 'The classic meme about being distracted by something better'
    },
    {
      id: 2,
      name: 'Drake Hotline Bling',
      category: 'Reaction',
      image: 'https://via.placeholder.com/400x300/4ecdc4/ffffff?text=Drake+Hotline+Bling+Meme',
      description: 'Drake disapproving vs approving something'
    },
    {
      id: 3,
      name: 'Two Buttons',
      category: 'Decision',
      image: 'https://via.placeholder.com/400x300/45b7d1/ffffff?text=Two+Buttons+Meme',
      description: 'The impossible choice between two options'
    },
    {
      id: 4,
      name: 'Success Kid',
      category: 'Success',
      image: 'https://via.placeholder.com/400x300/96ceb4/ffffff?text=Success+Kid+Meme',
      description: 'Celebrating a small victory'
    },
    {
      id: 5,
      name: 'One Does Not Simply',
      category: 'Lord of the Rings',
      image: 'https://via.placeholder.com/400x300/ffeaa7/000000?text=One+Does+Not+Simply+Meme',
      description: 'Boromir explaining something obvious'
    },
    {
      id: 6,
      name: 'Y U No',
      category: 'Rage Comics',
      image: 'https://via.placeholder.com/400x300/fdcb6e/ffffff?text=Y+U+No+Meme',
      description: 'The classic rage comic character'
    },
    {
      id: 7,
      name: 'Ancient Aliens',
      category: 'Conspiracy',
      image: 'https://via.placeholder.com/400x300/e17055/ffffff?text=Ancient+Aliens+Meme',
      description: 'Giorgio A. Tsoukalos with his signature hair'
    },
    {
      id: 8,
      name: 'Bad Luck Brian',
      category: 'Misfortune',
      image: 'https://via.placeholder.com/400x300/6c5ce7/ffffff?text=Bad+Luck+Brian+Meme',
      description: 'When everything goes wrong'
    },
    {
      id: 9,
      name: 'Grumpy Cat',
      category: 'Animals',
      image: 'https://via.placeholder.com/400x300/a29bfe/ffffff?text=Grumpy+Cat+Meme',
      description: 'The internet\'s favorite grumpy feline'
    },
    {
      id: 10,
      name: 'Woman Yelling at Cat',
      category: 'Reaction',
      image: 'https://via.placeholder.com/400x300/00b894/ffffff?text=Woman+Yelling+at+Cat+Meme',
      description: 'A woman yelling at a confused cat'
    },
    {
      id: 11,
      name: 'This Is Fine',
      category: 'Reaction',
      image: 'https://via.placeholder.com/400x300/74b9ff/ffffff?text=This+Is+Fine+Meme',
      description: 'The dog sitting in a burning room'
    },
    {
      id: 12,
      name: 'Surprised Pikachu',
      category: 'Gaming',
      image: 'https://via.placeholder.com/400x300/fdcb6e/ffffff?text=Surprised+Pikachu+Meme',
      description: 'Pikachu\'s shocked expression'
    }
  ];

  const categories = ['All', 'Reaction', 'Relationship', 'Decision', 'Success', 'Animals', 'Gaming', 'Conspiracy', 'Misfortune'];

  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredTemplates = selectedCategory === 'All' 
    ? memeTemplates 
    : memeTemplates.filter(template => template.category === selectedCategory);

  const handleTemplateSelect = (template) => {
    setSelectedTemplate(template);
    setShowModal(true);
  };

  const useTemplate = () => {
    // In a real app, you would pass the template data to the editor
    // For now, we'll just navigate to the editor
    navigate('/');
    setShowModal(false);
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Meme Templates</h1>
        <Button variant="primary" onClick={() => navigate('/')}>
          ← Back to Editor
        </Button>
      </div>

      <div className="mb-4">
        <h5>Categories:</h5>
        <div className="d-flex flex-wrap gap-2">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? 'primary' : 'outline-primary'}
              size="sm"
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      <Row>
        {filteredTemplates.map((template) => (
          <Col key={template.id} xs={12} sm={6} md={4} lg={3} className="mb-4">
            <Card 
              className="h-100 template-card"
              style={{ cursor: 'pointer' }}
              onClick={() => handleTemplateSelect(template)}
            >
              <Card.Img 
                variant="top" 
                src={template.image} 
                alt={template.name}
                style={{ height: '200px', objectFit: 'cover' }}
              />
              <Card.Body className="d-flex flex-column">
                <Card.Title className="h6 mb-2">{template.name}</Card.Title>
                <Badge bg="secondary" className="mb-2 align-self-start">
                  {template.category}
                </Badge>
                <Card.Text className="small text-muted flex-grow-1">
                  {template.description}
                </Card.Text>
                <Button variant="outline-primary" size="sm">
                  Use Template
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{selectedTemplate?.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedTemplate && (
            <div>
              <img 
                src={selectedTemplate.image} 
                alt={selectedTemplate.name}
                className="img-fluid mb-3"
                style={{ width: '100%', maxHeight: '400px', objectFit: 'contain' }}
              />
              <p><strong>Category:</strong> {selectedTemplate.category}</p>
              <p>{selectedTemplate.description}</p>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={useTemplate}>
            Use This Template
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default TemplateGallery;
