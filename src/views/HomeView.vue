<template>
    <header style="font-size: 25px;">
        <div>
            <h2>Monitoramento</h2>
        </div>
    </header>
    <div style="display: inline-flex; margin-bottom: 1rem;">
        <div style="margin-left: 1rem;">
            <span style="font-size: larger;">Data Inicial</span>
            <div style="display: flex;">
                <input style="width: 9rem;border: 1px solid black;" type="date" class="form-control" v-model="dataInicial"
                    @change="coletarDados">
                <input style="margin-left: 0.2rem ;border: 1px solid black;" type="time" class="form-control"
                    v-model="tempoInicial" @change="coletarDados">
            </div>
        </div>
        <div style="margin-left: 1rem;">
            <span style="font-size: larger;">Data Final</span>
            <div style="display: flex;">
                <input style="width: 9rem;border: 1px solid black;" type="date" class="form-control" v-model="dataFinal"
                    @change="coletarDados">
                <input style="margin-left: 0.2rem ;border: 1px solid black;" type="time" class="form-control"
                    v-model="tempoFinal" @change="coletarDados">
            </div>
        </div>
    </div>
    <br>
    <div style="display: flex; width: 100%;">
        <div class="card mb-3" style="width: 50%; height: fit-content ;border: 1px solid rgb(0, 0, 0); margin: 0.5rem;">
            <div style="border-bottom: 1px solid rgb(0, 0, 0)">Bateria</div>
            <div style="padding: 0.3em;">
                <h6 style="text-align: start" >Nivel de bateria</h6>
                <canvas id="nivelBateria"></canvas>
                <canvas id="correnteCarregada"></canvas>
                <canvas id="energiaAcumulada"></canvas>
            </div>
        </div>

        <div style="display: flex; flex-flow: column; width: 50%; height: fit-content; align-self: baseline;">
            <div class="card mb-3" style=" height: fit-content;border: 1px solid rgb(0, 0, 0); margin: 0.5rem;">
                <div style="border-bottom: 1px solid rgb(0, 0, 0)">Temperatura</div>
                <div style="padding: 0.3em;">
                    <canvas style="z-index: 8888;" id="temperatura"></canvas>
                </div>
            </div>

            <div class="card mb-3" style="height: fit-content;border: 1px solid rgb(0, 0, 0); margin: 0.5rem;">
                <div style="border-bottom: 1px solid rgb(0, 0, 0)">Tensão</div>
                <div style="padding: 0.3em;">
                    <canvas id="tensao"></canvas>
                </div>
            </div>
            <!-- 
            <div style="display: flex;">
                <div class="card mb-3"
                    style="width: 50%;height: fit-content;border: 1px solid rgb(0, 0, 0); margin: 0.5rem;">
                    <div style="border-bottom: 1px solid rgb(0, 0, 0)">Saúde</div>
                    <div id="saude" style="color: white;">{{ saude }}</div>
                </div>

                <div class="card mb-3"
                    style="width: 50%;height: fit-content;border: 1px solid rgb(0, 0, 0); margin: 0.5rem;">
                    <div style="border-bottom: 1px solid rgb(0, 0, 0)">Status</div>
                    <div id="statusQuadrado" style="display: flex; align-items: center; justify-content: center;">
                        <span id="status" class="spinner-grow spinner-grow-sm"></span>
                        <div id="statusEscrita" style="margin-left: 0.2rem;">{{ status }}</div>
                    </div>
                </div>
            </div> -->

        </div>

    </div>
    <br><br><br>
</template>

<script>
import Chart from 'chart.js/auto';
import axios from 'axios';

export default {
    data() {
        return {
            dadosAleatorios: [],
            saude: '',
            status: 'Carregando...',
            idDispositivo: 1,
            tempoInicial: "00:00",
            tempoFinal: "",
            dataInicial: "",
            dataFinal: "",
            dadosDispositivo: "nada"
        }
    },

    mounted() {
        this.coletarDados()
    },

    methods: {

        extrairHoraDeString(dataString) {
            const data = new Date(dataString);
            const horas = ('0' + data.getHours()).slice(-2);
            const minutos = ('0' + data.getMinutes()).slice(-2);
            return `${horas}:${minutos}`;
        },

        coletarDados() {
            if (this.tempoFinal === "") {
                this.tempoFinal = new Date().getHours() + ':' + new Date().getMinutes();
                this.dataFinal = new Date().getFullYear() + '-' + ('0' + new Date().getMonth() + 1).slice(-2) + '-' + new Date().getDate();
                this.dataInicial = this.dataFinal
            }

            axios.post('http://192.168.0.6:8000/api/monitor-bateria', {
                dispositivo_id: this.idDispositivo,
                dt_inicio: this.dataInicial + ' ' + this.tempoInicial + ':00',
                dt_fim: this.dataFinal + ' ' + this.tempoFinal + ':00',
            })
                .then((response) => {
                    this.dadosDispositivo = response.data.data;
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
                        pointRadius: 1,
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
                        pointRadius: 1,
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
            this.graficoTensao();
        },

        graficoTensao() {

            let dados = this.dadosDispositivo.map(item => item.voltagem);
            dados = dados.map(temp => temp / 100);

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
                        pointRadius: 1,
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
        },

    }
}
</script>

<style>
canvas {
    max-width: 100%;
    max-height: 170px;
}
</style>