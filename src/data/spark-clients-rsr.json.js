import { jsonFetcher } from "./json-fetcher.js";
import { getDateXDaysAgo } from "../utils/date-utils.js";

const from = getDateXDaysAgo(31);
const to = getDateXDaysAgo(1);

const output = await jsonFetcher(`https://stats.filspark.com/clients/retrieval-success-rate/summary?from=${from}&to=${to}`);  
process.stdout.write(JSON.stringify(output));