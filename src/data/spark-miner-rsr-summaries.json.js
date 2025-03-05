import { jsonFetcher } from './json-fetcher.js'
import { getDateXDaysAgo } from '../utils/date-utils.js'

const summaries = {}

for (let i = 100; i >= 1; i--) {
  const dayString = getDateXDaysAgo(i)
  summaries[dayString] = await jsonFetcher(
    `https://stats.filspark.com/miners/retrieval-success-rate/summary?from=${dayString}&to=${dayString}`,
  )
}

process.stdout.write(JSON.stringify(summaries))