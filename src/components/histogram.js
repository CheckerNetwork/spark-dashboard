import * as Plot from 'npm:@observablehq/plot'
import * as d3 from 'd3'

export function Histogram(events, { width, title, thresholds }) {
  const data = events.flatMap((d) => {
    const res = Array.from([
      { type: 'HTTP or Graphsync', value: d.success_rate * 100 },
    ])
    // We only want to count the http success rate if it is not null
    // When querying the summary per miner, an http of null means that the miner has never been tested using http
    // A value of 0 means that the miner has been tested at some point in time but has never been successful.
    if (d.success_rate_http != null) {
      res.push({ type: 'HTTP only', value: d.success_rate_http * 100 })
    }
    return res
  })

  // We want to create a number of evenly spaced bins (thresholds) in which we can collect each success rate value into
  const binnedData = Array.from(new Set(data.map((item) => item.type))).flatMap(
    (type) => {
      const groupData = data.filter((d) => d.type === type)
      const bins = d3
        .bin()
        // The rates are percentage values, so the domain of the bins will be 0 to 100
        .domain([0, 100])
        .thresholds(thresholds)(groupData.map((d) => d.value))

      return bins.map((bin) => ({
        type,
        threshold: `${bin.x0}–${bin.x1}`,
        count: bin.length,
      }))
    },
  )

  return Plot.plot({
    marks: [
      Plot.barY(binnedData, {
        fx: 'threshold',
        y: 'count',
        x: 'type',
        fill: 'type',
      }),
    ],
    y: { grid: true },
    x: {
      axis: null,
      padding: 0.1,
    },
    color: {
      legend: true,
      label: 'Type',
    },
    width,
    title,
    facet: { label: 'Rate Ranges in %' },
  })
}
