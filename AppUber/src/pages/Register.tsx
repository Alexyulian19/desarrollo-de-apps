import { useState } from 'react'
import type { FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import api from '../api/axios'
import { getErrorMessage } from '../utils/errors'

const initial = {
  name: '',
  email: '',
  phone: '',
  password: '',
  role: 'client' as 'client' | 'driver',
  license_number: '',
  plate: '',
  brand: '',
  model: '',
  year: new Date().getFullYear(),
  capacity: 4,
  color: '',
}

export default function Register() {
  const navigate = useNavigate()
  const [form, setForm] = useState(initial)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)

  const set = (field: keyof typeof initial, value: string | number) => setForm({ ...form, [field]: value })

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    const { name, email, phone, password, role } = form
    const body = role === 'client' ? { name, email, phone, password, role } : form
    try {
      await api.post('/auth/register', body)
      setSuccess(
        role === 'driver'
          ? 'Cuenta creada. Un administrador debe aprobarte antes de recibir viajes.'
          : 'Cuenta creada. Ya puedes iniciar sesión.'
      )
      setTimeout(() => navigate('/login'), 2000)
    } catch (err) {
      setError(getErrorMessage(err))
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="auth">
      <h1 className="brand-lg">AppUber</h1>
      <form className="card form" onSubmit={handleSubmit}>
        <h2>Crear cuenta</h2>

        <div className="segmented">
          <button type="button" className={form.role === 'client' ? 'active' : ''} onClick={() => set('role', 'client')}>
            Quiero viajar
          </button>
          <button type="button" className={form.role === 'driver' ? 'active' : ''} onClick={() => set('role', 'driver')}>
            Quiero conducir
          </button>
        </div>

        <label>
          Nombre completo
          <input value={form.name} onChange={(e) => set('name', e.target.value)} required />
        </label>
        <label>
          Correo
          <input type="email" value={form.email} onChange={(e) => set('email', e.target.value)} required />
        </label>
        <label>
          Teléfono
          <input value={form.phone} onChange={(e) => set('phone', e.target.value)} required />
        </label>
        <label>
          Contraseña
          <input type="password" minLength={6} value={form.password} onChange={(e) => set('password', e.target.value)} required />
        </label>

        {form.role === 'driver' && (
          <fieldset>
            <legend>Licencia y vehículo</legend>
            <label>
              Número de licencia
              <input value={form.license_number} onChange={(e) => set('license_number', e.target.value)} required />
            </label>
            <div className="grid-2">
              <label>
                Placa
                <input value={form.plate} onChange={(e) => set('plate', e.target.value.toUpperCase())} required />
              </label>
              <label>
                Color
                <input value={form.color} onChange={(e) => set('color', e.target.value)} required />
              </label>
              <label>
                Marca
                <input value={form.brand} onChange={(e) => set('brand', e.target.value)} required />
              </label>
              <label>
                Modelo
                <input value={form.model} onChange={(e) => set('model', e.target.value)} required />
              </label>
              <label>
                Año
                <input type="number" value={form.year} onChange={(e) => set('year', Number(e.target.value))} required />
              </label>
              <label>
                Capacidad
                <input type="number" min={1} max={8} value={form.capacity} onChange={(e) => set('capacity', Number(e.target.value))} required />
              </label>
            </div>
          </fieldset>
        )}

        {error && <p className="alert alert-error">{error}</p>}
        {success && <p className="alert alert-ok">{success}</p>}
        <button className="btn" type="submit" disabled={loading || !!success}>
          {loading ? 'Creando cuenta…' : 'Crear cuenta'}
        </button>
        <p className="muted">
          ¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link>
        </p>
      </form>
    </main>
  )
}