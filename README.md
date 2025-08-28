# Life Portfolio Online Hub

A modern, responsive multi-user portfolio platform built with React, TypeScript, Tailwind CSS, Clerk Authentication, and Builder.io CMS.

## Environment Setup

1. Copy `.env.example` to `.env` and fill in your keys:

```bash
cp .env.example .env
```

2. Get your Clerk Publishable Key:
   - Sign up at https://go.clerk.com/lovable
   - Create a new application
   - Copy the publishable key starting with `pk_`

3. Get your Builder.io Public Key:
   - Sign up at https://builder.io
   - Create a new space
   - Copy the public API key

## Features

- **Multi-user Authentication**: Powered by Clerk
- **Visual Page Builder**: Drag-and-drop content editing with Builder.io
- **Custom Public URLs**: Each user gets `/u/username` and `/u/username/page-slug`
- **Dashboard**: Manage pages, view analytics, edit content
- **Responsive Design**: Mobile-first approach with Tailwind CSS

✨ Portfolio platform built with **Vite + React + TailwindCSS + TypeScript + Clerk + Builder.io**

---

## 🌐 Live Preview

This website is deployed privately via Netlify and accessible from any device:


👉 [Click here to view the live website](https://life-folio.netlify.app/)

  [![Netlify Status](https://api.netlify.com/api/v1/badges/30583914-2be3-40d0-a02b-8ceb9ab1b04e/deploy-status)](https://app.netlify.com/projects/life-folio/deploys)


---

## 💡 Project Overview

This project was developed as a professional and customizable portfolio platform for showcasing work, skills, and contact information. It features a clean layout, subtle animations, and elegant UI components.

---

## 🛠️ Tech Stack

- **bun** – Modern JavaScript runtime and package manager (used instead of npm)
- **Vite** – Frontend build tool
- **React 18** – JavaScript UI library
- **TypeScript** – Strong typing
- **Tailwind CSS** – Utility-first CSS framework
- **shadcn/ui** – Modern and customizable component system
- **Radix UI** – Accessible and composable UI primitives
- 
---

## 🚀 Getting Started Locally

To run this project locally, follow these steps:

```bash
# Clone the repository
git clone https://github.com/Yara-hneif/life-folio-online-hub.git

# Navigate to the project directory
cd life-folio-online-hub

# Install dependencies
bun install

# Run the development server
bun run dev

```
