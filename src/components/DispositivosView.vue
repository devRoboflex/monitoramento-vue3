<template>
    <div class="container">
        <div class="row">
            <div class="col-sm-12" style="text-align: center;">
                <h3 class="titulo">Dispositivos Monitorados</h3>
                <i class="fa-solid fa-download"></i>
                <hr>
                <br>
            </div>
        </div>
        <div class="row">
            <div class="col-sm-12">
                <table class="table table-hover">

                    <tr>
                        <th scope="col">Modelo</th>
                        <th scope="col">Marca</th>
                        <th scope="col">Tempo</th>
                        <th scope="col">Status</th>
                        <th scope="col">Saúde</th>
                    </tr>
                    <tr v-for="dispositivo in listaDispositivos" :key="dispositivo">
                        <td>{{dispositivo.modelo}}</td>
                        <td>{{ dispositivo.marca }}</td>
                        <td>10 dias</td>
                        <td>Parado</td>
                        <td>Boa</td>
                    </tr>
                </table>
            </div>
        </div>
        
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            listaDispositivos: [],
        };
    },
    mounted() {
        this.buscarDispositivos();
    },
    methods: {
        teste() {
            console.log("aqui");
        },
        buscarDispositivos() {
            axios.get('http://192.168.0.6:8000/api/dispositivo', {})
                .then((response) => {
                this.listaDispositivos = response.data.data;
            })
                .catch((error) => {
                console.error(error);
            });
        },
    },
}
</script>
