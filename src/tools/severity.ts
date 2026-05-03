import type { SupportTicket } from "../schemas/data.js";

const severityRank = {
  low: 1,
  medium: 2,
  high: 3,
  critical: 4
} as const;

export type TicketSeverity = keyof typeof severityRank;

export function getHighestSeverity(
  tickets: SupportTicket[]
): TicketSeverity | "none" {
  if (tickets.length === 0) {
    return "none";
  }

  return tickets.reduce<TicketSeverity>((highest, ticket) => {
    return severityRank[ticket.severity] > severityRank[highest]
      ? ticket.severity
      : highest;
  }, "low");
}

export function scoreSupportRisk(tickets: SupportTicket[]): "low" | "medium" | "high" {
  const openTickets = tickets.filter((ticket) => ticket.status !== "resolved");
  const highestSeverity = getHighestSeverity(openTickets);

  if (highestSeverity === "critical" || openTickets.length >= 4) {
    return "high";
  }

  if (highestSeverity === "high" || openTickets.length >= 2) {
    return "medium";
  }

  return "low";
}
