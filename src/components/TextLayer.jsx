import React from 'react';

const TextLayer = ({ 
  layer, 
  isSelected, 
  onSelect, 
  onDragStart, 
  onUpdate 
}) => {
  const handleDoubleClick = () => {
    const newText = prompt('Enter new text:', layer.text);
    if (newText !== null) {
      onUpdate(layer.id, 'text', newText);
    }
  };

  return (
    <div
      draggable
      onDragStart={(e) => onDragStart(e, layer.id)}
      onClick={() => onSelect(layer.id)}
      onDoubleClick={handleDoubleClick}
      style={{
        position: 'absolute',
        left: `${layer.x}%`,
        top: `${layer.y}%`,
        transform: 'translate(-50%, -50%)',
        fontSize: `${layer.fontSize}px`,
        fontFamily: layer.fontFamily,
        color: layer.color,
        textShadow: '2px 2px 4px rgba(0,0,0,0.8)',
        cursor: 'move',
        userSelect: 'none',
        padding: '4px',
        border: isSelected ? '2px solid #007bff' : '2px solid transparent',
        borderRadius: '4px',
        backgroundColor: isSelected ? 'rgba(0,123,255,0.1)' : 'transparent',
        minWidth: '20px',
        textAlign: 'center',
        whiteSpace: 'nowrap',
        transition: 'all 0.2s ease'
      }}
      title={`Double-click to edit text: "${layer.text}"`}
    >
      {layer.text}
    </div>
  );
};

export default TextLayer;
