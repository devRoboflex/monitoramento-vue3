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
                        <th scope="col">Dispositivo</th>
                        <th scope="col">Início</th>
                        <th scope="col">Tempo</th>
                        <th scope="col">Status</th>
                        <th scope="col">Saúde</th>
                        <th scope="col"></th>
                    </tr>
                    <tr>
                        <td>A9 almox</td>
                        <td>12/12/23</td>
                        <td>10 dias</td>
                        <td>Parado</td>
                        <td>Boa</td>
                    </tr>
                    <tr>
                        <td>T220 produção</td>
                        <td>09/02/23</td>
                        <td>2 dias</td>
                        <td>Ativo</td>
                        <td>Média</td>
                    </tr>

                    <tr>
                        <td>A9 P&D</td>
                        <td>05/01/24</td>
                        <td>1 dia</td>
                        <td>Parado</td>
                        <td>Boa</td>
                    </tr>
                </table>
            </div>
        </div>

    </div>
</template>

<script>
export default {

    data() {
        return {

        }
    },

    methods: {
        teste() {
            console.log("aqui")
        }
    }
}
</script>
