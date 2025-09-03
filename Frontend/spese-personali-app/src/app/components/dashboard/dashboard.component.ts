import { Component, OnInit } from '@angular/core';
import { SpeseService } from '../../services/spese.service';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  
  // Dati per il grafico a torta delle categorie
  pieChartData: ChartData<'pie', number[], string> = {
    labels: [],
    datasets: [{
      data: [],
      backgroundColor: []
    }]
  };
  
  pieChartType: ChartType = 'pie';
  pieChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins: {
      legend: {
        position: 'right',
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const label = context.label || '';
            const value = new Intl.NumberFormat('it-IT', {
              style: 'currency',
              currency: 'EUR'
            }).format(context.parsed);
            return `${label}: ${value}`;
          }
        }
      }
    }
  };

  // Dati per il grafico a barre mensile
  barChartData: ChartData<'bar'> = {
    labels: [],
    datasets: [{
      data: [],
      label: 'Spese Mensili',
      backgroundColor: 'rgba(54, 162, 235, 0.5)',
      borderColor: 'rgba(54, 162, 235, 1)',
      borderWidth: 1
    }]
  };

  barChartType: ChartType = 'bar';
  barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const value = new Intl.NumberFormat('it-IT', {
              style: 'currency',
              currency: 'EUR'
            }).format(context.parsed.y as number);
            return `${context.dataset.label}: ${value}`;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function(value) {
            return new Intl.NumberFormat('it-IT', {
              style: 'currency',
              currency: 'EUR'
            }).format(value as number);
          }
        }
      }
    }
  };

  totalSpese = 0;
  numeroSpese = 0;
  spesaMedia = 0;

  constructor(private speseService: SpeseService) { }

  ngOnInit(): void {
    this.loadDashboardData();
  }

  loadDashboardData(): void {
    // Carica dati per categorie
    this.speseService.getSpesePerCategoria().subscribe({
      next: (data) => {
        this.pieChartData.labels = data.map(item => item.categoria);
        this.pieChartData.datasets[0].data = data.map(item => item.totaleSpesa);
        this.pieChartData.datasets[0].backgroundColor = [
          '#4CAF50', '#2196F3', '#FF9800', '#F44336', 
          '#9C27B0', '#607D8B', '#795548'
        ];
      },
      error: (error) => console.error('Errore nel caricamento dati categorie:', error)
    });

    // Carica dati mensili
    this.speseService.getSpesePerMese().subscribe({
      next: (data) => {
        const mesiNomi = ['Gen', 'Feb', 'Mar', 'Apr', 'Mag', 'Giu',
                          'Jul', 'Ago', 'Set', 'Ott', 'Nov', 'Dic'];
        this.barChartData.labels = data.map(item => `${mesiNomi[item.mese - 1]} ${item.anno}`);
        this.barChartData.datasets[0].data = data.map(item => item.totaleSpesa);
      },
      error: (error) => console.error('Errore nel caricamento dati mensili:', error)
    });

    // Carica statistiche generali
    this.speseService.getSpese().subscribe({
      next: (spese) => {
        this.numeroSpese = spese.length;
        this.totalSpese = spese.reduce((sum, spesa) => sum + spesa.importo, 0);
        this.spesaMedia = this.numeroSpese > 0 ? this.totalSpese / this.numeroSpese : 0;
      },
      error: (error) => console.error('Errore nel caricamento statistiche:', error)
    });
  }

  formatCurrency(amount: number): string {
    return new Intl.NumberFormat('it-IT', {
      style: 'currency',
      currency: 'EUR'
    }).format(amount);
  }
}
