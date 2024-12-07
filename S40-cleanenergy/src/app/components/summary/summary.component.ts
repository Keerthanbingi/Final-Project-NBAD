import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { ChartService } from '../../services/chart-data.service';
import { CommonModule } from '@angular/common';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-summary',
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
          Clean Energy Investment Distribution
        </h2>
        <p class="text-lg opacity-90">
          Investment Distribution in terms on billion dollars by each clean energy technology wise.
        </p>
      </div>
      <!-- Chart Section -->
      <div class="px-6 py-8 sm:p-10 bg-white">
        <!-- Chart Container -->
        <div class="mb-8 w-2/5">
          <canvas #chartCanvas class="w-full h-64"></canvas>
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
          The pie chart offers a visual breakdown of clean energy investments across different sectors, namely Solar PV, Electric Vehicles (EVs), and other clean energy technologies. This chart is particularly useful for showcasing the relative proportion of financial investments directed at each sector. For example, if the Solar PV sector receives the largest share, it would be visually represented by a dominant segment of the pie, indicating that most of the financial resources are being allocated to that technology. Similarly, the EV sector and other technologies would be represented by the remaining portions.

          The color-coding and clear labels for each sector further enhance the chart's accessibility, allowing stakeholders to quickly identify areas receiving the most funding. Additionally, the tooltips provide exact values when hovering over each section, offering insights into the scale of investments (e.g., in billions). This pie chart is crucial for understanding the distribution of resources and guiding future investment strategies to ensure that all sectors of clean energy receive appropriate funding for accelerated development.          
          </p>
        </div>
      </div>
    </div>
  </div>
  </main>
  `
})
export class SummaryComponent implements OnInit, AfterViewInit {
  @ViewChild('chartCanvas') chartCanvas!: ElementRef;
  private chart: any;

  constructor(private chartService: ChartService) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.chartService.getSummaryChart().subscribe(data => {
      this.createPieChart(data);
    });
  }

  private createPieChart(data: any): void {
    this.chart = new Chart(this.chartCanvas.nativeElement, {
      type: 'pie',
      data: data[0].data,
      options: {
        responsive: true,
        plugins: {
          legend: { display: true }
        }
      }
    });
  }
}