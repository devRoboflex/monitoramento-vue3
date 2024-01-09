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
          </div>
          
      </div>
    
    </template>
    
    <script>
    import Chart from 'chart.js/auto';
    
    export default {
      data() {
          return {
              dadosAleatorios: []
    
          }
      },
    
      mounted() {
          this.graficoTemperatura(),
              this.graficoCapacidade(),
              this.graficoCorrente(),
              this.graficoEnergia(),
              this.graficoTensao()
      },
    
      methods: {
    
          gerarNumeros() {
    
          for (let i = 0; i < 7; i++) {
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
                      labels: ["", "", "", "", "", "", ""],
                      datasets: [{
                          data: this.dadosAleatorios,
                          type: "line",
                          label: 'Temperatura',
                          backgroundColor: 'black',
                          borderColor: 'black',
                          borderWidth: 1.5,
                          tension: 0,
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
                      labels: ["", "", "", "", "", "", ""],
                      datasets: [{
                          data: this.dadosAleatorios,
                          type: "line",
                          label: 'Corrente',
                          backgroundColor: 'black',
                          borderColor: 'black',
                          borderWidth: 1.5,
                          tension: 0,
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
                      labels: ["", "", "", "", "", "", ""],
                      datasets: [{
                          data: this.dadosAleatorios,
                          type: "line",
                          label: 'Corrente Carregada',
                          backgroundColor: 'black',
                          borderColor: 'black',
                          borderWidth: 1.5,
                          tension: 0,
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
                      labels: ["", "", "", "", "", "", ""],
                      datasets: [{
                          data: this.dadosAleatorios,
                          type: "line",
                          label: 'Energia Acumulada',
                          backgroundColor: 'black',
                          borderColor: 'black',
                          borderWidth: 1.5,
                          tension: 0,
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
                      labels: ["", "", "", "", "", "", ""],
                      datasets: [{
                          data: this.dadosAleatorios,
                          type: "line",
                          label: 'Tensão',
                          backgroundColor: 'black',
                          borderColor: 'black',
                          borderWidth: 1.5,
                          tension: 0,
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
      max-height: 190px;
    }
    
    </style>