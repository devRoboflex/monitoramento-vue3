<template>
    <div id="lista" class="container">
        <div class="row">
            <div class="col-sm-12" style="text-align: center;">
                <h3 class="titulo">Dispositivos Monitorados</h3>
                <i class="fa-solid fa-download"></i>
                <hr>
                <br>
            </div>
        </div>


        <div class="row">
            <table class="table">
                <tr>
                    <th scope="col">Modelo</th>
                    <th scope="col">Marca</th>
                    <th scope="col">Última atualização</th>
                    <th scope="col">Status</th>
                    <th scope="col">Saúde</th>
                </tr>

                <tr v-for="dispositivo in listaDispositivos" :key="dispositivo">
                    <td>
                        <button style="border: none;" @click="(definirId(dispositivo.id))">
                            {{ dispositivo.modelo }}
                        </button>
                    </td>
                    <td>
                        <button style="border: none;" @click="(definirId(dispositivo.id))">
                            {{ dispositivo.marca }}
                        </button>
                    </td>
                    <td>
                        <button style="border: none;" @click="(definirId(dispositivo.id))">
                            {{ formatarData(dispositivo.updated_at.slice(0, -17)) + ' ás ' + new
                                Date(dispositivo.updated_at).getHours() + ':' + new
                                    Date(dispositivo.updated_at).getMinutes() + 'h' }}
                        </button>
                    </td>
                    <td>
                        <button style="border: none;" @click="(definirId(dispositivo.id))">
                            {{ statusBateria[statusBateria.length - 1] }}
                        </button>
                    </td>
                    <td>
                        <button style="border: none;" @click="(definirId(dispositivo.id))">
                            {{ saudeBateria[saudeBateria.length - 1] }}
                        </button>
                    </td>
                </tr>
            </table>
            <hr>
        </div>
    </div>
    <div id="painel" style="display: none;">

        <header style="font-size: 25px;">
            <div style="margin-left: 1rem;" class="position-absolute top-0 start-0">
                <i @click="buscarDispositivos" class="bi bi-house"></i>
            </div>
            <h2>Painel</h2>
        </header>

        <div style="display: flex; width: 100%">
            <div style="display: flex; width: 70%;">
                <h1 style="align-self: center; margin-left: 1rem; margin-top: 1rem;">Nome do dispositivo</h1>
            </div>
            <div style="display:flex; text-align: center; justify-content: end;">
                <div style="margin-left: 0.5rem;">
                    <span style="font-size: larger;">Data Inicial</span>
                    <div style="display: flex;">
                        <input style="width: 9rem;border: 1px solid black;" type="date" class="form-control"
                            v-model="dataInicial" @change="coletarDados">
                        <input style="margin-left: 0.2rem ;border: 1px solid black;" type="time" class="form-control"
                            v-model="tempoInicial" @change="coletarDados">
                    </div>
                </div>
                <div style="margin-left: 0.5rem;">
                    <span style="font-size: larger;">Data Final</span>
                    <div style="display: flex;">
                        <input style="width: 9rem;border: 1px solid black;" type="date" class="form-control"
                            v-model="dataFinal" @change="coletarDados">
                        <input style="margin-left: 0.2rem; margin-right: 1rem ;border: 1px solid black;" type="time"
                            class="form-control" v-model="tempoFinal" @change="coletarDados">
                    </div>
                </div>
            </div>
        </div>
        <br>
        <div style="display: flex; width: 100%;">
            <div style="display: flex;width: 50% ;flex-flow: column; height: fit-content; align-self: baseline;">

                <div class="card mb-3" style=" height: fit-content ;border: 1px solid rgb(0, 0, 0); margin: 0.5rem;">
                    <div style="border-bottom: 1px solid rgb(0, 0, 0)">Bateria (%)</div>

                    <div style="display: flex; margin: 0.5rem 0.5rem 0 0.5rem; font-size: small;">

                        <div class="card mb-3" style="width: 5rem;height: min-content;border: 1px solid rgb(0, 0, 0);">
                            <div style="border-bottom: 1px solid rgb(0, 0, 0)">Saúde</div>
                            <div style="color: black;">{{ saudeBateria[saudeBateria.length - 1] }}</div>
                        </div>

                        <div class="card mb-3"
                            style="width:6rem; height: min-content;border: 1px solid rgb(0, 0, 0); margin-left: 0.5rem;">
                            <div style="border-bottom: 1px solid rgb(0, 0, 0)">Status</div>
                            <div style="display: flex; align-items: center; justify-content: center;">
                                <div id="statusEscrita" style="margin-left: 0.2rem;">{{ statusBateria[statusBateria.length -
                                    1] }}</div>
                            </div>
                        </div>

                    </div>

                    <div>

                        <canvas id="nivelBateria"></canvas>
                    </div>
                </div>
                <div class="card mb-3" style="height: fit-content ;border: 1px solid rgb(0, 0, 0); margin: 0.5rem;">
                    <div style="border-bottom: 1px solid rgb(0, 0, 0)">Corrente (ma)</div>
                    <div style="padding: 0.3em;">
                        <canvas id="energia"></canvas>
                    </div>
                </div>
            </div>

            <div style="display: flex; flex-flow: column; width: 50%; height: fit-content; align-self: baseline;">
                <div class="card mb-3" style=" height: fit-content;border: 1px solid rgb(0, 0, 0); margin: 0.5rem;">
                    <div style="border-bottom: 1px solid rgb(0, 0, 0)">Temperatura (C°)</div>
                    <div style="padding: 0.3em;">
                        <canvas style="z-index: 8888;" id="temperatura"></canvas>
                    </div>
                </div>

                <div class="card mb-3" style="height: fit-content;border: 1px solid rgb(0, 0, 0); margin: 0.5rem;">
                    <div style="border-bottom: 1px solid rgb(0, 0, 0)">Tensão (v)</div>
                    <div style="padding: 0.3em;">
                        <canvas id="tensao"></canvas>
                    </div>
                </div>

            </div>

        </div>
        <br><br><br>
    </div>
