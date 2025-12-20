# Pet Project Pantry

## Overview
Pet Project Pantry is a Next.js application designed to provide a seamless shopping experience for pet products. The application features a structured layout that allows users to browse products by categories and subcategories.

## Project Structure
The project is organized as follows:

```
pet-project-pantry
├── src
│   ├── app
│   │   ├── layout.tsx          # Main layout for the application
│   │   ├── page.tsx            # Main entry point for the application
│   │   └── shop
│   │       ├── layout.tsx      # Layout for the shop section
│   │       ├── page.tsx        # Main shop page displaying products/categories
│   │       └── category
│   │           └── [category]
│   │               ├── page.tsx            # Dynamic category page
│   │               ├── layout.tsx          # Layout for category pages
│   │               └── subcategory
│   │                   └── [subcategory]
│   │                       └── page.tsx    # Dynamic subcategory page
│   │                       └── layout.tsx  # Layout for subcategory pages
│   ├── components
│   │   └── ProductBreadCrumb.tsx # Breadcrumb component for navigation
│   └── types
│       └── index.ts             # Type definitions for the application
├── package.json                 # NPM configuration file
├── tsconfig.json                # TypeScript configuration file
└── README.md                    # Project documentation
```

## Features
- Dynamic routing for categories and subcategories.
- Breadcrumb navigation for easy access to different sections.
- Responsive design for a better user experience.

## Getting Started
To get started with the project, clone the repository and install the dependencies:

```bash
git clone <repository-url>
cd pet-project-pantry
npm install
```

## Running the Application
To run the application in development mode, use the following command:

```bash
npm run dev
```

The application will be available at `http://localhost:3000`.

## Contributing
Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.

## License
This project is licensed under the MIT License. See the LICENSE file for details.