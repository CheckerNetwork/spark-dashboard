---
toc: false
title: Storage Provider Summary
---

```js
import { LineGraph } from '../components/line-graph.js'
import { getDateXDaysAgo } from '../utils/date-utils.js'
const data = FileAttachment(
  `../data/${observable.params.client}-spark-rsr-summary.json`,
).json()
```

<div class="hero">
  <body><a href="/"><img src="../media/spark-logomark-blue-with-bbox.png" alt="Spark Logo" width="300" /></a><body>
    <h2>Dashboard Beta</h2>
    <body><a href="https://filspark.com/dashboard" target="_blank" rel="noopener noreferrer">(Click here for Legacy Spark Grafana Dashboard)</a><body>
</div>

<h4>Storage Client Spark RSR Summary</h4>
<body>This section shows the storage client Spark Retrieval Success Rate Score summary. You can adjust the date range. Records start on the 25th February 2025.</body>

```js
const start = view(Inputs.date({ label: 'Start', value: getDateXDaysAgo(180) }))
const end = view(Inputs.date({ label: 'End', value: getDateXDaysAgo(1) }))
```

<h3>Stats for ${observable.params.client}</h3>

<div class="grid grid-cols" style="grid-auto-rows: 500px;">
  <div class="card">${
    resize((width) => LineGraph(data, {width, title: "Retrieval Success Rate", start, end }))
  }</div>
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
