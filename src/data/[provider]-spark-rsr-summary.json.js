import pRetry from 'p-retry'
import { jsonFetcher } from './json-fetcher.js'
import { getDateXDaysAgo } from '../utils/date-utils.js'
import { parseArgs } from 'node:util'

const {
  values: { provider },
} = parseArgs({
  options: { provider: { type: 'string' } },
})

const start = '2024-04-07'
const end = getDateXDaysAgo(1)

const summary = await pRetry(
  () =>
    jsonFetcher(
      `https://stats.filspark.com/miner/${provider}/retrieval-success-rate/summary?from=${start}&to=${end}`,
    ),
  { retries: 3 },
)

process.stdout.write(JSON.stringify(summary))
