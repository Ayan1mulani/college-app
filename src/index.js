import React from 'react';
import ReactDOM from 'react-dom/client';
import LoginPage from './Components/LoginPage'
import { createBrowserRouter , RouterProvider } from 'react-router-dom';
import Home from './Principal/Home';
import StudentDashboard from './Student/StudentDashboard';
import Branch from './Principal/Branch';
import Classmates from './Student/Classmates';
import MessageScreen from './Student/MessageScreen';
import TimeTable from './Components/TimeTable';
import AddT from './Principal/AddT';
import AddS from './Principal/AddS';
import ViewTimeTable from './Student/ViewTimeTable';
import TeacherList from './Principal/TeacherList';
import AddSubject from './Principal/AddSubject';
import Teacher from './Teacher/Teacher'
import App from './App';
import Login1 from './Components/Login1';
const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App/>,  
    children: [
      { path: "/", element: <Login1 /> },
      { path: "/LoginPage", element: <LoginPage/> },
      { path: "admin", element: <Home /> },
      { path: "student", element: <StudentDashboard /> },
      { path: "add/teacher", element: <AddT /> },
      { path: "add/student", element: <AddS /> },
      { path: "view/teachers", element: <Branch /> },
      { path: "view/classmates", element: <Classmates /> },
      { path: "messages", element: <MessageScreen /> },
      { path: "table", element: <TimeTable /> },
      { path: "view/timetable", element: <ViewTimeTable /> },
      { path: "teachers/:branch", element: <TeacherList /> },
      { path: "add/subjects", element: <AddSubject />},
      {path:"teacher", element: <Teacher/>}  ,   
      { path: "*", element: <h1>404 - Page Not Found</h1> },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={appRouter} />
  </React.StrictMode>
);