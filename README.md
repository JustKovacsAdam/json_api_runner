# JSON API Runner

A dynamic web-based interface for testing and interacting with various backend services. Built to simulate an internal API explorer tool where users can execute service methods either through form-generated input fields or raw JSON.

---

## ✨ Features
- ✅ Dynamic UI generation based on apiMetadata
- 🧾 Raw JSON input toggle
- 🌓 Light/Dark theme switching
- ↔️ Form alignment control (left/right)
- 📦 Modular architecture with separation of concerns
- 🧠 Smart handling of single/multiple methods per service
- 📸 Supports image previews from imageService
- ➗ Advanced method support like matrix operations

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git https://github.com/JustKovacsAdam/json_api_runner.git
cd json_api_runner
```

### 2. Install Dependencies

### 2. Install dependencies & start the dev server

```bash
npm install
npm run dev
```

The app should now be running at http://localhost:3000. Open it in your browser to begin testing APIs.

## 🛠 Usage
- Select a service from the dropdown.
- If the service has multiple methods, a second dropdown will appear where you can select current method.
- Input parameters will be generated based on the selected method.

Alternatively

- Select a service from the dropdown.
- Toggle "Enable raw JSON input" and paste a custom request body.
- Click Run to send the request and see the formatted response.

(Included sample values for both raw JSON and input parameters in sampleDataSet file)

## 🚧 Possible Improvements

- Improve matrix input handling with a more intuitive UI
- Enhance validation and error messages for form inputs
- Stylize response display using syntax highlight libraries
- Create more user-friendly progress and error feedback

## 🤝 Acknowledgements
Built as an assignment to demonstrate dynamic frontend generation and API design skills.