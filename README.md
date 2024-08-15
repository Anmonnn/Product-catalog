# Product catalog
- [DEMO LINK](https://anmonnn.github.io/product-catalog/)

This project is a React-based web application that uses Redux for state management and Redux Persist for persisting the Redux store. It utilizes HashRouter from react-router-dom for routing within the application. The application features various pages such as a homepage, product listings (Phones, Tablets, Accessories), product details, favorites, and a cart. Additionally, it includes feeds for discount offers and branded products. The application also features a 404 error page for unmatched routes. It interacts with an API to fetch product data and uses React Hooks for managing state and side effects.

## Adaptive Design:
The application is designed to be fully responsive, providing an optimal viewing experience across a wide range of devices, including PCs, tablets, and phones. The layout adjusts seamlessly to different screen sizes, ensuring that users have a consistent and user-friendly experience, regardless of the device they are using. This is achieved using SCSS, where mixins and variables are leveraged to create breakpoints and style adjustments specific to each device type.

## Technologies Used:
- React: Front-end library for building user interfaces.
- Redux Toolkit: Simplifies state management and reduces boilerplate code in Redux.
- Redux Persist: Preserves the Redux state between page reloads.
- HashRouter: Provides routing functionality using URL hash fragments.
- TypeScript (TSX): TypeScript with JSX syntax for type-safe React components.
- SCSS: A CSS preprocessor that adds features like variables and mixins to CSS.
- Classnames: Utility for conditionally joining class names together.
- ESLint: A tool for identifying and fixing problems in JavaScript/TypeScript code.
- React Hooks: Functions that let you use state and other React features without writing a class.
- API: The project interacts with an API to fetch data.

## Steps to Clone and Run the Project:
1) Clone the repository
`git clone https://github.com/Anmonnn/product-catalog.git`

2) Navigate to the project directory:
`cd product-catalog`

3) Install dependencies:
`npm install`

4) Run the project:
`npm start`

This will start the development server and you can view the application by navigating to `http://localhost:3000 in your browser`.
