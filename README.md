# TradesMap Company Registration

## Simple Project Guide for Review

This document explains the project in plain language so that a non-technical reviewer can understand:

- What the application does
- How the pages are connected
- What each component is responsible for
- What each supporting file does
- Why external libraries are used
- What is inside `package.json`

---

# 1. What is this project?

TradesMap is a React-based company registration flow for construction businesses.

For the current demonstration, the completed flow goes through:

1. Welcome / Create Company Account
2. Company Identity
3. Company Type & How You Use TradesMap
4. Construction Capabilities
5. Service Area

The remaining steps are shown in the progress sidebar but are not part of the current HOD demonstration:

6. Company Users & Primary Contact
7. Documents & Qualifications

The application is built as a single-page React application. Instead of loading a completely new website page each time, React changes the visible component according to the user's current registration step.

---

# 2. Technology Used

| Technology | Why it is used |
|---|---|
| React | Builds the user interface from reusable components |
| Vite | Runs the development server and builds the production application |
| JavaScript | Handles application logic and user interactions |
| CSS | Controls layout, spacing, colors, responsiveness, and visual design |
| Lucide React | Provides consistent open-source interface icons |
| Leaflet | Provides interactive map functionality |
| React Leaflet | Allows Leaflet maps to work naturally inside React components |
| Local JSON files | Store searchable capability and US city/location data locally |

---

# 3. Project Flow

```text
App.jsx
   |
   +--> LoginPage
   |       |
   |       +--> CompanyIdentityPage
   |                   |
   |                   +--> CompanyTypePage
   |                               |
   |                               +--> ConstructionCapabilitiesPage
   |                                               |
   |                                               +--> ServiceAreaPage
```

The `Continue` and `Back` buttons change the current step through `App.jsx`.

For example:

```text
Company Type
    Continue
       |
       v
Construction Capabilities
       |
       | Continue
       v
Service Area
```

---

# 4. Root-Level Files

## `package.json`

This file is the project's dependency and command list.

It tells the project:

- What the application is called
- Which JavaScript libraries are required
- Which commands can run the application

### Available commands

```bash
npm install
```

Downloads the required packages.

```bash
npm run dev
```

Starts the development server.

```bash
npm run build
```

Creates a production-ready build.

```bash
npm run preview
```

Previews the production build locally.

## `index.html`

This is the main HTML entry point used by Vite. React is mounted into this document.

## `vite.config.js`

Contains Vite configuration for the project.

## `.gitignore`

Lists files and folders that should normally not be committed to version control, such as generated dependencies and build output.

---

# 5. `src` Folder

The `src` folder contains the main application source code.

```text
src/
├── App.jsx
├── main.jsx
└── Company/
```

## `main.jsx`

This is the React entry point.

Its responsibility is to start the React application and render the main `App` component into the browser.

## `App.jsx`

This file controls the current registration step.

It imports the main page components:

- `LoginPage`
- `CompanyIdentityPage`
- `CompanyTypePage`
- `ConstructionCapabilitiesPage`
- `ServiceAreaPage`

It uses React's `useState` hook to remember which page is currently active.

This is the central navigation controller for the current demo flow.

---

# 6. Components

The project keeps UI components inside:

```text
src/Company/components/
```

## `LoginPage.jsx`

This is the first page of the registration process.

It brings together the account creation interface and handles the interaction between:

- the signup form
- validation logic
- the presenter

It sends the user to the Company Identity page after successful validation.

## `Header.jsx`

Displays the common top header information.

It includes:

- TradesMap branding
- security information

It uses Lucide React icons instead of image-based icons.

## `WelcomeSection.jsx`

Displays the welcome content.

It includes:

- introductory text
- business benefits
- feature list
- sign-in information
- construction-related visual

It imports and reuses `FeatureItem` instead of repeating the same layout multiple times.

## `FeatureItem.jsx`

A small reusable component used for each feature shown on the welcome section.

It receives:

- an icon
- a title
- a description

This keeps repeated UI code simple and reusable.

## `SignupForm.jsx`

Contains the Create Company Account form.

It handles:

- first name
- last name
- work email
- password
- confirm password
- optional referral code
- terms acceptance
- privacy acknowledgement
- communication preference

