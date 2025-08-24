import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { NgChartsModule, BaseChartDirective } from 'ng2-charts';
import { ChartData, ChartOptions } from 'chart.js';
import { interval } from 'rxjs';

@Component({
  selector: 'app-monitoring-dashboard',
  standalone: true,
  imports: [CommonModule, HttpClientModule, MatCardModule, NgChartsModule],
  templateUrl: './monitoring-dashboard.component.html',
  styleUrls: ['./monitoring-dashboard.component.css']
})

export class MonitoringDashboardComponent {
  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  metrics: any = null;

  cpuChartData: ChartData<'line'> = {
    labels: [],
    datasets: [
      {
        label: 'CPU Load (%)',
        data: [],
        fill: true,
        tension: 0.3
      }
    ]
  };

  memoryChartData: ChartData<'line'> = {
    labels: [],
    datasets: [
      {
        label: 'Heap Used (MB)',
        data: [],
        fill: true,
        tension: 0.3
      }
    ]
  };

  chartOptions: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: true,
    scales: {
      x: {
        ticks: {
          autoSkip: true,
          maxTicksLimit: 6
        }
      },
      y: {
        beginAtZero: false,
        ticks: {
          stepSize: undefined,
        }
      }
    },
    plugins: {
      legend: { display: true },
      tooltip: { enabled: true }
    },
    animation: {
      duration: 300
    }
  };

  constructor(private http: HttpClient) {
    interval(3000).subscribe(() => this.loadMetrics());
  }

  loadMetrics() {
    this.http.get('http://localhost:3000/metrics').subscribe((data: any) => {
      this.metrics = data;
      const now = new Date().toLocaleTimeString();

      const cpuData = [...(this.cpuChartData.datasets[0].data as number[]), data.cpuLoad].slice(-10);
      this.cpuChartData = {
        ...this.cpuChartData,
        labels: [...(this.cpuChartData.labels || []), now].slice(-10),
        datasets: [{ ...this.cpuChartData.datasets[0], data: cpuData }]
      };

      // Update Memory chart
      const memUsedMB = data.memoryUsage.heapUsed / 1024 / 1024;
      const memoryData = [...(this.memoryChartData.datasets[0].data as number[]), memUsedMB].slice(-10);
      this.memoryChartData = {
        ...this.memoryChartData,
        labels: [...(this.memoryChartData.labels || []), now].slice(-10),
        datasets: [{ ...this.memoryChartData.datasets[0], data: memoryData }]
      };

      this.chart?.update(); 
    });
  }
}
