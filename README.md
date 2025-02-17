# Stride - Personal Task Management System

Stride is a **modern and efficient** personal task management system designed to help users **organize tasks, track progress, and manage projects seamlessly**. Built with **Next.js 15, PostgreSQL, Drizzle ORM, Zustand, React Query, TypeScript, and Tailwind CSS**, Stride ensures a **responsive UI, optimized database queries, and smooth state management**.

## 🚀 Live Demo
🔗 **[Stride Deployment](https://stride-cyan.vercel.app/)**

## 📌 Features
- 🔒 **Authentication:** Secure login/signup system using JWT and cookies.  
- 📝 **Task Management:** Create, update, mark tasks as complete, and filter/search tasks.  
- 📊 **Dashboard Analytics:** Visual overview of task statistics, upcoming deadlines, and project status.  
- 📅 **Calendar View:** Manage deadlines efficiently with an intuitive calendar.   
- 🎨 **Modern UI:** Responsive and dark mode support with Tailwind CSS.  
- 🏎️ **3D Animation:** Interactive **Spline 3D model** that reacts to user interactions.  
- ⚡ **Optimized Performance:** Efficient state management with Zustand and API fetching using React Query.  

## 🛠️ Tech Stack
- **Frontend:** Next.js 15, TypeScript, Tailwind CSS  
- **State Management:** Zustand  
- **API Fetching & Caching:** React Query  
- **Backend:** Next.js API routes, Drizzle ORM, PostgreSQL  
- **Authentication:** JWT (JSON Web Tokens), HTTP-only cookies  
- **3D Animation:** Spline (for interactive 3D effects)  

## 🏗️ Installation & Setup
```bash
git clone https://github.com/your-username/stride.git
cd stride
npm install
npm run dev

```
Set up environment variables in a .env.local file:

```bash
DATABASE_URL=your_postgresql_url
JWT_SECRET=your_secret_key

```

## API Endpoints

| Method | Endpoint            | Description              |
|--------|---------------------|--------------------------|
| POST   | `/api/auth/signup`  | User registration       |
| POST   | `/api/auth/login`   | User login              |
| GET    | `/api/core/tasks`   | Fetch all tasks         |
| PUT    | `/api/core/tasks`   | Update task completion  |
| GET    | `/api/core/projects` | Fetch all projects     |


## 🎯 How It Works
- Sign up/login to access your task dashboard.
- Add tasks and projects, assign priorities, and set deadlines.
- Track task completion progress with real-time updates.
- Search and filter tasks for quick access.
- Experience interactive 3D animations for a modern UI feel.
- View project details and manage related tasks efficiently.

  ## Screenshot
 
s
  ![Screenshot 2025-02-17 203336](https://github.com/user-attachments/assets/682e4c4d-42db-4841-a35a-b9f5fc6d42ac)
![Screenshot 2025-02-17 203413](https://github.com/user-attachments/assets/4b21bfbb-2e77-495b-aa1d-15ece678185a)
![Screenshot 2025-02-17 203539](https://github.com/user-attachments/assets/889269d6-aae9-4306-b3f3-0a3a64e36079)

 ## What I Learned
Working on Stride has been an incredible learning experience. Some key takeaways:

- Next.js 15 & API Routes – Improved my understanding of server-side logic and API handling within Next.js.
- Drizzle ORM & PostgreSQL – Gained hands-on experience with schema migrations and optimized database queries.
- Zustand & React Query – Learned state management best practices, API caching, and optimistic updates for a better UX.
- Tailwind CSS & UI Design – Explored responsive design, dark mode implementation, and modern UI trends.
- JWT Authentication & Cookies – Strengthened my knowledge of secure authentication mechanisms.
- Spline 3D Animations – Experimented with interactive 3D models and how they can enhance user experience.