It also manages password show/hide behavior locally.

## `InputField.jsx`

A reusable input component.

Instead of writing the same label, input, icon, and error structure repeatedly, `SignupForm` sends the required information to this component.

This improves consistency and reduces repeated code.

## `Footer.jsx`

Contains the footer content, including:

- copyright text
- Privacy Policy link
- Terms & Conditions link
- Support link

---

# 7. Company Identity Page

## `CompanyIdentityPage.jsx`

This is Step 2 of the registration flow.

It collects company information such as:

- Legal Company Name
- DBA
- EIN / Tax ID
- Company Website
- Year Established
- Company Logo
- Company Description

It also displays a live Company Preview so the user can see the entered information reflected in the interface.

### Imports used

The page imports:

- React state handling for form data
- Lucide React icons for UI actions
- `CompanyIdentityModel` for initial data and validation
- its dedicated CSS file

### Why this structure is useful

The component focuses mainly on:

> displaying the page and responding to user actions

The validation rules are kept separately in the model.

---

# 8. Company Type Page

## `CompanyTypePage.jsx`

This is Step 3.

It allows the user to select:

### Company Type

Examples include:

- Contractor / Subcontractor
- General Contractor
- Staffing / Labor Provider
- Supplier / Vendor
- Other

### How the company will use TradesMap

The user can select multiple usage options.

If "Other" is selected for company type, a modal is opened so the user can provide a custom category and description.

### Important imports

- `useState` from React
- Lucide React icons
- `CompanyTypeModel`
- `companyTypePage.css`

The separate model handles validation while the component handles the visible interface and user interaction.

---

# 9. Construction Capabilities Page

## `ConstructionCapabilitiesPage.jsx`

This is Step 4.

The user can:

- search construction capabilities
- select capabilities
- remove selected capabilities
- clear selections
- add capabilities using a modal
- select how work is performed
- choose a typical project size
- choose an optional bonding capacity

The search and modal use the same local capability dataset.

### Main imports

The page imports:

- React state and memoization utilities
- Lucide React icons
- `capabilities.json`
- `ConstructionCapabilitiesModel`
- dedicated CSS

### Why `capabilities.json` is used

The capability information is stored separately from the UI.

This means the page does not need to hard-code every trade and service inside the component.

The same dataset can be used by:

- the main search
- the Add Capability modal

The current dataset contains 26 trade packages and 260 capabilities.

---

# 10. Service Area Page

## `ServiceAreaPage.jsx`

This is Step 5 and the last page included in the current HOD demonstration flow.

The user can:

- search for a primary service area
- select a city from the local location dataset
- automatically position the map at the stored coordinates
- adjust the service radius from 10 to 150 miles
- see the service radius update on the map
- add additional service areas through a modal
- remove additional service areas

### Main imports

#### React

```javascript
useState
useMemo
useEffect
```

These are used for:

- storing form data
- efficiently calculating search results
- updating the map view when the selected location changes

#### React Leaflet

```javascript
MapContainer
TileLayer
Circle
CircleMarker
useMap
```

These provide:

- the map container
- map tile display
- the service radius circle
- location markers
- programmatic map movement

#### Leaflet CSS

```javascript
import "leaflet/dist/leaflet.css";
```

This imports the styling required for Leaflet maps to display correctly.

#### Local location data

```javascript
import serviceAreas from "../data/serviceAreas.json";
```

The location search is based on the local JSON file rather than sending every search to an external geocoding service.

The dataset stores location information including:

- city
- state
- state code
- latitude
- longitude
- population

The stored latitude and longitude are used to position selected locations on the map.

### `MapViewport`

This small internal component listens for changes to the selected primary area.

When the user chooses a new location, it tells Leaflet to move the map to that location.

### Service Radius

The slider uses miles as the user-facing unit.

Leaflet circles use meters, so the application converts miles to meters:

```text
1 mile = 1609.344 meters
```

This allows the selected service radius to be displayed accurately as a map circle.

### Additional Service Areas

The "Add another area" button opens a modal.

The modal searches the same local `serviceAreas.json` dataset.

This follows the same approach used by the Construction Capabilities page.

---

# 11. Data Folder

