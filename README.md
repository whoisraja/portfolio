# Windows XP Themed Portfolio Website

A nostalgic Windows XP themed personal portfolio website that recreates the classic Windows XP desktop experience with a modern web interface.

## Features

### 🚀 Loading Screen
- Authentic Windows XP boot screen with animated progress bar
- Classic Windows logo with floating animation
- Step-by-step loading messages
- Smooth transition to desktop

### 🖥️ Desktop Interface
- Windows XP style desktop background with subtle grid pattern
- Clickable desktop icons for navigation
- Authentic folder icons with hover effects
- Smooth icon animations

### 📁 Window Management
- Draggable and resizable windows
- Minimize, maximize, and close functionality
- Window focus management
- Authentic Windows XP window styling
- Titlebar with gradient background

### 🎯 Portfolio Sections
- **Skills**: Organized technical skills in categories
- **Projects**: Featured projects with descriptions and links
- **Certifications**: Professional certifications with download options

### 🎮 Interactive Elements
- Start menu with user information
- Taskbar with window management
- System tray with time and date
- Responsive design for mobile devices

## Technologies Used

- **React 18** with TypeScript
- **CSS3** with custom Windows XP styling
- **HTML5** for semantic structure
- **Modern JavaScript** features

## Getting Started

### Prerequisites
- Node.js (version 14 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd windows-xp-portfolio
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### Building for Production

```bash
npm run build
```

## Project Structure

```
src/
├── components/
│   ├── Desktop.tsx              # Main desktop interface
│   ├── DesktopIcon.tsx          # Desktop icon component
│   ├── LoadingScreen.tsx        # Boot screen component
│   ├── Taskbar.tsx              # Taskbar with Start menu
│   ├── Window.tsx               # Window management
│   ├── WindowContent.tsx        # Portfolio content sections
│   └── *.css                    # Component-specific styles
├── types/
│   └── WindowType.ts            # TypeScript interfaces
├── App.tsx                      # Main application component
├── index.tsx                    # Application entry point
└── *.css                        # Global styles
```

## Customization

### Adding New Portfolio Sections

1. Add a new icon to the `desktopIcons` array in `Desktop.tsx`
2. Create a new case in the `renderContent` function in `WindowContent.tsx`
3. Add your content with Windows XP styling

### Modifying the Loading Screen

Edit the `loadingSteps` array in `LoadingScreen.tsx` to customize the loading messages.

### Changing Colors and Styling

The Windows XP color scheme is defined in the CSS files:
- Primary blue: `#0054E3`
- Secondary blue: `#4A90E2`
- Background: `#ECE9D8`
- Borders: `#ACA899`

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge

## Responsive Design

The website is fully responsive and works on:
- Desktop computers
- Tablets
- Mobile phones

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).

## Acknowledgments

- Microsoft Windows XP for the original design inspiration
- React team for the amazing framework
- The open source community for various tools and libraries

---

**Note**: This is a tribute project created for educational and portfolio purposes. All Windows XP branding and design elements are property of Microsoft Corporation.
