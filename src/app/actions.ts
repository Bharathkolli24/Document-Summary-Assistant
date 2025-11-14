import type { ProcessedDocument } from "@/lib/types";

interface ProcessDocumentInput {
  name: string;
  content: string;
  summaryLength: "short" | "medium" | "long";
}

function summarizeSentencesReadable(
  text: string,
  summaryLength: "short" | "medium" | "long"
) {
  const sentences = text
    .split(/(?<=[.?!])\s+/)
    .map(s => s.trim())
    .filter(Boolean);

  const wordFreq: Record<string, number> = {};
  sentences.forEach(sentence => {
    sentence.split(/\s+/).forEach(word => {
      word = word.toLowerCase().replace(/[^a-z0-9]/g, "");
      if (!word) return;
      wordFreq[word] = (wordFreq[word] || 0) + 1;
    });
  });

  const scored = sentences.map((sentence, index) => {
    let score = 0;
    sentence.split(/\s+/).forEach(word => {
      word = word.toLowerCase().replace(/[^a-z0-9]/g, "");
      score += wordFreq[word] || 0;
    });
    return { sentence, score, index };
  });

  const sorted = scored.sort((a, b) => b.score - a.score);

  let maxSentences: number;
  if (summaryLength === "short") maxSentences = Math.min(3, sorted.length);
  else if (summaryLength === "medium") maxSentences = Math.min(6, sorted.length);
  else maxSentences = sorted.length;

  const topSentences = sorted
    .slice(0, maxSentences)
    .sort((a, b) => a.index - b.index)
    .map(s => s.sentence);

  return topSentences;
}

export async function processDocument(
  input: ProcessDocumentInput
): Promise<ProcessedDocument> {
  const { name, content, summaryLength } = input;

  const summarySentences = summarizeSentencesReadable(content, summaryLength);
  const summaryText = summarySentences.join("\n");
  return {
    name,
    content: summaryText,
    summary: summaryText,
    challenges: [],
  };
}
