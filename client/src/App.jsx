import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { TaskProvider } from "./context/tasksContext";
import { AuthProvider } from "./context/authContext.jsx";

import TasksPage from "./pages/tasksPage.jsx";
import TaskFormPage from "./pages/taskFormPage.jsx";
import HomePage from "./pages/homepage.jsx";
import RegisterPage from "./pages/registerpage.jsx";
import LoginPage from "./pages/loginpage.jsx";

import ProtectedRoute from "./protectedRoute.jsx";


function App (){
  return (
   <AuthProvider>
    <TaskProvider>
    <BrowserRouter>
    <main className="container content-container mx-auto px-10 md:px-0">
            <Navbar />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route element={<ProtectedRoute />}>
                <Route path="/tasks" element={<TasksPage />} />
                <Route path="/add-task" element={<TaskFormPage />} />
                <Route path="/tasks/:id" element={<TaskFormPage />} />
                <Route path="/profile" element={<h1>Profile</h1>} />
              </Route>
            </Routes>
          </main>
    </BrowserRouter>
    </TaskProvider>
   </AuthProvider>
  )
}

export default App