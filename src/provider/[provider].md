---
toc: false
title: Storage Provider Summary
---

```js
import { LineGraph } from '../components/line-graph.js'
import { getDateXDaysAgo } from '../utils/date-utils.js'

const rsrData = FileAttachment(
  `../data/${observable.params.provider}-spark-rsr-summary.json`,
).json()
const ttfbData = FileAttachment(
  `../data/${observable.params.provider}-spark-retrieval-timings-summary.json`,
).json()
```

<div class="hero">
  <body><a href="/"><img src="../media/spark-logomark-blue-with-bbox.png" alt="Spark Logo" width="300" /></a><body>
    <h2>Dashboard Beta</h2>
    <body><a href="https://filspark.com/dashboard" target="_blank" rel="noopener noreferrer">(Click here for Legacy Spark Grafana Dashboard)</a><body>
</div>

```js
const start = view(Inputs.date({ label: 'Start', value: getDateXDaysAgo(180) }))
const end = view(Inputs.date({ label: 'End', value: getDateXDaysAgo(1) }))
```

<h3>Stats for ${observable.params.provider}</h3>

<div class="grid grid-cols-2" style="grid-auto-rows: 500px;">
  <div>
    <h4>Storage Provider Spark RSR Summary</h4>
    <body>This section shows the storage provider Spark Retrieval Success Rate Score summary.</body>
    <div class="card">${
      resize((width) => LineGraph(rsrData, {width, title: "Retrieval Success Rate", start, end }))
    }</div>
  </div>
  <div>
    <h4>Storage Provider Spark Time To First Byte (TTFB)</h4>
    <body>The section shows the median of all TTFB values for successful retrieval checks of this storage provider.</body>
    <div class="card">
      ${Plot.plot({
      title: 'Time to First Byte (ms)',
      // TODO: Change tick to month once we have more data
      x: { type: 'utc', ticks: 'day' },
      y: { grid: true, zero: true },
      marks: [
        Plot.lineY(ttfbData, {
          x: 'day',
          y: 'ttfb_ms',
          stroke: "#FFBD3F",
        })
      ]
    })}
    </div>
  </div>
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
