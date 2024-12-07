import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { ChartService } from '../../services/chart-data.service';
import { CommonModule } from '@angular/common';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [CommonModule, HeaderComponent],
  template:`
  <app-header></app-header>
  <main class="max-w-7xl mx-auto py-8 sm:px-6 lg:px-8">
  <!-- Content Wrapper -->
  <div class="px-4 sm:px-0">
    <div class="bg-gradient-to-br from-purple-100 via-white to-indigo-100 shadow-lg rounded-xl overflow-hidden">
      <!-- Header Section -->
      <div class="px-6 py-8 sm:p-10 bg-indigo-600 text-white">
        <h2 class="text-3xl font-extrabold mb-2">
          Clean Energy Adoption Across Regions
        </h2>
        <p class="text-lg opacity-90">
          Clean Energy adoption rates in terms of percentage by region wise.
        </p>
      </div>
      <!-- Chart Section -->
      <div class="px-6 py-8 sm:p-10 bg-white">
        <!-- Chart Container -->
        <div class="mb-8">
          <canvas #reportChart class="w-full h-64"></canvas>
        </div>
        <!-- Description Section -->
        <div class="prose max-w-none text-gray-700">
          <a
            class="inline-block text-lg font-medium text-blue-600 hover:text-blue-700 focus:ring focus:ring-blue-300 underline mb-4"
            href="https://www.iea.org/reports/world-energy-investment-2024/overview-and-key-findings"
          >
            Source: Key Clean Energy Technologies
          </a>
          <p>
          The scatter plot in this visualization effectively demonstrates the clean energy adoption rates across different regions. The X-axis represents the regions, while the Y-axis shows the percentage of adoption of clean energy technologies. By plotting data points for each region, this chart provides a clear view of how different regions are performing in their transition to clean energy. For instance, some regions show higher adoption rates (e.g., 50%), indicating a more advanced transition, while others have lower adoption (e.g., 35%), suggesting room for improvement. This visualization helps in identifying regional disparities in energy transitions.

          The interactive nature of the scatter plot, where hovering over a data point reveals the exact values for the region and its adoption percentage, adds to its usefulness. It provides a comprehensive overview of where investments or policies may need to be focused in order to accelerate clean energy adoption. With this chart, stakeholders can easily compare regions and track the progress made toward global clean energy targets.
          </p>
        </div>
      </div>
    </div>
  </div>
  </main>
  `
})
export class ReportsComponent implements OnInit, AfterViewInit {
  @ViewChild('reportChart') chartCanvas!: ElementRef;
  private chart: any;

  constructor(private chartService: ChartService) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.chartService.getReportsChart().subscribe(data => {
      this.createChart(data);
    });
  }

  private createChart(data: any): void {
    this.chart = new Chart(this.chartCanvas.nativeElement, {
      type: 'scatter',
      data: data[0].data,
      options: {
        responsive: true,
        plugins: {
          legend: { display: true }
        },
        scales: {
          x: {
            title: {
              display: true,
              text: 'Regions'
            }
          },
          y: {
            title: {
              display: true,
              text: 'Clean Energy Adoption (%)'
            }
          }
        }
      }
    });
  }
}