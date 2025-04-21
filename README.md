# Level Up Hub

![logo](site\frontend\public\images\readme\RD_logo.png)

## Overview

Level Up Hub is a simple, fast, and effective web application that allows users to create professional portfolios in minutes. This React-based tool helps users showcase their personal information, projects, and skills in a clean, attractive format with modern design elements and seamless social integrations.

## Features
- **Intuitive Builder Interface**: Easy-to-navigate, step-by-step portfolio creation
- **Comprehensive Portfolio Sections**: Personal information, projects, skills, and contact details
- **Real-time Preview**: See your portfolio take shape as you build it with responsive device previews (mobile, tablet, desktop)
- **Responsive Design**: Looks great on all devices with adaptive layouts
- **GitHub Integration**: Connect your GitHub account to automatically import repositories and programming languages
- **Modern UI**: Clean, professional design with smooth animations and transitions
- **Customizable Components**: Personalize your portfolio with various styling options
- **Share Functionality**: Easily share your portfolio with potential employers or clients

## Application Structure

### Pages
- **Home**: Landing page with feature highlights and value proposition
- **Builder**: Step-by-step portfolio creation including GitHub connectivity integration 
- **Preview**: Live preview of the created portfolio with different device views
- **GitHub Callback**: Handler for OAuth authentication with GitHub

### Components
- **Header**: Navigation bar with authentication status
- **Footer**: Page footer with copyright and additional links
- **Form Components**:
  - BioForm: Personal information input with avatar upload
  - ProjectForm: Project details with image upload capabilities
  - SkillsForm: Technical skills with proficiency levels
- **Portfolio Display Components**:
  - BioSection: Profile display with contact information
  - ProjectsSection: Gallery of projects with technology tags
  - SkillsSection: Visual representation of skills with progress bars
- **GitHub Components**:
  - GithubConnect: Authentication and connection interface
  - GithubImport: Repository and language import functionality
- **UI Components**:
  - DevicePreview: Frame for displaying portfolio in different device sizes
  - ShareTooltip: Interface for sharing portfolio
  - AnimatedComponents: Motion-enhanced UI elements

## UI/UX Design

### Color Palette
- **Primary Colors**: 
  - Blue (#4a6cf7, #3451b2) - Used for primary actions, buttons and highlights
  - Orange (#ff7b00, #ff9a00) - Used for accents and secondary highlights
- **Secondary Colors**:
  - Dark Text: #24292e, #333, #555
  - Light Backgrounds: #f8f9ff, #f6f8fa
  - Border Colors: #e1e4e8, #eee
- **Gradient Effects**: 
  - Button gradients: linear-gradient(135deg, #4a6cf7, #3451b2)
  - Accent gradients: linear-gradient(90deg, #ff7b00, #ffb700)

### Typography
- **Primary Font**: System font stack with fallbacks to ensure consistency across platforms
- **Heading Sizes**:
  - H1: 2.2rem with 800 weight (Landing and main headings)
  - H2: 1.5rem (Section headings)
  - H3: 1.2rem (Card headings)
- **Body Text**: 
  - Regular: 1rem with 400 weight
  - Emphasis: 1rem with 600 weight
- **Special Text**: 
  - Labels and tags: 0.8rem-0.9rem

### Animations and Interactions
- **Page Transitions**: Smooth fade-in effects for page changes
- **Component Animations**: Scale and transform effects on hover for interactive elements
- **Feedback Animations**: Visual feedback for user actions (button clicks, form submissions)
- **Loading States**: Animated spinners for asynchronous operations
- **Hover Effects**: Subtle transform and shadow changes for cards and buttons

## Wireframes

The original wireframes were created to visualize the overall structure and layout of LevelUpHub before the UI was implemented. They helped us understand how users would interact with the site and how we could organize key features in an intuitive and supportive way.

<details>
  <summary>Wireframe 1 – Landing Page</summary>
  <img src="site\frontend\public\images\readme\Landing.png" alt="Landing page wireframe">
</details>

<details>
  <summary>Wireframe 2 – User Profile</summary>
  <img src="site\frontend\public\images\readme\Profile.png" alt="User profile wireframe">
</details>

<details>
  <summary>Wireframe 3 – Project Page</summary>
  <img src="site\frontend\public\images\readme\Project Detail.png" alt="Project page wireframe">
</details>

## Color Palette Exploration

We explored different color palette combinations to find one that felt vibrant, friendly, and encouraging.

Here are some of the combinations we tried during the design process:

<details>
  <summary>Color Option 1</summary>
  <img src="site\frontend\public\images\readme\blacklogo.png" alt="Color option 1">
</details>

<details>
  <summary>Color Option 2</summary>
  <img src="site\frontend\public\images\readme\blue_blacklogo.png" alt="Color option 2">
  
</details>

<details>
  <summary>Color Option 3</summary>
  <img src="site\frontend\public\images\readme\RO_blacklogo.png" alt="Color option 3">
</details>

<details>
  <summary>Final Color Palette</summary>
  <img src="site\frontend\public\images\readme\RD_logo.png" alt="Final color palette">
</details>

## Technology Stack

### Frontend
- **React.js**: UI component library
- **React Router**: Client-side routing
- **Framer Motion**: Animation library for smooth transitions
- **CSS Modules/Styled Components**: For component styling

### State Management
- **React Context API**: Global state for portfolio data and GitHub integration
- **Local Storage**: Persistence of portfolio data between sessions

### External Integrations
- **GitHub API**: OAuth authentication and repository data fetching
- **Image Storage**: Unsplash for default project images

### Future Enhancements
- **User Authentication**: Email and password or social login options
- **Multiple Portfolio Templates**: Different layout and styling options
- **PDF Export**: Download portfolio as PDF for offline sharing
- **Custom Domain Linking**: Connect portfolios to personal domains
- **Analytics Dashboard**: Track portfolio views and engagement
- **Advanced GitHub Stats**: More detailed coding metrics and visualizations
- **Project Tagging and Filtering**: Organize projects by category
- **AI-Powered Content Suggestions**: Smart recommendations for portfolio content

## Testing

### Unit Tests
- **Testing Framework**: Jest with React Testing Library
- **Component Testing**: Isolation tests for UI components
- **State Testing**: Validation of context behavior and state changes

### Integration Tests
- **User Flow Testing**: End-to-end testing of portfolio creation process
- **GitHub Integration Testing**: Mock API responses for OAuth flow
- **Responsive Design Testing**: Validation across multiple device sizes
- **Cross-Browser Testing**: Compatibility with major browsers

## Deployment

### Development

To run the Docker container for development, follow these steps:

1. Install and run Docker Desktop on your computer
2. Open the repository in your preferred IDE
3. Navigate to the `site` folder (`cd site`)
4. Run `docker-compose build` to build the image
5. Run `docker-compose up` to run the site on localhost:3000
6. Alternatively, run `docker-compose up --build` to combine the steps

### Hosting

#### Frontend

The React frontend is hosted on [Vercel](https://vercel.com/) and is deployed using their framework preset for React apps.

#### Backend

The Django backend is hosted on [Render](https://render.com/).

The backend is deployed using the Dockerfile in the backend folder of the repository. 

### CI/CD Pipeline

Both front- and backend are automatically redeployed when a branch is merged into the main branch of the git repository. 

## Contributing

Level Up Hub was created by the team **The Last of Us** during the Code Institute April 2025 Hackathon with the theme "Unmask the Coder: Beating Impostor Syndrome One Line at a Time". 

- [Fernando](https://github.com/Goncalves95)
- [Patricia](https://github.com/patilacerda)
- [Alita](https://github.com/hashtag-squirrel)
 
 