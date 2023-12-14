import type { Categoria } from './categoria'
import type { Unidad } from './unidad'

export interface Producto {
  id: number
  idCategoria: number
  codigo: string
  descripcion: string
  precio: number;
  idUnidad: number
  existenciaProducto: number
  urlImagen: string

  unidad: Unidad
  categoria: Categoria
}
