
import { Route, Routes } from 'react-router'
import HomePage from './pages/HomePage'
import About from './pages/About'
import Contact from './pages/Contact'
import Policy from './pages/Policy'
import Pagenotfound from './pages/Pagenotfound'
import Register from './pages/Auth/Register'
import Login from './pages/Auth/Login'
import Dashboard from './pages/user/Dashboard'
import { PrivateRoute } from './components/routes/PrivateRoutes'
import EmailVerification from './pages/Auth/EmailVerification'
import OtpVerification from './pages/Auth/OtpVerification'
import ForgotPassword from './pages/Auth/ForgotPassword'
import { AdminRoute } from './components/routes/AdminRoute'
import AdminDashboard from './pages/Admin/AdminDashboard'
import CreateCategory from './pages/Admin/CreateCategory'
import CreateProgram from './pages/Admin/CreateProgramLevel'
import CreateScholarship from './pages/Admin/CreateScholarship'
import CreateLocation from './pages/Admin/CreateLocation'
import CreateUniversityName from './pages/Admin/CreateUniversityName'
import Scholarship from './pages/Admin/Scholarship'
import UpdateScholarship from './pages/Admin/UpdateScholarship'
import CreateUniversityNameTag from './pages/Admin/CreateUniversityNameTag'
import ScholarshipPage from './pages/ScholarshipPage'
import Rights from './pages/Rights'
import UniversityNameTag from './pages/UniversityNameTag'
import Bookmark from './pages/Bookmark'
import ScholarshipDetails from './pages/ScholarshipDetails'


function App() {

  return (
    <>
    <Routes>
      <Route path='/' element={<HomePage/>} />
      <Route path='/scholarships' element={<ScholarshipPage/>} />
      <Route path='/scholarship/:slug' element={<ScholarshipDetails/>} />
      <Route path='/rights' element={<Rights/>} />
      <Route path='/universitynametag' element={<UniversityNameTag/>} />
      <Route path='/bookmarks' element={<Bookmark/>} />
      <Route path='/register' element={<Register/>} />
      <Route path='/login' element={<Login/>} />
      <Route path='/verify-email' element={<EmailVerification/>} />
      <Route path='/verify-otp' element={<OtpVerification/>} />
      <Route path='/forgot-password' element={<ForgotPassword/>} />

      <Route path='/dashboard' element={<PrivateRoute/>}>
        <Route path='user' element={<Dashboard/>} />
      </Route>
      
      <Route path='/dashboard' element={<AdminRoute/>}>
        <Route path='admin' element={<AdminDashboard/>} />
        <Route path='admin/create-category' element={<CreateCategory/>} />
        <Route path='admin/create-programlevel' element={<CreateProgram/>} />
        <Route path='admin/create-location' element={<CreateLocation/>} />
        <Route path='admin/create-universityname' element={<CreateUniversityName/>} />
        <Route path='admin/create-universitynametag' element={<CreateUniversityNameTag/>} />
        <Route path='admin/create-scholarship' element={<CreateScholarship/>} />
        <Route path='admin/scholarship/:slug' element={<UpdateScholarship/>} />
        <Route path='admin/manage-scholarships' element={<Scholarship/>} />
      </Route>

      <Route path='/about' element={<About/>} />
      <Route path='/contact' element={<Contact/>} />
      <Route path='/policy' element={<Policy/>} />
      <Route path='*' element={<Pagenotfound/>} />
    </Routes>
    </>
  )
}

export default App