```text
src/Company/data/
├── capabilities.json
└── serviceAreas.json
```

## `capabilities.json`

Contains the construction capability library.

It is used for:

- main capability search
- capability selection
- Add Capability modal

Keeping this information in JSON makes it easier to update the data without rewriting the UI component.

## `serviceAreas.json`

Contains the US location data used by the Service Area page.

Each record can contain information such as:

```text
City
State
State Code
Latitude
Longitude
Population
```

It is used for:

- primary service area search
- additional service area search
- map positioning
- additional location markers

---

# 12. Model Folder

```text
src/Company/model/
├── AuthModel.js
├── CompanyIdentityModel.js
├── CompanyTypeModel.js
├── ConstructionCapabilitiesModel.js
└── ServiceAreaModel.js
```

The model files contain data rules and validation logic.

This separation helps keep page components cleaner.

## `AuthModel.js`

Provides:

- initial signup form data
- signup validation

Examples of validation include:

- required names
- valid email format
- password confirmation
- required terms acceptance
- required privacy acknowledgement

## `CompanyIdentityModel.js`

Provides:

- initial company identity data
- company identity validation

It validates information such as:

- legal company name
- EIN / Tax ID format
- website format
- year established
- company description length

## `CompanyTypeModel.js`

Provides:

- default company type data
- validation for company type
- validation for selected uses
- validation for custom "Other" information

## `ConstructionCapabilitiesModel.js`

Provides:

- initial selected capabilities
- default work performed option
- default project size
- default bonding capacity
- validation rules for the page

## `ServiceAreaModel.js`

Provides:

- initial service area data
- primary area validation
- location label formatting
- local location search logic

The search checks relevant fields such as:

- city
- alternative city name
- state
- state code

Search results are ordered using the available population data and limited to avoid showing an unnecessarily large result list.

---

# 13. Scripts Folder

```text
src/Company/scripts/
└── LoginPresenter.js
```

## `LoginPresenter.js`

This file follows a presenter-style approach for the login/signup page.

Its job is to coordinate between:

- the UI form
- validation logic
- navigation

For example:

1. The user changes an input.
2. The presenter updates the form data.
3. The user submits the form.
4. The presenter asks `AuthModel` to validate the data.
5. If there are errors, they are sent back to the UI.
6. If there are no errors, the next registration step is opened.

This keeps business logic separate from the visible form as much as possible.

---

# 14. Styles Folder

```text
src/Company/styles/
├── loginPage.css
├── companyIdentityPage.css
├── companyTypePage.css
├── constructionCapabilitiesPage.css
└── serviceAreaPage.css
```

Each major page has its own CSS file.

This makes styling easier to maintain because page-specific styles are not mixed into one extremely large stylesheet.

### `loginPage.css`

Styles the:

- welcome page
- signup form
- header
- footer
- reusable login-related components

### `companyIdentityPage.css`

Styles the Company Identity page.

### `companyTypePage.css`

Styles the Company Type page and its modal.

### `constructionCapabilitiesPage.css`

Styles:

- capability search
- selected capability cards
- Add Capability modal
- work-performed options
- project size controls
- side information panels

### `serviceAreaPage.css`

Styles:

- service area search
- search result lists
- Leaflet map container
- radius slider
- location chips
- Add Area modal
- side information panels

---

# 15. External Packages Explained

The current `package.json` includes the following dependencies.

## `react`

```text
react
```

React is the main UI library.

It allows the application to be built from reusable components and updates only the parts of the interface that need to change.

## `react-dom`

```text
react-dom
```

Connects React to the web browser's DOM.

Without it, the React interface cannot be rendered into the page.

## `vite`

```text
vite
```

Vite is the development and build tool.

It provides:

- a local development server
- fast module loading
- production build generation

## `@vitejs/plugin-react`

```text
@vitejs/plugin-react
```

Adds React support to Vite.

It allows Vite to correctly process React JSX files.

## `lucide-react`

```text
lucide-react
```

Provides reusable SVG icons.

The project uses it for interface elements such as:

- arrows
- search
- check marks
- security symbols
- upload icons
- map/location icons
- help/support icons
- visibility icons

Using one icon library keeps the visual style consistent.

## `leaflet`

