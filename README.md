# Duka – Frontend Application

The frontend of **Duka**, a modern eCommerce platform built with **Next.js**, **React**, and **TypeScript**. It integrates features such as authentication, responsive UI with MUI, animations, data visualization, payments via Stripe, and more.

---

## ✨ Features

- ⚛️ React 19 + Next.js 15
- 🔐 Authentication via `next-auth`
- 🎨 Fully responsive UI using **Material UI (MUI)**
- 🧾 Forms with **Formik** and validation via **Yup**
- 🧠 State management using **Redux Toolkit**
- 📈 Data visualization with **Chart.js**
- 💸 Stripe payments integration
- 📦 Modular components and layout structure
- 🌙 Light/Dark mode support with `next-themes`
- 🌐 Animations with AOS and infinite logo sliders
- 📅 Relative time formatting via `timeago.js`

---

## 🛠 Tech Stack

- **Framework:** Next.js 15
- **Language:** TypeScript
- **Styling:** Tailwind CSS, MUI, styled-components, Emotion
- **State Management:** Redux Toolkit
- **Authentication:** NextAuth.js
- **Payments:** Stripe (Stripe.js & React Stripe.js)
- **Forms:** Formik + Yup
- **Charts:** Chart.js + react-chartjs-2

---

## 📂 Project Structure
 frontend/ ├── pages/ ├── components/ ├── styles/ ├── store/ ├── public/ ├── utils/ ├── hooks/ └── ...

## 📦 Scripts

- `npm run dev` – Start the development server
- `npm run build` – Build for production
- `npm run start` – Start the production server
- `npm run lint` – Run ESLint checks

---

## ⚙️ Environment Variables

Create a `.env.local` file in the root of your frontend project with the following:

```env
NEXT_PUBLIC_SERVER_URI = "http://localhost:5000/api/" -- for backend logic testing and integration
NEXT_PUBLIC_CLIENT_URI = "http://localhost:3000"
GOOGLE_CLIENT_ID = your_google_client_id
GOOGLE_CLIENT_SECRET = your_google_client_secret
GITHUB_CLIENT_ID = your_github_client_id
GITHUB_CLIENT_SECRET = your_github_client_secret
SECRET = any_secret
NEXT_PUBLIC_STRIPE_PUBLIC_KEY = your_stripe_public_key
STRIPE_SECRET_KEY = your_stripe_secret_key
```

## 📄 License
This project is licensed under the ISC License.

© Thomas Aggrey Odhiambo.

