<script setup lang="ts">
import type { Producto } from '@/models/producto';
import router from '@/router';
import { ref, onMounted } from 'vue';
import http from '@/plugins/axios'

const props = defineProps<{
    ENDPOINT_API: string
}>()

const ENDPOINT = props.ENDPOINT_API ?? ''
var productos = ref<Producto[]>([])


async function getProductos() {
    productos.value = await http.get(ENDPOINT).then((response) => response.data)
}

function toEdit(id: number) {
    router.push(`/productos/editar/${id}`)
}

async function toDelete(id: number) {
    var r = confirm('¿Está seguro que se desea eliminar el Producto?')
    if (r == true) {
        await http.delete(`${ENDPOINT}/${id}`).then(() => getProductos())
    }
}

onMounted(() => {
    getProductos()
})
</script>

<template>
    <div class="container">
        <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
                <li class="breadcrumb-item">
                    <RouterLink to="/">Inicio</RouterLink>
                </li>
                <li class="breadcrumb-item active" aria-current="page">Productos</li>
            </ol>
        </nav>

        <div class="row">
            <h2>Lista de Productos</h2>
            <div class="col-12">
                <RouterLink to="/productos/crear">Crear Nuevo</RouterLink>
            </div>
        </div>

        <div class="table-responsive">
            <table class="table table-bordered">
                <thead>
                    <tr>
                        <th scope="col">N°</th>
                        <th scope="col">Categoría</th>
                        <th scope="col">Código</th>
                        <th scope="col">Descripción</th>
                        <th scope="col">Unidad</th>
                        <th scope="col">Precio</th>
                        <th scope="col">Existencia Producto</th>
                        <th scope="col">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    <tr class="table-light" v-for="(producto, index) in productos.values()" :key="producto.id">
                        <th scope="row">{{ index + 1 }}</th>
                        <td>{{ producto.descripcion }}</td>
                        <td>{{ producto.codigo }}</td>
                        <td>{{ producto.descripcion }}</td>
                        <td>{{ producto.precio }}</td>
                        <td>{{ producto.existenciaProducto }}</td>
                        <td>
                            <button class="btn btn-primary btn-sm" @click="toEdit(producto.id)"><i
                                    class="fa fa-edit"></i></button> |
                            <button class="btn btn-danger btn-sm" @click="toDelete(producto.id)"><i
                                    class="fa fa-trash"></i></button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<style></style>