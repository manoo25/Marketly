# 🏪Marketly React Landing page and Dashboard Management Platform

### ITI Graduation Project - B2B Commerce Management System

---

## 🎓 **Project Information**

- **Program**: Information Technology Institute (ITI) - Frontend - Cross-Platform Track
- **Project Type**: Graduation Project
- **Team**: DevHouse Team
- **Duration**: 2 weeks
- **Repository**: Web Dashboard (Admin Panel) - LandingPage
- **Companion Project**: [React Native Mobile App Repository](https://github.com/manoo25/MarketlyApp)

---

## 🚀 **Overview**

Marketly is a B2B commerce management platform developed as an ITI Graduation Project, connecting wholesale traders (suppliers) with retail stores through an integrated web dashboard and mobile application.

The platform is built using ReactJS, React Native, and Supabase, offering a fully synchronized, real-time experience with:

Suppliers managing their products, monitoring sales performance, and overseeing their delivery delegates through the dashboard. Suppliers can add products, and all prices and listings are reviewed and approved by admins to ensure the best deals for retailers.

Delegates are assigned for delivery management, with their performance tracked by both suppliers and admins.

Retailers using the mobile app to browse approved products, place orders, and communicate through real-time customer support chat.

Admins controlling user management, product approval, price validation, order monitoring, and platform-wide analytics.

With role-based access control and secure Supabase authentication, Marketly ensures a safe, scalable, and efficient ecosystem.
Seamless synchronization between the dashboard and the mobile app delivers a unified experience, improving both supplier operations and retailer satisfaction.

“Marketly brings together all stakeholders in one ecosystem for seamless B2B commerce.”

The application is built using **Redux Toolkit** for state management, **React Router** for routing, and supports secure protected routes for both authentication and dashboard access. This web dashboard works in conjunction with a **React Native mobile application** (housed in a separate repository) to provide a complete B2B commerce solution.

### 🎯 **Project Vision**

To create a complete B2B commerce ecosystem that bridges the gap between merchants and wholesale retailers, providing seamless management tools for administrators and an intuitive mobile experience for end users.

---

## 🏗️ **System Architecture**

### **Multi-Platform Approach**

```
┌─────────────────────────────────────┐
│             Landing Page            │
│     Public Marketing & Onboarding   │
│     React.js + Responsive Design    │
└─────────────────┬───────────────────┘
                  │
                  │ Navigation (Signup / Download)
                  │
┌─────────────────▼───────────────────┐
│           Admin Dashboard           │
│        (This Repository)            │
│     React.js + Redux Toolkit        │
└─────────────────┬───────────────────┘
                  │
                  │ Shared Database & Auth
                  │
┌─────────────────▼───────────────────┐
│          Supabase Backend           │
│    PostgreSQL + Authentication      │
│         + File Storage              │
└─────────────────┬───────────────────┘
                  │
┌─────────────────▼───────────────────┐
│        Mobile Application           │
│       (Separate Repository)         │
│        React Native + Expo          │
└─────────────────────────────────────┘

```

Landing Page: The landing page serves as a public entry point where new users can explore Marketly, view our partners and clients' feedback, sign up, or download the mobile app.

Admin Dashboard (Web): A secure platform for admins and suppliers. Suppliers manage products, track sales, and monitor their delegates' deliveries, while admins review product prices and approve listings before publishing. Admins also oversee delegate performance and ensure fair pricing for retailers.

Supabase Backend: Provides a unified backend for database, authentication, file storage, and real-time synchronization across web and mobile applications.

Mobile Application: A React Native app designed specifically for retailers to browse approved products, place orders, track deliveries, and communicate through real-time chat support.

## ✨ **Key Features**

### 🔐 **Authentication & Authorization**

- **Multi-Method Authentication**:
  - Email/password authentication with Supabase
  - Google OAuth integration for seamless login
  - Secure token-based user sessions
- **Advanced Security**:
  - Protected Auth Routes for non-authenticated users
  - Protected Dashboard Routes with role-based access control
  - JWT token management and refresh mechanisms

### 📊 **Dashboard Management**

- **Comprehensive Order Management**:

  - Real-time order tracking and status updates
  - Sales performance monitoring and analytics
  - Return processing and refund management
  - Advanced order filtering and search capabilities

- **Delegate & Supplier Management (Web Dashboard)**:
- Supplier dashboard to add and manage products (pending admin approval for pricing and publishing).
- Admin review workflow to validate prices and ensure competitive offers for retailers.
- Sales tracking and product performance analytics for suppliers.
- Delegate assignment by suppliers, with delivery performance visible to both suppliers and admins.
- Full transparency on delivery statuses for suppliers and admins.

- **Product & Inventory Control**:

  - Complete CRUD operations for products and categories
  - Image upload and management system
  - Inventory tracking and low-stock alerts
  - Bulk product import/export functionality

- **Multi-Company Operations**:

  - Company profile management and verification
  - Governorate-wise service area management
  - Regional performance tracking and analytics

- **Customer Support Excellence**:
  - Integrated complaints handling system
  - Real-time chat support functionality
  - Ticket management and resolution tracking

### 📱 **Mobile App Features**

- Retailer-focused: product browsing, order placement, and chat support only
- No supplier or delegate access from mobile

### 📈 **Analytics & Business Intelligence**

- **Visual Analytics Dashboard**:

  - Interactive revenue charts with time-based filtering
  - Comprehensive sales performance charts
  - Real-time statistics grid with key metrics
  - Activity feeds for system-wide monitoring

- **Reporting & Export**:
  - Advanced reporting tables with export functionality
  - Custom date range analytics
  - Performance benchmarking and KPI tracking

### 🎨 **User Interface & Experience**

- **Modern Responsive Design**:

  - Mobile-first responsive layout
  - Modular component architecture for consistency
  - Intuitive navigation and user workflows

- **Advanced Interaction Features**:
  - Dynamic filters with real-time search
  - Advanced search capabilities across all modules
  - Reusable modal dialogs for data entry and updates
  - Drag-and-drop functionality where applicable

### 🔗 **Integration & Connectivity**

- **Supabase Integration**:

  - Real-time database synchronization
  - Secure authentication and authorization
  - File storage and CDN for image management
  - WebSocket connections for live updates

- **Cross-Platform Synchronization**:
  - Shared database with React Native mobile app
  - Real-time data sync between web and mobile
  - Consistent user experience across platforms

### 💬 **Feedback & Customer Experience**

- **Testimonial Management System**:

  - Dynamic testimonial publishing/unpublishing
  - Customer review moderation tools
  - Rating and feedback analytics

- **Quality Assurance**:
  - Feedback collection and analysis
  - Customer satisfaction tracking
  - Continuous improvement metrics

---

## 🛠️ **Tech Stack**

### **Frontend Technologies**

- **Core Framework**: React 18+ with JSX
- **State Management**: Redux Toolkit with RTK Query
- **Routing**: React Router DOM v6
- **UI Architecture**: Component-based modular design

### **Backend Infrastructure (BaaS)**

- **Primary Backend**: Supabase (PostgreSQL + Real-time + Auth)
- **Authentication**: Supabase Auth with Email & Google OAuth
- **Database**: PostgreSQL with Row Level Security (RLS)
- **File Storage**: Supabase Storage with CDN delivery

### **Development & Build Tools**

- **Build Tool**: Vite for fast development and optimized builds
- **Code Quality**: ESLint with custom configuration
- **Version Control**: Git with conventional commits
- **Package Manager**: npm/yarn with lock files

### **Visualization & Analytics**

- **Charts**: Custom React components for revenue and sales visualization
- **Data Visualization**: Interactive charts and graphs
- **Real-time Updates**: WebSocket integration for live data

---

## 📂 **Project Structure**

The project follows a **modular architecture** designed for scalability and maintainability:

```
src/
├── components/ # Reusable UI Components
│ ├── Authcomponent/ # Authentication-related components
│ ├── CategoriesComponents/ # Product categories management components
│ ├── ChartsComponents/ # Charts and analytics visualization components
│ ├── ChatsComponents/ # Chat and messaging components
│ ├── CompaniesComponents/ # Company management components
│ ├── ComplaintsComponents/ # Complaints handling components
│ ├── DelegatesComponents/ # Delegates and delivery management components
│ ├── DistributionRoutes/ # Distribution and route management components
│ ├── Feedback/ # Feedback and testimonials components
│ ├── globalComponents/ # Shared UI components (buttons, inputs, etc.)
│ ├── LandingComponents/ # Public landing page components
│ ├── LayoutComponents/ # Layout and navigation components
│ ├── modalsComponents/ # Modal dialogs for CRUD operations
│ ├── Notfound/ # 404 and fallback components
│ ├── OrdersComponents/ # Orders management components
│ ├── ProductsComponents/ # Product catalog and inventory components
│ ├── ReturnsComponents/ # Returns management components
│ ├── SalesComponents/ # Sales and revenue tracking components
│ ├── SupportChat/ # Support chat components
│ └── UsersComponents/ # User management components
├── pages/                     # Application Pages & Views
│   ├── auth/                  # Authentication pages (login, signup, password reset)
│   ├── products/              # Product catalog and management
│   ├── orders/                # Order management pages
│   ├── sales/                 # Sales tracking and analytics
│   ├── returns/               # Return processing pages
│   ├── delegates/             # Sales representative management
│   ├── companies/             # Company profile management
│   ├── complaints/            # Customer complaint handling
│   ├── categories/            # Category management pages
│   ├── feedback/              # Customer feedback and testimonials
│   ├── chats/                 # Real-time chat support
│   ├── charts/                # Data visualization and analytics charts
│   ├── landing/               # Public landing page
│   ├── layout/                # Dashboard layout and shared structures
│   ├── users/                 # User management pages
│   └── global/                # Shared or global pages
├── slices/                    # Redux Toolkit State Management
│   ├── Categories.js          # Category state management
│   ├── CompaniesSlice.js      # Company management state
│   ├── Complaints.js          # Complaints handling state
│   ├── DelegatesSlice.js      # Delegate management state
│   ├── MessagesSlice.js       # Chat and messaging state
│   ├── OrderItems.js          # Order items state
│   ├── OrdersSlice.js         # Order processing state
│   ├── ProductSlice.js        # Product catalog state
│   ├── testimonialsSlice.js   # Customer testimonials state
│   ├── token.js               # Authentication token state
│   ├── units.js               # Units management state
│   └── Users.js               # User management state
├── routes/                    # Route Protection & Navigation
│   ├── protectedauthroute.jsx     # Auth route protection
│   └── protecteddashboardroute.jsx # Dashboard access control
├── utils/                     # Utility Functions & Helpers
│   ├── getCurrentUserId.js    # User session management
│   ├── uploadingImage.js      # Image upload functionality
│   ├── supabaseClient.js      # Supabase client configuration
│   └── dataHelpers.js         # Data manipulation utilities
└── constants/                 # Static Data & Configuration
    ├── users.js               # User role definitions
    ├── complaints.js          # Complaint categories
    ├── categories.js          # Product categories
    ├── units.js               # Measurement units
    └── governorates.js        # Geographic data
```

---

## 🔑 **Authentication System**

### **Supabase Authentication Integration**

Our authentication system leverages **Supabase Auth** for secure and scalable user management:

#### **Authentication Methods**:

- **Email/Password**: Traditional sign-up and login with email verification
- **Google OAuth**: One-click social authentication for improved user experience
- **Session Management**: Automatic token refresh and secure session handling

#### **Route Protection Strategy**:

- **`protectedauthroute.jsx`**:
  - Redirects authenticated users away from login/register pages
  - Prevents unnecessary access to auth pages when already logged in
- **`protecteddashboardroute.jsx`**:
  - Ensures only authenticated and authorized users access dashboard features
  - Implements role-based access control for different user levels
  - Handles token validation and refresh automatically

#### **Security Features**:

- JWT token-based authentication
- Automatic session refresh
- Role-based dashboard access
- Secure password requirements
- OAuth integration with industry standards

---

## 🔄 **State Management Architecture (Redux)**

The application uses **Redux Toolkit** with a slice-based architecture for optimal state management:

### **Core Slices**:

- **`DelegatesSlice`**:

  - Manages sales representative data and assignments
  - Handles territory management and performance tracking
  - Async operations for delegate CRUD operations

- **`MessagesSlice`**:

  - Real-time chat functionality and message history
  - Support ticket management and resolution tracking
  - WebSocket integration for live messaging

- **`OrdersSlice`**:

  - Complete order lifecycle management
  - Real-time order status updates
  - Advanced filtering and search capabilities

- **`ProductSlice`**:

  - Product catalog management with categories
  - Inventory tracking and stock management
  - Image upload and product media handling

- **`TestimonialsSlice`**:

  - Customer review and testimonial management
  - Dynamic publishing/unpublishing functionality
  - Rating analytics and feedback processing

- **`CompaniesSlice`**:
  - Multi-company profile management
  - Geographic service area tracking
  - Company verification and approval workflows

### **State Management Features**:

- **Async Data Fetching**: Each slice handles Supabase queries with proper loading states
- **Optimistic Updates**: Immediate UI updates with rollback on failure
- **Caching Strategy**: Intelligent data caching to reduce API calls
- **Error Handling**: Comprehensive error states and user feedback
- **Real-time Sync**: Integration with Supabase real-time subscriptions

---

## 🖥️ **Development Setup & Installation**

### **1️⃣ Prerequisites**

Ensure you have the following installed on your development machine:

- **Node.js** (v18.0.0 or higher) - [Download Here](https://nodejs.org/)
- **npm** (v8+) or **yarn** (v1.22+) - Package manager
- **Git** - Version control system
- **Supabase Account** - [Create Free Account](https://supabase.com/)

### **2️⃣ Installation Process**

```bash
# Clone the repository
git clone <https://github.com/manoo25/Marketly>
cd project-folder

# Install dependencies
npm install
# or using yarn
yarn install

# Verify installation
npm run --version
```

### **3️⃣ Environment Configuration**

Create a `.env` file in the root directory and add your Supabase credentials:

```env
# Supabase Configuration (Required)
VITE_SUPABASE_URL=your-supabase-project-url
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key

# Optional: Development Configuration
VITE_APP_NAME=ITI Dashboard Platform
VITE_APP_VERSION=1.0.0
VITE_ENVIRONMENT=development

# Optional: Analytics (if implemented)
VITE_GOOGLE_ANALYTICS_ID=your-ga-id
```

### **4️⃣ Supabase Setup**

1. Create a new Supabase project
2. Configure authentication providers (Email, Google)
3. Set up database tables and relationships
4. Configure Row Level Security (RLS) policies
5. Upload any required seed data

### **5️⃣ Run the Development Server**

```bash
# Start the development server
npm run dev
# or using yarn
yarn dev

# The application will be available at:
# http://localhost:5173
```

---

## 🧪 **Testing & Quality Assurance**

### **Code Quality Tools**

```bash
# Run ESLint for code quality checks
npm run lint

# Fix automatically fixable linting issues
npm run lint:fix

# Run unit tests (if configured)
npm run test

# Run tests in watch mode during development
npm run test:watch

# Generate test coverage report
npm run test:coverage
```

---

## 📌 **Development Best Practices**

### **Code Organization**

- **Modular Component Structure**: Each component has a single responsibility and is highly reusable
- **Redux Slice Pattern**: State management follows the slice pattern for better organization and maintainability
- **Custom Hooks**: Business logic is extracted into custom hooks for reusability
- **Error Boundaries**: Proper error handling at component and application levels

### **Performance Optimization**

- **Code Splitting**: Dynamic imports for route-based code splitting
- **Memoization**: Strategic use of React.memo and useMemo for expensive operations
- **Image Optimization**: Proper image compression and lazy loading
- **Bundle Analysis**: Regular monitoring of bundle size and optimization

### **Security Best Practices**

- **Supabase Integration**: Centralized client configuration with proper error handling
- **Protected Routes**: Multi-layer route protection for authentication and authorization
- **Data Validation**: Input validation and sanitization at all levels
- **Environment Variables**: Secure configuration management

### **UI/UX Guidelines**

- **Responsive Design**: Mobile-first approach with breakpoint optimization
- **Accessibility**: WCAG 2.1 compliance with proper ARIA labels and keyboard navigation
- **User Feedback**: Loading states, error messages, and success confirmations
- **Consistent Design**: Reusable components following design system principles

---

## 🚀 **Deployment & Production**

### **Build Process**

```bash
# Create optimized production build
npm run build

# Verify build integrity
npm run preview
```

### **Deployment Options**

- **Vercel**: Automatic deployments with Git integration
- **Supabase Hosting**: Direct integration with backend services
- **Custom VPS**: Self-hosted solutions with Docker

### **Environment Management**

- **Development**: Local development with hot reload
- **Staging**: Pre-production testing environment
- **Production**: Live production deployment with monitoring

---

## 📱 **Mobile App Integration**

### **Cross-Platform Synchronization**

This web dashboard works seamlessly with our **React Native mobile application**:

- **Shared Database**: Both applications use the same Supabase backend
- **Real-time Sync**: Changes in the dashboard are immediately reflected in the mobile app
- **Consistent User Experience**: Unified design language and user workflows
- **Role-based Access**: Different interfaces for different user types

### **Mobile App Repository**

The companion React Native application is maintained in a separate repository:

- **Repository**: [Link to React Native App Repository]
- **Platform**: iOS and Android (Expo managed workflow)
- **Features**: Customer-facing product catalog, ordering, and account management
- **Integration**: Real-time data synchronization with this admin dashboard

---

## 📚 **Documentation & Resources**

### **Technical Documentation**

- [Supabase Documentation](https://supabase.com/docs)
- [React Documentation](https://react.dev/)
- [Redux Toolkit Documentation](https://redux-toolkit.js.org/)
- [React Router Documentation](https://reactrouter.com/)

### **Design Resources**

- [Component Style Guide](./docs/style-guide.md)
- [UI/UX Guidelines](./docs/ui-guidelines.md)
- [Brand Assets](./docs/brand-assets/)

### **API Documentation**

- [Supabase API Reference](https://supabase.com/docs/reference)
- [Custom API Endpoints](./docs/api-reference.md)

---

## 🎯 **ITI Project Objectives & Learning Outcomes**

### **Technical Skills Demonstrated**

- **Frontend Development**: Advanced React.js with hooks and modern patterns
- **State Management**: Complex state management with Redux Toolkit
- **Backend Integration**: RESTful API integration with Supabase
- **Authentication**: Secure authentication and authorization implementation
- **Database Design**: Relational database design and optimization
- **Real-time Features**: WebSocket integration for live updates

### **Professional Skills Developed**

- **Project Management**: Agile development methodologies
- **Code Quality**: Testing, linting, and code review processes
- **Documentation**: Comprehensive technical documentation
- **Collaboration**: Git workflow and team collaboration
- **Problem Solving**: Complex business logic implementation

### **Industry-Ready Features**

- **Scalable Architecture**: Production-ready codebase structure
- **Security Best Practices**: Industry-standard security implementation
- **Performance Optimization**: Optimized for production environments
- **User Experience**: Professional-grade UI/UX design
- **Deployment Ready**: Configured for various hosting platforms

---

## 📜 **License**

This project is licensed under the **MIT License**

### **License Summary**

- ✅ Commercial use allowed
- ✅ Modification allowed
- ✅ Distribution allowed
- ✅ Private use allowed
- ❗ License and copyright notice required

---

## 🙏 **Acknowledgments**

### **Educational Institution**

- **Information Technology Institute (ITI)** - For providing comprehensive Frontend-CrossPlatform mobile development training
- **ITI Instructors & Mentors** - For guidance and technical support throughout the program

### **Technology Partners**

- **Supabase Team** - For providing excellent Backend-as-a-Service infrastructure
- **React Community** - For continuous innovation and comprehensive documentation
- **Redux Team** - For powerful state management solutions

### **Open Source Community**

- **Contributors** - All developers who contributed to the libraries and tools used
- **Stack Overflow Community** - For countless solutions and guidance
- **GitHub Community** - For hosting and collaboration tools

---

<div align="center">

## 🚀 **ITI Graduation Project - 2024**

**Building the Future of B2B Commerce Management**

[![React](https://img.shields.io/badge/React-18+-blue.svg)](https://reactjs.org/)
[![Redux Toolkit](https://img.shields.io/badge/Redux%20Toolkit-1.9+-purple.svg)](https://redux-toolkit.js.org/)
[![Supabase](https://img.shields.io/badge/Supabase-Backend-green.svg)](https://supabase.com/)
[![MIT License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE.md)

[🌟 Star this Project](https://github.com/your-username/repository-name) | [🐛 Report Issues](https://github.com/your-username/repository-name/issues) | [💡 Request Features](https://github.com/your-username/repository-name/issues/new)

**Made with ❤️ by DevHouse Team**

</div>
