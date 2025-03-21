import * as Plot from 'npm:@observablehq/plot'

export function LineGraph(
  events,
  { width, height, title, start, end, fromZero } = {},
) {
  const startDate = new Date(start)
  const endDate = new Date(end)
  const filteredEvents = events.filter((event) => {
    const eventDate = new Date(event.day)
    return eventDate >= startDate && eventDate < endDate
  })
  const combinedData = [
    ...filteredEvents.map((event) => ({
      day: event.day,
      success_rate: event.success_rate,
      type: 'HTTP or Graphsync',
    })),
    ...filteredEvents.map((event) => ({
      day: event.day,
      success_rate_http: event.success_rate_http,
      type: 'HTTP only',
    })),
    ...filteredEvents.map((event) => ({
      day: event.day,
      success_rate_http_head: event.success_rate_http_head,
      type: 'HTTP only w/ HEAD',
    })),
  ]

  // Format functions for tooltip values
  const formatDate = (d) =>
    new Date(d).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  const formatPercent = (v) => (v ? `${v.toFixed(2)}%` : 'N/A')

  return Plot.plot({
    title,
    width,
    height,
    x: { type: 'utc', ticks: 'month', label: null },
    y: {
      grid: true,
      inset: 10,
      label: 'RSR (%)',
      percent: true,
      zero: fromZero ?? true,
    },
    color: { legend: true },
    marks: [
      Plot.lineY(combinedData, {
        x: 'day',
        y: 'success_rate',
        stroke: 'type',
        curve: 'linear',
        tip: {
          format: {
            x: formatDate,
            y: formatPercent,
            type: true,
          },
        },
      }),
      Plot.lineY(combinedData, {
        x: 'day',
        y: 'success_rate_http',
        stroke: 'type',
        curve: 'linear',
        tip: {
          format: {
            x: formatDate,
            y: formatPercent,
            type: true,
          },
        },
      }),
      Plot.lineY(combinedData, {
        x: 'day',
        y: 'success_rate_http_head',
        stroke: 'type',
        curve: 'linear',
        tip: {
          format: {
            x: formatDate,
            y: formatPercent,
            type: true,
          },
        },
      }),
    ],
  })
}
