import { jsonFetcher } from './json-fetcher.js'
import { getDateXDaysAgo } from '../utils/date-utils.js'

const from = '2024-04-07'
const to = getDateXDaysAgo(1)

const output = await jsonFetcher(
  `https://stats.filspark.com/retrieval-success-rate?from=${from}&to=${to}`,
)
process.stdout.write(JSON.stringify(output))
