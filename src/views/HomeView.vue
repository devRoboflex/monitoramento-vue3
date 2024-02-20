<template>
    <header
        style="font-size: 25px; background: linear-gradient(180deg, #2D2D2D 0%, #282929 51.54%, #181818 100%); padding: 0.5rem 0 0.5rem 0; width: 100%;">
        <div style="margin-left: 1rem; margin-top: 0.5rem;" class="position-absolute top-0 start-0">
            <i @click="buscarDispositivos()" class="bi bi-house"></i>
        </div>
        <h2 id="tituloLista">Dispositivos Monitorados</h2>
    </header>
    <div id="lista" style="width: 100%; padding-inline: 2rem;">
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
                    @click="this.$store.commit('atualizarId', dispositivo.id); this.$store.commit('atualizarModelo', dispositivo.dispositivo_cod);
                    coletarDados()">
                    <td>
                        {{ dispositivo.dispositivo_cod }}
                    </td>
                    <td>
                        {{ dispositivo.marca }}
                    </td>
                    <td>

                        {{ formatarData(dispositivo.dt_inicio.slice(0, -9)) + " às " +
                            dispositivo.dt_inicio.slice(11).slice(0, -3) + "h - " }}
                        {{ dispositivo.dt_fim == null ? 'Em andamento...' : formatarData(dispositivo.dt_fim.slice(0, -9)) +
                            " às " +
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
</template>

<script>
import axios from 'axios';
import { format, parseISO } from 'date-fns';

export default {
    data() {
        return {
            listaDispositivos: [],
            statusBateria: '',
            saudeBateria: '',
            idDispositivo: '',
            dadosDispositivo: "",
            modeloDispositivo: "",
            pointRadius: 1,
            teste: [],
            dataInicial: "",
            dataFinal: "",
            tempoInicial: "00:00",
            tempoFinal: "23:59",
        }
    },

    mounted() {

        this.setarDatas(),
            this.buscarDispositivos()
    },

    methods: {
        buscarDispositivos() {
            axios.get('http://192.168.0.5:8000/api/dispositivo', {})
                .then((response) => {
                    this.listaDispositivos = response.data.data;
                })
                .catch((error) => {
                    console.error(error);
                });
        },

        coletarDados() {

            this.dadosDispositivo = ""

            axios.post('http://192.168.0.5:8000/api/monitor-bateria', {
                dispositivo_id: this.$store.state.idDispositivo,
                dt_inicio: this.dataInicial + ' ' + this.tempoInicial + ':00',
                dt_fim: this.dataFinal + ' ' + this.tempoFinal + ':00',
            })
                .then((response) => {
                    this.dadosDispositivo = response.data;
                    this.$store.commit('atualizarDadosDispositivo', response.data);
                })
                .catch((error) => {
                    console.error(error);
                });

                // sessionStorage.setItem('dadosDispositivos', JSON.stringify(this.dadosDispositivo))

            this.$router.push('/painel');

            // if (this.dadosDispositivo == "") {
            //     return this.mostrarAviso();
            // }
        },

        setarDatas() {
            this.dataFinal = new Date().getFullYear() + '-' + '0' + (new Date().getMonth() + 1) + '-' + new Date().getDate();
            this.dataInicial = new Date().getFullYear() + '-' + '0' + (new Date().getMonth() + 1) + '-' + (new Date().getDate() - 1)
        },

        formatarData(input) {
            const data = parseISO(input);
            return format(data, 'dd/MM/yy');
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
}
</style>