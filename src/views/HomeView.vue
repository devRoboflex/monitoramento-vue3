<template>
    <header style="font-size: larger; padding: 0.2em;">
        Monitoramento
    </header>


    <div style="display: flex; width: 100%;">
        <div class="card mb-3" style="width: 50%; height: fit-content ;border: 1px solid rgb(0, 0, 0); margin: 0.5rem;">
            <div style="border-bottom: 1px solid rgb(0, 0, 0)">Carga</div>
            <div style="padding: 0.3em;">
                <canvas id="capacidade"></canvas>
                <canvas id="correnteCarregada"></canvas>
                <canvas id="energiaAcumulada"></canvas>
            </div>
        </div>

        <div style="display: flex; flex-flow: column; width: 50%; height: fit-content; align-self: baseline;">
            <div class="card mb-3" style=" height: fit-content;border: 1px solid rgb(0, 0, 0); margin: 0.5rem;">
                <div style="border-bottom: 1px solid rgb(0, 0, 0)">Temperatura</div>
                <div style="padding: 0.3em;">
                    <canvas id="temperatura"></canvas>
                </div>
            </div>

            <div class="card mb-3" style="height: fit-content;border: 1px solid rgb(0, 0, 0); margin: 0.5rem;">
                <div style="border-bottom: 1px solid rgb(0, 0, 0)">Tensão</div>
                <div style="padding: 0.3em;">
                    <canvas id="tensao"></canvas>
                </div>
            </div>

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
            </div>

        </div>

    </div>
    <br><br><br>
</template>

<script>
import Chart from 'chart.js/auto';

export default {
    data() {
        return {
            dadosAleatorios: [],
            saude: '',
            status: 'Carregando...'
        }
    },

    mounted() {
        this.graficoTemperatura(),
            this.graficoCapacidade(),
            this.graficoCorrente(),
            this.graficoEnergia(),
            this.graficoTensao(),
            this.atualizarSaude(),
            this.atualizarStatus()
    },

    methods: {
        atualizarStatus() {
            setTimeout(() => {

                const opcoesStatus = ["Monitorado!", "Desatualizado"];
                const indiceAleatorio = Math.floor(Math.random() * opcoesStatus.length);
                this.status = opcoesStatus[indiceAleatorio];

                if (this.status == "Monitorado!") {
                    document.getElementById('status').style.display = "none";
                    document.getElementById('statusQuadrado').style.backgroundColor = "rgb(0, 190, 0)";
                    document.getElementById('statusEscrita').style.color = "white"
                } else {
                    document.getElementById('status').style.display = "none";
                    document.getElementById('statusQuadrado').style.backgroundColor = "rgb(200, 0, 0)";
                    document.getElementById('statusEscrita').style.color = "white"
                }
            }, 2000);
        },

        atualizarSaude() {
            const opcoesSaude = ["Excelente", "Boa", "Ruim", "Muito Ruim"];
            const indiceAleatorio = Math.floor(Math.random() * opcoesSaude.length);
            this.saude = opcoesSaude[indiceAleatorio];

            if (this.saude === "Excelente" || this.saude === "Boa") {
                document.getElementById('saude').style.backgroundColor = "rgb(0, 190, 0)";
            } else {
                document.getElementById('saude').style.backgroundColor = "rgb(200, 0, 0)";
            }
        },

        gerarNumeros() {

            for (let i = 0; i < 13; i++) {
                this.dadosAleatorios.push(Math.floor(Math.random() * 100)); // Gere números aleatórios de 0 a 99
            }
        },

        graficoTemperatura() {
            this.dadosAleatorios = [];
            this.gerarNumeros();
            const canvas = document.getElementById('temperatura');
            const ctx = canvas.getContext('2d');
            if (canvas.chart) {
                canvas.chart.destroy();
            }

            canvas.chart = new Chart(ctx, {
                data: {
                    labels: ["09:00", "09:05", "09:10", "09:15", "09:20", "09:25", "09:30", "09:35", "09:40", "09:45", "09:50", "09:55", "10:00"],
                    datasets: [{
                        data: this.dadosAleatorios,
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
                },
            });
        },

        graficoCapacidade() {
            this.dadosAleatorios = [];
            this.gerarNumeros();
            const canvas = document.getElementById('capacidade');
            const ctx = canvas.getContext('2d');
            if (canvas.chart) {
                canvas.chart.destroy();
            }

            canvas.chart = new Chart(ctx, {
                data: {
                    labels: ["09:00", "09:05", "09:10", "09:15", "09:20", "09:25", "09:30", "09:35", "09:40", "09:45", "09:50", "09:55", "10:00"],
                    datasets: [{
                        data: this.dadosAleatorios,
                        type: "line",
                        label: 'Corrente',
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
                },
            });
        },

        graficoCorrente() {
            this.dadosAleatorios = [];
            this.gerarNumeros();
            const canvas = document.getElementById('correnteCarregada');
            const ctx = canvas.getContext('2d');
            if (canvas.chart) {
                canvas.chart.destroy();
            }

            canvas.chart = new Chart(ctx, {
                data: {
                    labels: ["09:00", "09:05", "09:10", "09:15", "09:20", "09:25", "09:30", "09:35", "09:40", "09:45", "09:50", "09:55", "10:00"],
                    datasets: [{
                        data: this.dadosAleatorios,
                        type: "line",
                        label: 'Corrente Carregada',
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
                },
            });
        },

        graficoEnergia() {
            this.dadosAleatorios = [];
            this.gerarNumeros();
            const canvas = document.getElementById('energiaAcumulada');
            const ctx = canvas.getContext('2d');
            if (canvas.chart) {
                canvas.chart.destroy();
            }

            canvas.chart = new Chart(ctx, {
                data: {
                    labels: ["09:00", "09:05", "09:10", "09:15", "09:20", "09:25", "09:30", "09:35", "09:40", "09:45", "09:50", "09:55", "10:00"],
                    datasets: [{
                        data: this.dadosAleatorios,
                        type: "line",
                        label: 'Energia Acumulada',
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
                },
            });
        },

        graficoTensao() {
            this.dadosAleatorios = [];
            this.gerarNumeros();
            const canvas = document.getElementById('tensao');
            const ctx = canvas.getContext('2d');
            if (canvas.chart) {
                canvas.chart.destroy();
            }

            canvas.chart = new Chart(ctx, {
                data: {
                    labels: ["09:00", "09:05", "09:10", "09:15", "09:20", "09:25", "09:30", "09:35", "09:40", "09:45", "09:50", "09:55", "10:00"],
                    datasets: [{
                        data: this.dadosAleatorios,
                        type: "line",
                        label: 'Tensão',
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
                },
            });
        },
    }
}
</script>
    
<style>
header {
    background-color: black;
    color: white;
}

#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    text-align: center;
    color: #000000;
}

canvas {
    max-width: 100%;
    max-height: 150px;
}
</style>