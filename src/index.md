---
toc: false
---

```js
import { LineGraph } from "./components/line-graph.js";
import { Histogram } from "./components/histogram.js";
// import { Leaderboard } from "./components/leaderboard.js";
// const start = view(Inputs.date({label: "Start", value: "2021-09-01"}));
// const end = view(Inputs.date({label: "End", value: "2021-09-30"}));
const SparkRates = FileAttachment("./data/spark-rsr.json").json();
const SparkNonZeroRates = FileAttachment("./data/spark-rsr-non-zero.json").json();
const SparkMinerRates = FileAttachment("./data/spark-miners-rsr.json").json();
```

```js
const nonZeroSparkMinerRates = SparkMinerRates.filter((record) => record.success_rate != 0)
const sortedSparkMinerRates = SparkMinerRates.sort((recordA, recordB) => recordB.success_rate - recordA.success_rate)
```

<div class="hero">
  <h4><img src="media/Spark-logo.png" alt="Spark Logo" /><h4>
    <h2>Dashboard</h2>
</div>



<div class="grid grid-cols-2" style="grid-auto-rows: 600px;">
  <div class="card">${
    resize((width) => LineGraph(SparkRates, {width, title: "Retrieval Success Rate"}))
  }</div>
  <div class="card">${
    resize((width) => LineGraph(SparkNonZeroRates, {width, title: "Non-zero Miners: Retrieval Success Rate"}))
  }</div>
</div>

<div class="grid grid-cols-2" style="grid-auto-rows: 600px;">
  <div class="card">${
    resize((width) => Histogram(SparkMinerRates, { width, thresholds: 10 }))
  }</div>
  <div class="card">${
    resize((width) => Histogram(nonZeroSparkMinerRates, { width, thresholds: 10 }))
  }</div>
</div>

<div class="card" style="padding: 0;">
  ${Inputs.table(sortedSparkMinerRates, {rows: 16})}
</div>

<style>

.hero {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: var(--sans-serif);
  margin: 4rem 0 8rem;
  text-wrap: balance;
  text-align: center;
}

.hero h1 {
  margin: 1rem 0;
  padding: 1rem 0;
  max-width: none;
  font-size: 14vw;
  font-weight: 900;
  line-height: 1;
  background: linear-gradient(30deg, var(--theme-foreground-focus), currentColor);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero h2 {
  margin: 0;
  max-width: 34em;
  font-size: 20px;
  font-style: initial;
  font-weight: 500;
  line-height: 1.5;
  color: var(--theme-foreground-muted);
}

@media (min-width: 640px) {
  .hero h1 {
    font-size: 90px;
  }
}

</style>