```text
leaflet
```

Provides the underlying interactive map functionality.

It handles:

- map rendering
- markers
- circles
- zooming
- map movement

## `react-leaflet`

```text
react-leaflet
```

Provides React components for Leaflet.

Instead of manually controlling the map through traditional JavaScript DOM code, the application can use React-style components such as:

```jsx
<MapContainer />
<TileLayer />
<Circle />
<CircleMarker />
```

This fits naturally with the rest of the React application.

---

# 16. Current Dependency Summary

```text
Application UI
└── React
    └── React DOM

Development and Build
└── Vite
    └── Vite React Plugin

Interface Icons
└── Lucide React

Maps
└── Leaflet
    └── React Leaflet

Application Data
├── capabilities.json
└── serviceAreas.json
```

---

# 17. Design and Architecture Approach

The project is organized into separate responsibilities.

```text
Components
    ↓
Display the UI and receive user actions

Models
    ↓
Store default data and validation/search rules

Data
    ↓
Store reusable JSON datasets

Scripts / Presenter
    ↓
Coordinate selected UI workflows

Styles
    ↓
Control visual appearance

App.jsx
    ↓
Controls the current page in the registration flow
```

The main goal is to avoid putting every responsibility into one file.

For example, the Service Area page does not contain the full US location dataset inside its JSX code. Instead, it imports the dataset from the data folder.

Likewise, validation is generally kept in model files rather than being mixed entirely into the page UI.

---

# 18. Current Folder Structure

```text
TradesMap/
│
├── README.md
├── package.json
├── package-lock.json              (created after npm install, if present)
├── index.html
├── vite.config.js
├── .gitignore
│
└── src/
    │
    ├── main.jsx
    ├── App.jsx
    │
    └── Company/
        │
        ├── components/
        │   ├── LoginPage.jsx
        │   ├── Header.jsx
        │   ├── Footer.jsx
        │   ├── WelcomeSection.jsx
        │   ├── FeatureItem.jsx
        │   ├── SignupForm.jsx
        │   ├── InputField.jsx
        │   ├── CompanyIdentityPage.jsx
        │   ├── CompanyTypePage.jsx
        │   ├── ConstructionCapabilitiesPage.jsx
        │   └── ServiceAreaPage.jsx
        │
        ├── data/
        │   ├── capabilities.json
        │   └── serviceAreas.json
        │
        ├── model/
        │   ├── AuthModel.js
        │   ├── CompanyIdentityModel.js
        │   ├── CompanyTypeModel.js
        │   ├── ConstructionCapabilitiesModel.js
        │   └── ServiceAreaModel.js
        │
        ├── scripts/
        │   └── LoginPresenter.js
        │
        └── styles/
            ├── loginPage.css
            ├── companyIdentityPage.css
            ├── companyTypePage.css
            ├── constructionCapabilitiesPage.css
            └── serviceAreaPage.css
```

---

# 19. How to Run the Project

From the root `TradesMap` folder:

```bash
npm install
```

Then:

```bash
npm run dev
```

Vite will display a local address in the terminal. Open that address in a browser.

For a production build:

```bash
npm run build
```

To preview the built application:

```bash
npm run preview
```

---

# 20. Current Demonstration Scope

The current HOD demonstration is focused on the first five registration steps:

```text
✓ Welcome / Create Company Account
✓ Company Identity
✓ Company Type & How You Use TradesMap
✓ Construction Capabilities
✓ Service Area
```

The sidebar also shows the future steps:

```text
6. Company Users & Primary Contact
7. Documents & Qualifications
```

These future pages can be added using the same component, model, data, and style structure.

---

# 21. Summary for Non-Technical Review

In simple terms:

> TradesMap is being developed as a structured React registration application for construction companies. The user moves step by step through the registration process. Each major page is separated into its own component, validation logic is kept in dedicated model files, reusable datasets are stored as JSON, and page styling is separated into dedicated CSS files.

The Construction Capabilities page demonstrates local searchable business data, while the Service Area page demonstrates local location search combined with interactive map visualization and a live service-radius control.

This structure is intended to keep the project understandable, maintainable, and easier to extend as additional registration steps are developed.
#   t r a d e s m a p - d e v  
 