// Top-level app shell: routes only. French-only, no language toggle.
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Invitation } from '@/pages/Invitation'
import { Admin } from '@/pages/Admin'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Invitation />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  )
}
