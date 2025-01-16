import pRetry from 'p-retry';
import { jsonFetcher } from "./json-fetcher.js";
import { getDateXDaysAgo } from "../utils/date-utils.js";
import { parseArgs } from "node:util";

const {
    values: { provider }
} = parseArgs({
    options: { provider: { type: "string" } }
});

const start = '2025-01-14';
const end = getDateXDaysAgo(1);

const summary = await pRetry(() => jsonFetcher(`https://stats.filspark.com/miner/${provider}/retrieval-timings/summary?from=${start}&to=${end}`), { retries: 3 });

// fake datapoint on January 13th so chart starts from 0
process.stdout.write(JSON.stringify([{ day: '2025-01-13', ttfb_ms: 0 }, ...summary]));
