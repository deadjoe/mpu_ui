# MPU UI

MPU UI is a modern web interface for enterprise resource management, built with Next.js and TypeScript.

## Features

- Modern dashboard with real-time metrics visualization
- Interactive world map showing data center locations
- Resource management interface
- User management system
- Service monitoring
- Instance management
- Statistics and analytics

## Technology Stack

> **Version number notation**: In the version columns below, the caret symbol (^) indicates compatibility with all future minor/patch versions. For example, `^5.0.0` means the package is compatible with versions from 5.0.0 up to, but not including, 6.0.0. This ensures you get bug fixes and new features while maintaining backwards compatibility.

### Core Technologies

| Category | Technology | Version | Description |
|----------|------------|---------|-------------|
| Language | TypeScript | ^5.0.0 | Primary development language |
| Framework | Next.js | 14.0.4 | React framework for production |
| Runtime | Node.js | ^20.0.0 | JavaScript runtime |

### Frontend Framework & Libraries

| Category | Technology | Version | Description |
|----------|------------|---------|-------------|
| UI Framework | React | ^18.0.0 | Frontend library |
| UI Components | @shadcn/ui | ^0.0.4 | UI component library |
| Styling | Tailwind CSS | ^3.3.0 | Utility-first CSS framework |
| Styling | tailwindcss-animate | ^1.0.7 | Animation utilities for Tailwind |
| State Management | Zustand | ^4.4.7 | State management library |
| Data Fetching | @tanstack/react-query | ^5.13.4 | Data fetching and caching |
| Table Management | @tanstack/react-table | ^8.10.7 | Table management library |
| Panel Management | react-resizable-panels | ^2.1.7 | Resizable panel components |

### UI Components & Design

| Category | Technology | Version | Description |
|----------|------------|---------|-------------|
| Icons | lucide-react | ^0.294.0 | Icon library |
| Icons | @radix-ui/react-icons | ^1.3.2 | Radix UI icons |
| Font | Geist | ^1.3.1 | Primary font |
| Font | IBM Plex Sans | ^5.1.0 | Secondary font |
| Components | @radix-ui/* | Various | Accessible UI primitives |
| Styling Utils | class-variance-authority | ^0.7.1 | Component style variants |
| Styling Utils | tailwind-merge | ^2.5.5 | Tailwind class merging |
| Styling Utils | clsx | ^2.1.1 | Class name utilities |
| Styling Utils | classnames | ^2.5.1 | Additional class utilities |

### Data Visualization & Graphics

| Category | Technology | Version | Description |
|----------|------------|---------|-------------|
| Charts | Recharts | ^2.14.1 | Chart library |
| Maps | react-simple-maps | ^3.0.0 | Geographic visualization |
| 3D Graphics | Three.js | ^0.171.0 | 3D graphics library |
| 3D React | @react-three/fiber | ^8.17.10 | React renderer for Three.js |
| 3D Helpers | @react-three/drei | ^9.120.3 | Three.js helpers |
| Flow Diagrams | Reactflow | ^11.10.1 | Flow diagram library |
| Graph Layout | Dagre | ^0.8.5 | Graph layout engine |

### Development & Tools

| Category | Technology | Version | Description |
|----------|------------|---------|-------------|
| Linting | ESLint | ^8.57.1 | Code linting |
| Formatting | Prettier | ^3.4.2 | Code formatting |
| Type Checking | TypeScript ESLint | ^8.17.0 | TypeScript linting |
| Build Tool | PostCSS | ^8.0.0 | CSS processing |
| Build Tool | Autoprefixer | ^10.0.1 | CSS vendor prefixing |

### Authentication & Security

| Category | Technology | Version | Description |
|----------|------------|---------|-------------|
| Auth | NextAuth.js | ^4.24.5 | Authentication |
| Themes | next-themes | ^0.4.4 | Dark mode support |

### HTTP Client

| Category | Technology | Version | Description |
|----------|------------|---------|-------------|
| API Client | Axios | ^1.6.2 | HTTP client |

## Getting Started

### Prerequisites

Before you begin, ensure you have met the following requirements:
- Node.js 20.x or later
- npm 10.x or later (comes with Node.js)
- Git

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/deadjoe/mpu_ui.git
   cd mpu_ui
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env.local    # Create a local environment file
   ```
   Edit `.env.local` and configure your environment variables.

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Development Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Run ESLint with auto-fix
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting
- `npm run type-check` - Run TypeScript type checking
- `npm run prepare` - Run all checks (format, lint, type-check)

### Production Deployment

1. Build the application:
   ```bash
   npm run build
   ```

2. Start the production server:
   ```bash
   npm run start
   ```

The application will be available on port 3000 by default. You can modify the port by setting the `PORT` environment variable.

## Development

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier

## License

MIT License - see the [LICENSE](LICENSE) file for details
