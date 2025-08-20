// Imgflip API service for meme templates and generation
const IMGFLIP_API_URL = 'https://api.imgflip.com';

// Popular meme templates from Imgflip
const POPULAR_TEMPLATES = [
  {
    id: '101716',
    name: 'Yo Dawg Heard You',
    url: 'https://i.imgflip.com/1g8my4.jpg',
    width: 500,
    height: 500
  },
  {
    id: '101910',
    name: 'Don\'t You Squidward',
    url: 'https://i.imgflip.com/1bhk.jpg',
    width: 500,
    height: 500
  },
  {
    id: '101511',
    name: 'Don\'t You Squidward',
    url: 'https://i.imgflip.com/1bhk.jpg',
    width: 500,
    height: 500
  },
  {
    id: '101287',
    name: 'Third World Skeptical Kid',
    url: 'https://i.imgflip.com/1bhk.jpg',
    width: 500,
    height: 500
  },
  {
    id: '89370399',
    name: 'Roll Safe Think About It',
    url: 'https://i.imgflip.com/1h7in3.jpg',
    width: 500,
    height: 500
  },
  {
    id: '438680',
    name: 'Maury Lie Detector',
    url: 'https://i.imgflip.com/1g8my4.jpg',
    width: 500,
    height: 500
  },
  {
    id: '101716',
    name: 'Yo Dawg Heard You',
    url: 'https://i.imgflip.com/1g8my4.jpg',
    width: 500,
    height: 500
  },
  {
    id: '101910',
    name: 'Don\'t You Squidward',
    url: 'https://i.imgflip.com/1bhk.jpg',
    width: 500,
    height: 500
  },
  {
    id: '101511',
    name: 'Don\'t You Squidward',
    url: 'https://i.imgflip.com/1bhk.jpg',
    width: 500,
    height: 500
  },
  {
    id: '101287',
    name: 'Third World Skeptical Kid',
    url: 'https://i.imgflip.com/1bhk.jpg',
    width: 500,
    height: 500
  },
  {
    id: '89370399',
    name: 'Roll Safe Think About It',
    url: 'https://i.imgflip.com/1h7in3.jpg',
    width: 500,
    height: 500
  },
  {
    id: '438680',
    name: 'Maury Lie Detector',
    url: 'https://i.imgflip.com/1g8my4.jpg',
    width: 500,
    height: 500
  }
];

// Fallback templates with better placeholder images
const FALLBACK_TEMPLATES = [
  {
    id: '1',
    name: 'Distracted Boyfriend',
    url: 'https://via.placeholder.com/500x500/ff6b6b/ffffff?text=Distracted+Boyfriend',
    width: 500,
    height: 500
  },
  {
    id: '2',
    name: 'Drake Hotline Bling',
    url: 'https://via.placeholder.com/500x500/4ecdc4/ffffff?text=Drake+Hotline+Bling',
    width: 500,
    height: 500
  },
  {
    id: '3',
    name: 'Two Buttons',
    url: 'https://via.placeholder.com/500x500/45b7d1/ffffff?text=Two+Buttons',
    width: 500,
    height: 500
  },
  {
    id: '4',
    name: 'Success Kid',
    url: 'https://via.placeholder.com/500x500/96ceb4/ffffff?text=Success+Kid',
    width: 500,
    height: 500
  },
  {
    id: '5',
    name: 'One Does Not Simply',
    url: 'https://via.placeholder.com/500x500/ffeaa7/000000?text=One+Does+Not+Simply',
    width: 500,
    height: 500
  },
  {
    id: '6',
    name: 'Y U No',
    url: 'https://via.placeholder.com/500x500/fdcb6e/ffffff?text=Y+U+No',
    width: 500,
    height: 500
  },
  {
    id: '7',
    name: 'Ancient Aliens',
    url: 'https://via.placeholder.com/500x500/e17055/ffffff?text=Ancient+Aliens',
    width: 500,
    height: 500
  },
  {
    id: '8',
    name: 'Bad Luck Brian',
    url: 'https://via.placeholder.com/500x500/6c5ce7/ffffff?text=Bad+Luck+Brian',
    width: 500,
    height: 500
  },
  {
    id: '9',
    name: 'Grumpy Cat',
    url: 'https://via.placeholder.com/500x500/a29bfe/ffffff?text=Grumpy+Cat',
    width: 500,
    height: 500
  },
  {
    id: '10',
    name: 'Woman Yelling at Cat',
    url: 'https://via.placeholder.com/500x500/00b894/ffffff?text=Woman+Yelling+at+Cat',
    width: 500,
    height: 500
  },
  {
    id: '11',
    name: 'This Is Fine',
    url: 'https://via.placeholder.com/500x500/74b9ff/ffffff?text=This+Is+Fine',
    width: 500,
    height: 500
  },
  {
    id: '12',
    name: 'Surprised Pikachu',
    url: 'https://via.placeholder.com/500x500/fdcb6e/ffffff?text=Surprised+Pikachu',
    width: 500,
    height: 500
  }
];

