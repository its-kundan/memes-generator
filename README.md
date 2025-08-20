# 🎭 Meme Generator

A modern, feature-rich web application for creating and customizing memes with an intuitive drag-and-drop interface.

## ✨ Features

### 🎨 **Meme Editor**
- **Image Upload**: Upload your own images or use templates
- **Text Overlays**: Add multiple text layers with drag-and-drop positioning
- **Font Customization**: Choose from 10+ popular fonts including Impact, Arial, Comic Sans MS
- **Color Picker**: Full color customization with preset color options
- **Font Size Control**: Adjustable font size from 12px to 120px
- **Real-time Preview**: See changes instantly as you edit

### 📚 **Template Gallery**
- **Popular Templates**: 12+ classic meme templates
- **Category Filtering**: Filter by categories like Reaction, Relationship, Gaming, etc.
- **Template Preview**: Click to preview templates before using
- **Easy Navigation**: Seamless integration with the main editor

### 💾 **Export & Download**
- **High-Quality Export**: Download memes as PNG images
- **Instant Download**: No waiting time for processing
- **Cross-Platform**: Works on desktop and mobile devices

### 🎯 **User Experience**
- **Responsive Design**: Optimized for all screen sizes
- **Modern UI**: Beautiful gradient backgrounds and smooth animations
- **Intuitive Controls**: Easy-to-use interface for all skill levels
- **Keyboard Shortcuts**: Efficient workflow for power users

## 🚀 Getting Started

### Prerequisites
- Node.js (version 16 or higher)
- npm or pnpm package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd memes-generator
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   pnpm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   # or
   pnpm dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to start creating memes!

## 🛠️ Usage Guide

### Creating Your First Meme

1. **Upload an Image**
   - Click "Choose an image" in the Image Upload section
   - Select any image file from your device
   - The image will appear in the canvas

2. **Add Text**
   - Click "+ Add Text" to create a new text layer
   - Click on any text layer to select it for editing
   - Drag text layers around the canvas to position them

3. **Customize Text**
   - **Content**: Type your meme text in the text input
   - **Font Size**: Use the slider to adjust size (12px - 120px)
   - **Font Family**: Choose from the dropdown menu
   - **Color**: Use the color picker or preset colors

4. **Download Your Meme**
   - Click "📥 Download Meme" to save your creation
   - The meme will download as a PNG file

### Using Templates

1. **Browse Templates**
   - Click "Templates" in the navigation
   - Browse through different categories
   - Click on any template to preview it

2. **Use a Template**
   - Click "Use This Template" in the preview modal
   - The template will be loaded in the editor
   - Customize with your own text and styling

## 🎨 Customization Options

### Text Properties
- **Font Families**: Impact, Arial, Comic Sans MS, Times New Roman, Verdana, Georgia, Courier New, Lucida Console, Tahoma, Trebuchet MS
- **Colors**: Full RGB color picker with 8 preset colors
- **Sizes**: 12px to 120px with smooth slider control
- **Positioning**: Drag-and-drop positioning with percentage-based coordinates

### Template Categories
- **Reaction**: Drake, Woman Yelling at Cat, This Is Fine
- **Relationship**: Distracted Boyfriend
- **Decision**: Two Buttons
- **Success**: Success Kid
- **Animals**: Grumpy Cat
- **Gaming**: Surprised Pikachu
- **Conspiracy**: Ancient Aliens
- **Misfortune**: Bad Luck Brian

## 🛠️ Technical Details

### Built With
- **React 18**: Modern React with hooks and functional components
- **Vite**: Fast build tool and development server
- **Bootstrap 5**: Responsive UI framework
- **React Bootstrap**: Bootstrap components for React
- **React Router**: Client-side routing
- **html2canvas**: Canvas-to-image conversion for downloads

### Project Structure
```
src/
├── components/
│   ├── MemeEditor.jsx      # Main meme creation interface
│   └── TemplateGallery.jsx # Template browsing and selection
├── App.jsx                 # Main application component
├── main.jsx               # Application entry point
├── App.css                # Application-specific styles
└── index.css              # Global styles and Bootstrap import
```

## 🎯 Future Enhancements

- [ ] **Real Meme Templates**: Integration with actual meme template APIs
- [ ] **Social Sharing**: Direct sharing to social media platforms
- [ ] **Meme History**: Save and manage previously created memes
- [ ] **Advanced Effects**: Filters, borders, and special effects
- [ ] **Collaboration**: Real-time collaborative meme creation
- [ ] **Meme Library**: Community-created meme collection

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Meme Templates**: Inspired by classic internet memes
- **Bootstrap**: For the beautiful UI components
- **React Community**: For the amazing ecosystem
- **html2canvas**: For enabling meme downloads

---

**Happy Meme Making! 🎭✨**