</template>

<script>
import Chart from 'chart.js/auto';
import axios from 'axios';
import { format, parseISO } from 'date-fns';

export default {
    data() {
        return {
            listaDispositivos: [],
            dadosAleatorios: [],
            statusBateria: '',
            idDispositivo: 1,
            saudeBateria: '',
            tempoInicial: "00:00",
            tempoFinal: "23:59",
            dataInicial: "",
            dataFinal: "",
            dadosDispositivo: "nada"
        }
    },

    mounted() {

        this.setarDatas(),
            this.buscarDispositivos()
    },

    methods: {

        definirId(id) {
            this.idDispositivo = id;

            return this.coletarDados();
        },

        buscarDispositivos() {
            document.getElementById('painel').style.display = "none";
            document.getElementById('lista').style.display = ""

            axios.get('http://192.168.0.6:8000/api/dispositivo', {})
                .then((response) => {
                    this.listaDispositivos = response.data.data;
                })
                .catch((error) => {
                    console.error(error);
                });
        },

        extrairHoraDeString(dataString) {
            const data = new Date(dataString);
            const horas = ('0' + data.getHours()).slice(-2);
            const minutos = ('0' + data.getMinutes()).slice(-2);
            return `${horas}:${minutos}`;
        },

        formatarData(input) {
            const data = parseISO(input);
            return format(data, 'dd/MM/yy');
        },

        setarDatas() {

            this.dataFinal = new Date().getFullYear() + '-' + ('0' + new Date().getMonth() + 1).slice(-2) + '-' + new Date().getDate();
            this.dataInicial = new Date().getFullYear() + '-' + ('0' + new Date().getMonth() + 1).slice(-2) + '-' + (new Date().getDate() - 1)
        },

        coletarDados() {

            document.getElementById('painel').style.display = "";
            document.getElementById('lista').style.display = "none"

            axios.post('http://192.168.0.6:8000/api/monitor-bateria', {
                dispositivo_id: this.idDispositivo,
                dt_inicio: this.dataInicial + ' ' + this.tempoInicial + ':00',
                dt_fim: this.dataFinal + ' ' + this.tempoFinal + ':00',
            })
                .then((response) => {
                    this.dadosDispositivo = response.data;
                    return this.graficoTemperatura();
                })
                .catch((error) => {
                    console.error(error);
                });

        },

        graficoTemperatura() {

            let dados = this.dadosDispositivo.map(item => item.temperatura);
            dados = dados.map(temp => temp / 10);

            let labels = this.dadosDispositivo.map(item => item.created_at);
            labels = labels.map(dataString => this.extrairHoraDeString(dataString));
            labels = labels.map((item) => {
                return `${item}`;
            });

            const canvas = document.getElementById('temperatura');
            const ctx = canvas.getContext('2d');
            if (canvas.chart) {
                canvas.chart.destroy();
            }

            canvas.chart = new Chart(ctx, {
                data: {
                    labels: labels,
                    datasets: [{
                        data: dados,
                        type: "line",
                        label: 'Temperatura',
                        backgroundColor: 'black',
                        borderColor: 'black',
                        borderWidth: 1.5,
                        tension: 0.3,
                        pointRadius: 2,
                    }],
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: true,
                    plugins: {
                        legend: {
                            display: false,
                            // labels: {
                            //     boxWidth: 25,
                            //     boxHeight: 10,
                            //     color: 'rgb(0, 0, 0)',
                            //     font: {
                            //         size: 15,
                            //         weight: 'bolder'
                            //     }
                            // }
                        }
                    },
                },
            });
            this.nivelBateria();
        },

        nivelBateria() {

            this.saudeBateria = this.dadosDispositivo.map(item => item.bateriaSaude_nome);
            this.statusBateria = this.dadosDispositivo.map(item => item.bateriaStatus_nome);

            let dados = this.dadosDispositivo.map(item => item.bateriaNivel);

            let labels = this.dadosDispositivo.map(item => item.created_at);
            labels = labels.map(dataString => this.extrairHoraDeString(dataString));
            labels = labels.map((item) => {
                return `${item}`;
            });

            this.dadosAleatorios = dados

            const canvas = document.getElementById('nivelBateria');
            const ctx = canvas.getContext('2d');
            if (canvas.chart) {
                canvas.chart.destroy();
            }

            canvas.chart = new Chart(ctx, {
                data: {
                    labels: labels,
                    datasets: [{
                        data: dados,
                        type: "line",
                        label: 'Nivel de Bateria',
                        backgroundColor: 'black',
                        borderColor: 'black',
                        borderWidth: 1.5,
                        tension: 0.3,
                        pointRadius: 2,
                    }],
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: true,
                    plugins: {
                        legend: {
                            display: false,
                        },
                    },
                    scales: {
                        y: {
                            min: 0,
                            max: 100,
                        }
                    }
                },
            });
            this.graficoTensao();
        },

        graficoTensao() {

            let dados = this.dadosDispositivo.map(item => item.voltagem);
            dados = dados.map(temp => temp / 1000);

            let labels = this.dadosDispositivo.map(item => item.created_at);
            labels = labels.map(dataString => this.extrairHoraDeString(dataString));
            labels = labels.map((item) => {
                return `${item}`;
            });

            this.dadosAleatorios = dados

            const canvas = document.getElementById('tensao');
            const ctx = canvas.getContext('2d');
            if (canvas.chart) {
                canvas.chart.destroy();
            }

            canvas.chart = new Chart(ctx, {
                data: {
                    labels: labels,
                    datasets: [{
                        data: dados,
                        type: "line",
                        label: '',
                        backgroundColor: 'black',
                        borderColor: 'black',
                        borderWidth: 1.5,
                        tension: 0.3,
                        pointRadius: 2,
                    }],
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: true,
                    plugins: {
                        legend: {
                            display: false,
                        }
                    },
                },
            });

            return this.graficoEnergia();
        },

        graficoEnergia() {

            let dadosEnergiaA = this.dadosDispositivo.map(item => item.energiaAtual_ma);
            dadosEnergiaA = dadosEnergiaA.map(temp => temp / 100);

            let dadosEnergiaM = this.dadosDispositivo.map(item => item.energiaMedia_ma);
            dadosEnergiaM = dadosEnergiaM.map(temp => temp / 100);

            let labels = this.dadosDispositivo.map(item => item.created_at);
            labels = labels.map(dataString => this.extrairHoraDeString(dataString));
            labels = labels.map((item) => {
                return `${item}`;
            });

            this.dadosAleatorios = dadosEnergiaM

            const canvas = document.getElementById('energia');
            const ctx = canvas.getContext('2d');
            if (canvas.chart) {
                canvas.chart.destroy();
            }

            canvas.chart = new Chart(ctx, {
                data: {
                    labels: labels,
                    datasets: [{
                        data: dadosEnergiaA,
                        type: "line",
                        label: 'Corrente real',
                        backgroundColor: 'black',
                        borderColor: 'black',
                        borderWidth: 1.5,
                        tension: 0.3,
                        pointRadius: 2,
                    },
                    {
                        data: dadosEnergiaM,
                        type: "line",
                        label: 'Corrente Média',
                        backgroundColor: 'red',
                        borderColor: 'red',
                        borderWidth: 1.5,
                        tension: 0.3,
                        pointRadius: 2,
                    }],
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: true,
                    plugins: {
                        legend: {
                            display: true,
                        }
                    },
                },
            });
        },

    }
}
</script>

<style>
canvas {
    max-width: 100%;
    max-height: 200px;
}
</style>