import pRetry from 'p-retry';
import { jsonFetcher } from "./json-fetcher.js";
import { getDateXDaysAgo } from "../utils/date-utils.js";
import { parseArgs } from "node:util";

const {
    values: { provider }
} = parseArgs({
    options: { provider: { type: "string" } }
});

const start = '2024-04-07';
const end = getDateXDaysAgo(1);

const summary = await pRetry(() => jsonFetcher(`http://127.0.0.1:8080/miner/${provider}/time-to-first-byte/summary?from=${start}&to=${end}`), { retries: 3 });

process.stdout.write(JSON.stringify(summary));
