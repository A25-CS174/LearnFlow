import { progressAPI, modulesAPI, learningPathsAPI } from "../../api/api.js";

export default class DashboardPage {
  constructor() {
    this.title = "Dashboard";
  }

  async getHtml() {
    const res = await fetch("src/pages/dashboard/index.html");
    return await res.text();
  }

  async load() {
    await this.initChart();
    await this.loadLearningPaths();
    await this.loadNonLearningPathModules();
  }

  async initChart() {
    setTimeout(async () => {
      const chartDom = document.getElementById("learningChart");
      if (!chartDom) {
        console.warn("learningChart tidak ditemukan");
        return;
      }

      const myChart = echarts.init(chartDom);

      // Ambil data chart dari API
      let chartData = [];
      try {
        const apiData = await progressAPI.getChart();
        chartData = apiData?.weeklyMinutes || [0, 0, 0, 0, 0, 0, 0];
      } catch (err) {
        console.error("Gagal mengambil data chart:", err);
        chartData = [0, 0, 0, 0, 0, 0, 0];
      }

      const option = {
        tooltip: { trigger: "axis" },
        grid: { left: "3%", right: "4%", bottom: "3%", top: "8%", containLabel: true },
        xAxis: { type: "category", boundaryGap: false, axisLine: { lineStyle: { color: "#ccc" } }, axisLabel: { color: "#555" }, data: ["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"] },
        yAxis: { type: "value", axisLine: { show: false }, axisLabel: { color: "#555" }, splitLine: { lineStyle: { color: "#eee" } } },
        series: [{
          name: "Menit Belajar",
          type: "line",
          smooth: true,
          symbol: "circle",
          symbolSize: 8,
          lineStyle: { width: 3, color: "#0f6bd7" },
          itemStyle: { color: "#0f6bd7", borderColor: "#fff", borderWidth: 2 },
          areaStyle: { opacity: 1, color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{ offset: 0, color: "#0f6bd7" }, { offset: 1, color: "#d6f0ff" }]) },
          data: chartData,
        }],
      };

      myChart.setOption(option);
      window.addEventListener("resize", () => myChart.resize());
    }, 10);
  }

  async loadLearningPaths() {
    const container = document.querySelector("#learning-paths"); // pastikan ada div dengan id ini
    if (!container) return;

    try {
      const paths = await learningPathsAPI.getAll();
      container.innerHTML = paths.map(path => `
        <div class="border rounded p-3">
          <div class="flex items-center justify-between mb-2">
            <div class="flex items-center gap-2">
              <span class="list-dot bg-green-500"></span>
              <div class="text-sm font-semibold">${path.title}</div>
            </div>
            <div class="text-sm text-gray-500">${path.progress || 0}% / 100%</div>
          </div>
          <div class="text-xs text-gray-500">Detail Progress</div>
        </div>
      `).join("");
    } catch (err) {
      console.error("Gagal load learning paths:", err);
      container.innerHTML = "<p class='text-red-500'>Gagal load data Learning Paths</p>";
    }
  }

  async loadNonLearningPathModules() {
    const container = document.querySelector("#non-learning-modules"); // pastikan ada div dengan id ini
    if (!container) return;

    try {
      const modules = await modulesAPI.getAll();
      container.innerHTML = modules.map(mod => `
        <div class="border rounded p-3">
          <div class="flex items-center justify-between mb-2">
            <div class="flex items-center gap-2">
              <span class="list-dot ${mod.progress >= 100 ? "bg-green-500" : "bg-red-500"}"></span>
              <div class="text-sm font-semibold">${mod.title}</div>
            </div>
            <div class="text-sm text-gray-500">${mod.progress}% / 100%</div>
          </div>
          <div class="progress-rail w-full rounded-full">
            <div class="rounded-full" style="width:${mod.progress}%; height:10px; background:${mod.progress >= 100 ? "#10b981" : "#ef4444"}"></div>
          </div>
        </div>
      `).join("");
    } catch (err) {
      console.error("Gagal load modules:", err);
      container.innerHTML = "<p class='text-red-500'>Gagal load data Modules</p>";
    }
  }
}
