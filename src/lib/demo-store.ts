"use client";

export type DemoOfferStatus = "pending" | "active" | "declined";

export type DemoOffer = {
  id: string;
  projectSlug: string;
  projectTitle: string;
  mentorName: string;
  mentorRole: string;
  motivation: string;
  status: DemoOfferStatus;
  createdAt: string;
};

export type DemoMessage = {
  id: string;
  offerId: string;
  sender: "mentor" | "owner";
  content: string;
  createdAt: string;
};

const OFFERS_KEY = "bidhra_demo_offers_v1";
const MESSAGES_KEY = "bidhra_demo_messages_v1";

function isBrowser(): boolean {
  return typeof window !== "undefined";
}

function safeParse<T>(raw: string | null, fallback: T): T {
  if (!raw) return fallback;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export function listOffers(): DemoOffer[] {
  if (!isBrowser()) return [];
  return safeParse<DemoOffer[]>(localStorage.getItem(OFFERS_KEY), []);
}

export function saveOffer(offer: DemoOffer): void {
  if (!isBrowser()) return;
  const existing = listOffers();
  const next = [offer, ...existing.filter((o) => o.id !== offer.id)];
  localStorage.setItem(OFFERS_KEY, JSON.stringify(next));
  notifyOffersChanged();
}

export function updateOfferStatus(id: string, status: DemoOfferStatus): void {
  if (!isBrowser()) return;
  const next = listOffers().map((o) => (o.id === id ? { ...o, status } : o));
  localStorage.setItem(OFFERS_KEY, JSON.stringify(next));
  notifyOffersChanged();
}

export function getOffer(id: string): DemoOffer | undefined {
  return listOffers().find((o) => o.id === id);
}

export function listMessages(offerId: string): DemoMessage[] {
  if (!isBrowser()) return [];
  const all = safeParse<DemoMessage[]>(localStorage.getItem(MESSAGES_KEY), []);
  return all
    .filter((m) => m.offerId === offerId)
    .sort((a, b) => a.createdAt.localeCompare(b.createdAt));
}

export function saveMessage(message: DemoMessage): void {
  if (!isBrowser()) return;
  const all = safeParse<DemoMessage[]>(localStorage.getItem(MESSAGES_KEY), []);
  all.push(message);
  localStorage.setItem(MESSAGES_KEY, JSON.stringify(all));
  notifyMessagesChanged(message.offerId);
}

const OFFERS_CHANNEL = "bidhra_offers_channel";
const MESSAGES_CHANNEL = "bidhra_messages_channel";

function notifyOffersChanged(): void {
  if (!isBrowser()) return;
  try {
    const ch = new BroadcastChannel(OFFERS_CHANNEL);
    ch.postMessage({ type: "offers_changed" });
    ch.close();
  } catch {
    // BroadcastChannel may be unavailable; storage event still fires across tabs.
  }
}

function notifyMessagesChanged(offerId: string): void {
  if (!isBrowser()) return;
  try {
    const ch = new BroadcastChannel(MESSAGES_CHANNEL);
    ch.postMessage({ type: "messages_changed", offerId });
    ch.close();
  } catch {
    // ignore
  }
}

export function subscribeOffers(handler: () => void): () => void {
  if (!isBrowser()) return () => {};
  const onStorage = (e: StorageEvent) => {
    if (e.key === OFFERS_KEY) handler();
  };
  window.addEventListener("storage", onStorage);

  let ch: BroadcastChannel | null = null;
  try {
    ch = new BroadcastChannel(OFFERS_CHANNEL);
    ch.onmessage = handler;
  } catch {
    ch = null;
  }

  return () => {
    window.removeEventListener("storage", onStorage);
    ch?.close();
  };
}

export function subscribeMessages(
  offerId: string,
  handler: () => void,
): () => void {
  if (!isBrowser()) return () => {};
  const onStorage = (e: StorageEvent) => {
    if (e.key === MESSAGES_KEY) handler();
  };
  window.addEventListener("storage", onStorage);

  let ch: BroadcastChannel | null = null;
  try {
    ch = new BroadcastChannel(MESSAGES_CHANNEL);
    ch.onmessage = (event) => {
      if (event.data?.offerId === offerId) handler();
    };
  } catch {
    ch = null;
  }

  return () => {
    window.removeEventListener("storage", onStorage);
    ch?.close();
  };
}

export function newId(): string {
  if (isBrowser() && typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `id-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}
