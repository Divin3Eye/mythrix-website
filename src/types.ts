export interface Source {
  id: string;
  title: string;
  content: string;
  format?: string;
  size?: string;
  date?: string;
  category?: string;
}

export interface NoteBlock {
  id: string;
  content: string;
  level: number; // For indentation levels
  isEditing?: boolean;
}

export interface Message {
  id: string;
  sender: "user" | "assistant";
  text: string;
  simulated?: boolean;
  grounded?: boolean;
  timestamp?: string;
}

export interface Citation {
  index: number;
  title: string;
  quote: string;
  page?: string;
}

export interface SearchResult {
  id: string;
  title: string;
  score: number;
  snippet: string;
  sourceIndex: number;
}
