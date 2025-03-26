import pRetry from 'p-retry'
import { jsonFetcher } from './json-fetcher.js'
import { getDateXDaysAgo } from '../utils/date-utils.js'
import { parseArgs } from 'node:util'

const {
  values: { allocator },
} = parseArgs({
  options: { allocator: { type: 'string' } },
})
const start = '2025-02-25'
const end = getDateXDaysAgo(1)
const summary = await pRetry(
  () =>
    jsonFetcher(
      `https://stats.filspark.com/allocator/${allocator}/retrieval-success-rate/summary?from=${start}&to=${end}`,
    ),
  { retries: 3 },
)
process.stdout.write(JSON.stringify(summary))
