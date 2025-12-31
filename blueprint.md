
# Project Blueprint

## Overview

This project is a web-based price calculator designed to help users estimate the cost of materials based on their dimensions. The application allows users to input the length and width of a material in inches, select a material from a predefined list, or enter a custom material price per square foot. The calculator then displays the total estimated price. The application also includes a feature for managing the list of materials, allowing users to add, edit, and delete materials from local storage.

## Features & Design

### Core Functionality

*   **Price Calculation**: The main feature of the application is the price calculator, which takes the length and width of a material in inches and the price per square foot to calculate the total cost.
*   **Material Management**: Users can manage a list of materials, including adding new materials with their prices, editing existing materials, and deleting materials. The materials are stored in the browser's local storage for persistence.
*   **Custom Materials**: In addition to the predefined list of materials, users can enter a custom price for a material that is not on the list.

### Design & Styling

*   **Theme**: The application uses a modern, dark theme with a purple and blue color scheme. The background has a subtle noise texture to create a premium feel.
*   **Layout**: The layout is clean, visually balanced, and mobile-responsive, ensuring a seamless experience across different devices.
*   **Components**: The application uses modern UI components, including custom-styled input fields, buttons, and a custom-built dropdown menu that matches the overall theme.
*   **Iconography**: Interactive icons from the `react-icons` library are used to enhance the user experience, providing clear visual cues for actions like adding, editing, and deleting materials.
*   **Modals**: A confirmation modal is used to prevent accidental deletion of materials, improving the application's usability.

### Technology Stack

*   **Framework**: [Next.js](https://nextjs.org/) (React)
*   **Styling**: CSS Modules
*   **Icons**: [React Icons](https://react-icons.github.io/react-icons/)

## Recent Changes

*   **Custom Dropdown**: Replaced the default dropdown with a custom-built dropdown component to ensure consistent styling and a better user experience.
*   **Materials Page Redesign**: The materials management page has been redesigned with a modern, card-based layout, intuitive icons, and a confirmation modal for deletions.
*   **Styling Enhancements**: The overall styling has been polished to create a more modern and visually appealing design.
