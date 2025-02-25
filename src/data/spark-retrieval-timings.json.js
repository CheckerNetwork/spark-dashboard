import pRetry from 'p-retry'
import { jsonFetcher } from './json-fetcher.js'
import { getDateXDaysAgo } from '../utils/date-utils.js'

const start = '2025-01-14'
const end = getDateXDaysAgo(1)

const summary = await pRetry(
  () =>
    jsonFetcher(
      `https://stats.filspark.com/retrieval-timings/daily?from=${start}&to=${end}`,
    ),
  { retries: 3 },
)

process.stdout.write(JSON.stringify(summary))
