import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [HeaderComponent],
  template: `
    <app-header></app-header>
    <main class="max-w-7xl mx-auto py-8 sm:px-6 lg:px-8">
      <div class="px-4 sm:px-0">
        <div class="bg-gradient-to-br from-indigo-100 via-white to-purple-50 shadow-lg rounded-xl overflow-hidden">
          <!-- Header Section -->
          <div class="px-6 py-8 sm:p-10 bg-indigo-600 text-white">
            <h2 class="text-3xl font-extrabold mb-2">Recent Innovations in Clean Energy Sector</h2>
            <p class="text-lg opacity-90">Rapid progress of key clean energy technologies shows the new energy economy is emerging faster than many think.</p>
          </div>
          <!-- Main Content Section -->
          <div class="px-6 py-8 sm:p-10 bg-white">
            <!-- Article Link -->
            <a
              class="inline-block text-lg font-medium text-blue-600 hover:text-blue-700 focus:ring focus:ring-blue-300 underline mb-4"
              href="https://www.iea.org/reports/world-energy-investment-2024/overview-and-key-findings"
            >
              Key Clean Energy Technologies
            </a>
            <!-- Article Content -->
            <p class="text-gray-700 leading-relaxed mb-6">
              The IEA article highlights rapid advancements in clean energy technologies, emphasizing record growth in solar PV, electric vehicles (EVs), and investments in clean energy, which reached $1.6 trillion in 2022. Solar PV accounted for 26% annual growth, while EV sales hit 10 million units. However, the transition remains uneven, with innovation needed in hard-to-decarbonize sectors like heavy industry. Emerging innovations, such as sodium-ion batteries and solid oxide electrolysers, show promise. Yet, broader global adoption, stronger policies, and investment are critical for achieving net-zero emissions by 2050.
            </p>
            <p class="text-gray-700 leading-relaxed mb-6">
            Despite the progress, the article emphasizes the uneven pace of clean energy adoption globally. The development of new technologies, such as sodium-ion batteries and electrolysers, promises to accelerate the transition, but stronger policies and investment are essential to meet net-zero goals by 2050.
            </p>
            <!-- Subsection: Technical Implementation -->
            <h3 class="text-2xl font-semibold mb-4 text-gray-800">Technical Implementation</h3>
            <p class="text-gray-700 mb-4">This project demonstrates a full-stack authentication system built with:</p>
            <ul class="list-disc pl-5 text-gray-700 space-y-2">
              <li><span class="font-semibold">Frontend:</span> AngularJS</li>
              <li><span class="font-semibold">Backend:</span> Node.js</li>
              <li><span class="font-semibold">Database:</span> MongoDB</li>
              <li><span class="font-semibold">Authentication:</span> JWT-based token system</li>
              <li><span class="font-semibold">Charts:</span> Chart.js for data visualization</li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  `
})
export class DashboardComponent {}