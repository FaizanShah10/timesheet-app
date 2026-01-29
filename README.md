## 📌 Implemented Requirements

### Dashboard Page
- Displays a list of timesheet entries in a **table view**
- Table columns:
  - Week #
  - Date
  - Status
  - Actions

### Actions
- **Create** → Opens modal 
- **Update** → Opens modal 
- **View** → Opens Modal

### Add / Edit Modal
- Modal-based form (no page navigation)
- Fields:
  - Project
  - Type of Work
  - Task Description
  - Hours
- Inline form validation
- Submission blocked until all required fields are valid

### Validation & Error Handling
- Required field validation
- Hour value validation (> 0)
- Inline error messages per field
- Defensive API error handling
- Console logs for validation and submission failures

### Authentication
- Login page implemented
- Session-based authentication using **NextAuth**
- Protected dashboard route
- Logout functionality

### Responsive Layout
- Fully responsive UI
- Matches provided Figma designs
- Works across desktop and smaller screen sizes

---

## 🛠 Tech Stack

- **Next.js (App Router)**
- **TypeScript**
- **Tailwind CSS**
- **NextAuth.js**
- **Mock Internal APIs (Next.js API routes)**
- **Vercel** (Deployment)

---

## 🔌 Internal APIs (Mocked)

No database is used.  
All APIs are implemented using **Next.js API routes** with in-memory mock data.
