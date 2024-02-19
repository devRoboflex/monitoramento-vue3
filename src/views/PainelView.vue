<template>
    <br><br>
    <header
        style="font-size: 25px; background: linear-gradient(180deg, #2D2D2D 0%, #282929 51.54%, #181818 100%); padding: 0.5rem 0 0.5rem 0; margin-top: 2.5rem; width: 100%;">
        <div style="margin-left: 1rem; margin-top: 0.5rem; z-index: 999999;" class="position-absolute top-10 start-0">
            <i @click="this.$router.push('/home');" class="bi bi-house"></i>
        </div>
        <h2 id="tituloHistorico">Histórico de parâmetros</h2>
    </header>
    <div id="painel">
        <div style="display: flex; width: 100%">
            <div style="display: flex; width: 50%;">
                <h1 style="align-self: center; margin-left: 1rem; margin-top: 1rem;">{{ modeloDispositivo }}</h1>
                <button v-b-tooltip.hover title="Baixar Relatório"
                    style="border: none; background-color: transparent; margin-left: 0.5rem; font-size: 20px; align-self: center; margin-top: 1rem;"
                    @click="baixarXML()" id="botaoDownload">
                    <i class="bi bi-file-earmark-arrow-down"></i>
                </button>

            </div>
            <div style="display:flex; text-align: center; justify-content: end; margin-right: 1rem; width: 50%;">
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
                        <input style="margin-left: 0.2rem;border: 1px solid black;" type="time" class="form-control"
                            v-model="tempoFinal" @change="coletarDados">
                    </div>
                </div>
            </div>
        </div>
        <br>
        <div style="display: flex; width: 100%;">
            <div style="display: flex;width: 50% ;flex-flow: column; height: fit-content; align-self: baseline;">

                <div class="card mb-3" style=" height: fit-content ;border: 1px solid rgb(0, 0, 0); margin: 0.5rem;">
                    <div style="border-bottom: 1px solid rgb(0, 0, 0)">Carga da Bateria (%)</div>

                    <div style="display: flex; margin: 0.5rem 0.5rem 0 0.5rem; font-size: small;">
                        <div class="card mb-3" style="width: 5rem;height: min-content;border: 1px solid rgb(0, 0, 0);">
                            <div style="border-bottom: 1px solid rgb(0, 0, 0)">Saúde</div>
                            <div v-if="saudeBateria != null" style="color: black;">{{ saudeBateria[saudeBateria.length - 1]
                            }}</div>
                        </div>

                        <div class="card mb-3"
                            style="width:6rem; height: min-content;border: 1px solid rgb(0, 0, 0); margin-left: 0.5rem;">
                            <div style="border-bottom: 1px solid rgb(0, 0, 0)">Status</div>
                            <div style="display: flex; align-items: center; justify-content: center;">
                                <div v-if="statusBateria != null" id="statusEscrita" style="margin-left: 0.2rem;">{{
                                    statusBateria[statusBateria.length -
                                    1] }}</div>
                            </div>
                        </div>
                    </div>

                    <div style="padding: 0.3em;" id="avisoBateria" class="aviso">
                        Nenhum dado encontrado no período selecionado!
                    </div>

                    <div id="canvaBateria">
                        <canvas id="nivelBateria"></canvas>
                    </div>
                </div>
                <div class="card mb-3" style="height: fit-content ;border: 1px solid rgb(0, 0, 0); margin: 0.5rem;">
                    <div style="border-bottom: 1px solid rgb(0, 0, 0)">Corrente (ma)</div>
                    <div style="padding: 0.3em;" id="avisoCorrente" class="aviso">
                        Nenhum dado encontrado no período selecionado!
                    </div>
                    <div style="padding: 0.3em;" id="canvaCorrente">
                        <canvas id="Corrente"></canvas>
                    </div>
                </div>
            </div>

            <div style="display: flex; flex-flow: column; width: 50%; height: fit-content; align-self: baseline;">
                <div class="card mb-3" style=" height: fit-content;border: 1px solid rgb(0, 0, 0); margin: 0.5rem;">
                    <div style="border-bottom: 1px solid rgb(0, 0, 0)">Temperatura (C°)</div>
                    <div style="padding: 0.3em;" id="avisoTemperatura" class="aviso">
                        Nenhum dado encontrado no período selecionado!
                    </div>
                    <div style="padding: 0.3em;" id="canvaTemperatura">
                        <canvas style="z-index: 8888;" id="temperatura"></canvas>
                    </div>
                </div>

                <div class="card mb-3" style="height: fit-content;border: 1px solid rgb(0, 0, 0); margin: 0.5rem;">
                    <div style="border-bottom: 1px solid rgb(0, 0, 0)">Tensão (v)</div>
                    <div style="padding: 0.3em;" id="avisoTensao" class="aviso">
                        Nenhum dado encontrado no período selecionado!
                    </div>
                    <div style="padding: 0.3em;" id="canvaTensao">
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

