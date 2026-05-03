import { readFile } from "node:fs/promises";
import path from "node:path";
import {
  accountsSchema,
  competitorsSchema,
  marketSignalsSchema,
  productMetricsSchema,
  supportTicketsSchema,
  type Account,
  type Competitor,
  type MarketSignal,
  type ProductMetric,
  type SupportTicket
} from "../schemas/data.js";

const dataRoot = path.join(process.cwd(), "data", "mock");

async function readJsonFile(fileName: string): Promise<unknown> {
  const filePath = path.join(dataRoot, fileName);
  const raw = await readFile(filePath, "utf8");
  return JSON.parse(raw);
}

export async function loadAccounts(): Promise<Account[]> {
  return accountsSchema.parse(await readJsonFile("accounts.json"));
}

export async function loadCompetitors(): Promise<Competitor[]> {
  return competitorsSchema.parse(await readJsonFile("competitors.json"));
}

export async function loadMarketSignals(): Promise<MarketSignal[]> {
  return marketSignalsSchema.parse(await readJsonFile("market_signals.json"));
}

export async function loadSupportTickets(): Promise<SupportTicket[]> {
  return supportTicketsSchema.parse(await readJsonFile("support_tickets.json"));
}

export async function loadProductMetrics(): Promise<ProductMetric[]> {
  return productMetricsSchema.parse(await readJsonFile("product_metrics.json"));
}

export async function loadAllMockData() {
  const [accounts, competitors, marketSignals, supportTickets, productMetrics] =
    await Promise.all([
      loadAccounts(),
      loadCompetitors(),
      loadMarketSignals(),
      loadSupportTickets(),
      loadProductMetrics()
    ]);

  return {
    accounts,
    competitors,
    marketSignals,
    supportTickets,
    productMetrics
  };
}
