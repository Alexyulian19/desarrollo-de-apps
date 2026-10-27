import axios from 'axios'

// Convierte cualquier error de la API en un mensaje legible
export function getErrorMessage(err: unknown): string {
  if (axios.isAxiosError(err)) {
    if (!err.response) {
      return 'No hay conexión con el servidor. Revisa la IP del .env y que estés en la misma red del backend.'
    }
    const data = err.response.data as { message?: string; errors?: Record<string, string[]> }
    if (data?.errors) return Object.values(data.errors).flat().join(' ')
    if (data?.message) return data.message
  }
  return 'Ocurrió un error inesperado.'
}

export const formatCOP = (value: number) =>
  new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(value)