export default {
    data() {
        return {
            modeloDispositivo: this.$store.state.modeloDispositivo,
            idDispositivo: this.$store.state.idDispositivo,
            dadosDispositivo: this.$store.state.dadosDispositivo,
            statusBateria: this.$store.state.statusBateria,
            saudeBateria: this.$store.state.saudeBateria,
            dataInicial: "",
            dataFinal: "",
            tempoInicial: "00:00",
            tempoFinal: "23:59",
        }
    },
    mounted() {
        this.setarDatas(),
            this.graficoTemperatura(),
            this.coletarDados()
    },

    methods: {
        baixarXML() {
            axios.post('http://192.168.0.5:8000/api/relatorio/monitorar-bateria', {
                dispositivo_id: this.idDispositivo,
                dt_inicio: this.dataInicial + ' ' + this.tempoInicial + ':00',
                dt_fim: this.dataFinal + ' ' + this.tempoFinal + ':00',
            }, {
                responseType: 'arraybuffer',  // Certifique-se de configurar a resposta como arraybuffer
            })
                .then((response) => {
                    let dispositivo = this.modeloDispositivo
                    const blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

                    // Cria um link temporário
                    const link = document.createElement('a');
                    link.href = window.URL.createObjectURL(blob);
                    link.download = `Relatório_dispositivo_${dispositivo}.xlsx`; 0,

                        // Adiciona o link ao documento
                        document.body.appendChild(link);

                    // Dispara o clique no link para iniciar o download
                    link.click();

                    // Remove o link do documento
                    document.body.removeChild(link);
                })
                .catch((error) => {
                    console.error(error);
                });
        },

        coletarDados() {

            this.dadosDispositivo = ""

            if (this.idDispositivo == null) {
                this.idDispositivo = sessionStorage.getItem('idDispositivo');
                this.dataInicial = sessionStorage.getItem('dataInicial');
                this.dataFinal = sessionStorage.getItem('dataFinal');

                axios.post('http://192.168.0.5:8000/api/monitor-bateria', {
                    dispositivo_id: this.idDispositivo,
                    dt_inicio: this.dataInicial,
                    dt_fim: this.dataFinal,
                })
                    .then((response) => {
                        this.dadosDispositivo = response.data;
                        return this.graficoTemperatura();
                    })
                    .catch((error) => {
                        console.error(error);
                    });
                sessionStorage.setItem('idDispositivo', this.idDispositivo);
                sessionStorage.setItem('dataInicial', this.dataInicial);
                sessionStorage.setItem('dataFinal', this.dataFinal);
            } else {
                axios.post('http://192.168.0.5:8000/api/monitor-bateria', {
                    dispositivo_id: this.$store.state.idDispositivo,
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
                sessionStorage.setItem('idDispositivo', this.idDispositivo);
                sessionStorage.setItem('dataInicial', this.dataInicial + ' ' + this.tempoInicial + ':00',);
                sessionStorage.setItem('dataFinal', this.dataFinal + ' ' + this.tempoFinal + ':00',);
            }


            if (this.dadosDispositivo == "") {
                return this.mostrarAviso();
            }
        },

        mostrarAviso() {
            document.getElementById('canvaTemperatura').style.display = "none";
            document.getElementById('canvaBateria').style.display = "none";
            document.getElementById('canvaTensao').style.display = "none";
            document.getElementById('canvaCorrente').style.display = "none";

            document.getElementById('avisoTemperatura').style.display = "";
            document.getElementById('avisoBateria').style.display = "";
            document.getElementById('avisoTensao').style.display = "";
            document.getElementById('avisoCorrente').style.display = "";
        },

        extrairHoraDeString(dataString) {
            const data = new Date(dataString);
            const horas = ('0' + data.getHours()).slice(-2);
            const minutos = ('0' + data.getMinutes()).slice(-2);
            return `${horas}:${minutos}`;
        },

        graficoTemperatura() {

            if (this.dadosDispositivo != "") {
                document.getElementById('canvaTemperatura').style.display = "";
                document.getElementById('avisoTemperatura').style.display = "none"
            }

            let foteDeDados = this.dadosDispositivo;

            let dados = foteDeDados.map(item => item.temperatura / 10);

            let labels = foteDeDados.map(item => item.created_at).map(dataString => this.extrairHoraDeString(dataString));

            if (labels.length > 100) {
                this.pointRadius = 0
            } else {
                this.pointRadius = 2
            }


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
                        borderWidth: 2.5,
                        tension: 0.3,
                        pointRadius: this.pointRadius,
                    }],
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: true,
                    interaction: {
                        intersect: false,
                        mode: 'index',
                    },
                    plugins: {
                        legend: {
                            display: false,
                        }
                    },
                },
            });
            this.nivelBateria();
        },

        nivelBateria() {

            if (this.dadosDispositivo != "") {
                document.getElementById('canvaBateria').style.display = "";
                document.getElementById('avisoBateria').style.display = "none"
            }

            this.saudeBateria = this.dadosDispositivo.map(item => item.bateriaSaude_nome);
            this.statusBateria = this.dadosDispositivo.map(item => item.bateriaStatus_nome);

            let dados = this.dadosDispositivo.map(item => item.bateriaNivel);

            let labels = this.dadosDispositivo.map(item => item.created_at);
            labels = labels.map(dataString => this.extrairHoraDeString(dataString));

            if (labels.length > 100) {
                this.pointRadius = 0
            } else {
                this.pointRadius = 2
            }

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
                        borderWidth: 2.5,
                        tension: 0.3,
                        pointRadius: this.pointRadius,
                    }],
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: true,
                    interaction: {
                        intersect: false,
                        mode: 'index',
                    },
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

            if (this.dadosDispositivo != "") {
                document.getElementById('canvaTensao').style.display = "";
                document.getElementById('avisoTensao').style.display = "none"
            }

            let dados = this.dadosDispositivo.map(item => item.voltagem);
            dados = dados.map(temp => temp / 1000);

            let labels = this.dadosDispositivo.map(item => item.created_at);
            labels = labels.map(dataString => this.extrairHoraDeString(dataString));

            if (labels.length > 100) {
                this.pointRadius = 0
            } else {
                this.pointRadius = 2
            }

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
                        borderWidth: 2.5,
                        tension: 0.3,
                        pointRadius: this.pointRadius,
                    }],
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: true,
                    interaction: {
                        intersect: false,
                        mode: 'index',
                    },
                    plugins: {
                        legend: {
                            display: false,
                        }
                    },
                },
            });

            return this.graficoCorrente();
        },

        graficoCorrente() {
            if (this.dadosDispositivo != "") {
                document.getElementById('canvaCorrente').style.display = "";
                document.getElementById('avisoCorrente').style.display = "none"
            }

            let dadosCorrenteA = this.dadosDispositivo.map(item => item.energiaAtual_ma);
            dadosCorrenteA = dadosCorrenteA.map(temp => temp / 100);

            let dadosCorrenteM = this.dadosDispositivo.map(item => item.energiaMedia_ma);
            dadosCorrenteM = dadosCorrenteM.map(temp => temp / 100);

            let labels = this.dadosDispositivo.map(item => item.created_at);
            labels = labels.map(dataString => this.extrairHoraDeString(dataString));

            if (labels.length > 100) {
                this.pointRadius = 0
            } else {
                this.pointRadius = 2
            }

            const canvas = document.getElementById('Corrente');
            const ctx = canvas.getContext('2d');
            if (canvas.chart) {
                canvas.chart.destroy();
            }

            canvas.chart = new Chart(ctx, {
                data: {
                    labels: labels,
                    datasets: [{
                        data: dadosCorrenteA,
                        type: "line",
                        label: 'Corrente real',
                        backgroundColor: 'black',
                        borderColor: 'black',
                        borderWidth: 2.5,
                        tension: 0.3,
                        pointRadius: this.pointRadius,
                    },
                    {
                        data: dadosCorrenteM,
                        type: "line",
                        label: 'Corrente Média',
                        backgroundColor: 'red',
                        borderColor: 'red',
                        borderWidth: 2.5,
                        tension: 0.3,
                        pointRadius: this.pointRadius,
                    }],
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: true,
                    interaction: {
                        intersect: false,
                        mode: 'index',
                    },
                    plugins: {
                        legend: {
                            display: true,
                        }
                    },
                },
            });
        },

        setarDatas() {
            this.dataFinal = new Date().getFullYear() + '-' + '0' + (new Date().getMonth() + 1) + '-' + new Date().getDate();
            this.dataInicial = new Date().getFullYear() + '-' + '0' + (new Date().getMonth() + 1) + '-' + (new Date().getDate() - 1)
        },


    }
}
</script>