export const memeApi = {
  // Get popular meme templates
  async getTemplates() {
    try {
      // Try to fetch from Imgflip API first
      const response = await fetch(`${IMGFLIP_API_URL}/get_memes`);
      if (response.ok) {
        const data = await response.json();
        return data.data.memes.slice(0, 12); // Return first 12 templates
      }
    } catch (error) {
      console.log('Using fallback templates:', error);
    }
    
    // Fallback to our curated templates
    return FALLBACK_TEMPLATES;
  },

  // Generate meme using Imgflip API (requires username/password)
  async generateMeme(templateId, topText, bottomText, username, password) {
    try {
      const formData = new FormData();
      formData.append('template_id', templateId);
      formData.append('username', username);
      formData.append('password', password);
      formData.append('text0', topText || '');
      formData.append('text1', bottomText || '');

      const response = await fetch(`${IMGFLIP_API_URL}/caption_image`, {
        method: 'POST',
        body: formData
      });

      const data = await response.json();
      
      if (data.success) {
        return data.data.url;
      } else {
        throw new Error(data.error_message || 'Failed to generate meme');
      }
    } catch (error) {
      console.error('Error generating meme:', error);
      throw error;
    }
  },

  // Generate meme using canvas (fallback method)
  async generateMemeCanvas(template, topText, bottomText) {
    return new Promise((resolve, reject) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();
      
      img.crossOrigin = 'anonymous';
      
      img.onload = () => {
        try {
          canvas.width = template.width || 500;
          canvas.height = template.height || 500;
          
          // Draw the template image
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          
          // Configure text style
          ctx.fillStyle = 'white';
          ctx.strokeStyle = 'black';
          ctx.lineWidth = 4;
          ctx.textAlign = 'center';
          
          // Calculate font size based on canvas width
          const fontSize = Math.max(24, canvas.width / 12);
          ctx.font = `bold ${fontSize}px Impact`;
          
          // Draw top text
          if (topText) {
            const y = fontSize + 10;
            ctx.strokeText(topText.toUpperCase(), canvas.width / 2, y);
            ctx.fillText(topText.toUpperCase(), canvas.width / 2, y);
          }
          
          // Draw bottom text
          if (bottomText) {
            const y = canvas.height - 20;
            ctx.strokeText(bottomText.toUpperCase(), canvas.width / 2, y);
            ctx.fillText(bottomText.toUpperCase(), canvas.width / 2, y);
          }
          
          resolve(canvas.toDataURL('image/png'));
        } catch (error) {
          reject(error);
        }
      };
      
      img.onerror = () => {
        reject(new Error('Failed to load template image'));
      };
      
      img.src = template.url;
    });
  },

  // Get fallback templates
  getFallbackTemplates() {
    return FALLBACK_TEMPLATES;
  }
};

export default memeApi;
