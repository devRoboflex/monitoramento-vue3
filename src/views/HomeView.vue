<template>
    <header
        style="font-size: 25px; background: linear-gradient(180deg, #2D2D2D 0%, #282929 51.54%, #181818 100%); padding: 0.5rem 0 0.5rem 0;">
        <div style="margin-left: 1rem; margin-top: 0.5rem;" class="position-absolute top-0 start-0">
            <i @click="buscarDispositivos()" class="bi bi-house"></i>
        </div>
        <h2 id="tituloHistorico" style="display: none;">Histórico de parâmetros</h2>
        <h2 id="tituloLista">Dispositivos Monitorados</h2>
    </header>
    <div id="lista" class="container">
        <div>
            <div style="text-align: center; border-bottom: 1; margin-top: 1rem;">
                <div style="text-align: right;">
                    <button v-b-tooltip.hover title="Baixar Aplicativo!"
                        style="border: none; background-color: transparent; margin-left: 0.5rem;margin-bottom: 0.5rem ;font-size: 15px; align-self: center; margin-top: 1rem;"
                        id="botaoDownload">
                        <a href="https://drive.google.com/file/d/12uAh_nx25IjGL4cLsoeYTRZPo29bec6o/view?usp=sharing"
                            style="color: black">
                            <i class="fa-solid fa-download"></i>
                        </a>
                    </button>
                </div>
            </div>
        </div>
        <div class="row">
            <table class="table">
                <tr>
                    <th scope="col">Código do Dispositivo</th>
                    <th scope="col">Marca</th>
                    <th scope="col">Periodo do último monitoramento</th>
                    <th scope="col">Status</th>
                    <th scope="col">Saúde</th>
                </tr>

                <tr v-for="dispositivo in listaDispositivos" :key="dispositivo" class="linhaDispositivo"
                    style="border-radius: 5px;"
                    @click="definirId(dispositivo.id); definirModeloDispositivo(dispositivo.dispositivo_cod)">
                    <td>
                        {{ dispositivo.dispositivo_cod }}
                    </td>
                    <td>
                        {{ dispositivo.marca }}
                    </td>
                    <td>
                        <!-- {{ formatarData(dispositivo.dt_inicio.slice(0, -9)) + ' às ' + new 
                            Date(dispositivo.dt_inicio).getHours() + ':' + new
                            Date(dispositivo.dt_inicio).getMinutes() + 'h' }} -->

                        {{ formatarData(dispositivo.dt_inicio.slice(0, -9)) + " às " +
                            dispositivo.dt_inicio.slice(11).slice(0, -3) + "h - " }} {{ dispositivo.dt_fim == null ? 'Em andamento...' : formatarData(dispositivo.dt_fim.slice(0, -9)) + " às " +
                    dispositivo.dt_fim.slice(11).slice(0, -3) }}

                    </td>
                    <td>
                        {{ dispositivo.bateriaStatus_nome }}
                    </td>
                    <td>
                        {{ dispositivo.bateriaSaude_nome }}
                    </td>
                </tr>
            </table>
        </div>
    </div>
    <!-- ---------------------- -->
    <div id="painel" style="display: none;">

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
import { format, parseISO } from 'date-fns';

export default {
    data() {
        return {
            listaDispositivos: [],
            dadosAleatorios: [],
            statusBateria: '',
            idDispositivo: '',
            saudeBateria: '',
            tempoInicial: "00:00",
            tempoFinal: "23:59",
            dataInicial: "",
            dataFinal: "",
            dadosDispositivo: "",
            modeloDispositivo: "",
            pointRadius: 1
        }
    },

    mounted() {

        this.setarDatas(),
            this.buscarDispositivos()
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

        definirModeloDispositivo(nome) {
            this.modeloDispositivo = nome;
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

        definirId(id) {
            this.idDispositivo = id;

            return this.coletarDados();
        },

        buscarDispositivos() {
            document.getElementById('tituloLista').style.display = "";
            document.getElementById('tituloHistorico').style.display = "none";
            document.getElementById('painel').style.display = "none";
            document.getElementById('lista').style.display = ""

            axios.get('http://192.168.0.5:8000/api/dispositivo', {})
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

            this.dadosDispositivo = ""

            document.getElementById('tituloLista').style.display = "none"
            document.getElementById('tituloHistorico').style.display = ""
            document.getElementById('painel').style.display = "";
            document.getElementById('lista').style.display = "none"

            axios.post('http://192.168.0.5:8000/api/monitor-bateria', {
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
            if (this.dadosDispositivo == "") {
                return this.mostrarAviso();
            }
        },

        graficoTemperatura() {

            if (this.dadosDispositivo != "") {
                document.getElementById('canvaTemperatura').style.display = "";
                document.getElementById('avisoTemperatura').style.display = "none"
            }


            let dados = this.dadosDispositivo.map(item => item.temperatura);
            dados = dados.map(temp => temp / 10);

            let labels = this.dadosDispositivo.map(item => item.created_at);
            labels = labels.map(dataString => this.extrairHoraDeString(dataString));

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

tr:hover {
    cursor: pointer;
}

.aviso {
    color: red;
    font-size: larger;
    font-weight: bolder;
}

.linhaDispositivo:hover {
    transition: 200ms linear;
    box-shadow: 0 0 8px 1px #444444;
}</style>