import { jsonFetcher } from './src/data/json-fetcher.js'
import { getDateXDaysAgo } from './src/utils/date-utils.js'

const startProviders = '2024-04-07'
const startClients = '2025-02-25'
const startAllocators = '2025-03-26'
const end = getDateXDaysAgo(1)

const providersSummary = await jsonFetcher(
  `https://stats.filspark.com/miners/retrieval-success-rate/summary?from=${startProviders}&to=${end}`,
)
const clientsSummary = await jsonFetcher(
  `https://stats.filspark.com/clients/retrieval-success-rate/summary?from=${startClients}&to=${end}`,
)
const allocatorsSummary = await jsonFetcher(
  `https://stats.filspark.com/allocators/retrieval-success-rate/summary?from=${startAllocators}&to=${end}`,
)
const providerPaths = providersSummary.map(
  (provider) => `/provider/${provider.miner_id}`,
)
const clientPaths = clientsSummary.map(
  (client) => `/client/${client.client_id}`,
)
const allocatorPaths = allocatorsSummary.map(
  (allocator) => `/allocator/${allocator.allocator_id}`,
)
// See https://observablehq.com/framework/config for documentation.
export default {
  // The app’s title; used in the sidebar and webpage titles.
  title: 'Spark Dashboard',

  // The pages and sections in the sidebar. If you don’t specify this option,
  // all pages will be listed in alphabetical order. Listing pages explicitly
  // lets you organize them into sections and have unlisted pages.
  // pages: [
  //   {
  //     name: "Examples",
  //     pages: [
  //       {name: "Dashboard", path: "/example-dashboard"},
  //       {name: "Report", path: "/example-report"}
  //     ]
  //   }
  // ],

  // Content to add to the head of the page, e.g. for a favicon:
  head: '<link rel="icon" href="media/spark-with-bbox.png" type="image/png" sizes="32x32"><script defer data-domain="dashboard.filspark.com" src="https://plausible.io/js/script.js"></script>',

  // The path to the source root.
  root: 'src',

  // Some additional configuration options and their defaults:
  theme: 'dark', // try "light", "dark", "slate", etc.
  // header: "", // what to show in the header (HTML)
  // footer: "Built with Observable.", // what to show in the footer (HTML)
  sidebar: false, // whether to show the sidebar
  // toc: true, // whether to show the table of contents
  // pager: true, // whether to show previous & next links in the footer
  // output: "dist", // path to the output root for build
  // search: true, // activate search
  // linkify: true, // convert URLs in Markdown to links
  // typographer: false, // smart quotes and other typographic improvements
  // cleanUrls: true, // drop .html from URLs
  dynamicPaths: [...providerPaths, ...clientPaths,...allocatorPaths],
}
