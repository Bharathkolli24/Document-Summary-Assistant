'use server';

import type { ProcessedDocument } from '@/lib/types';
import { summarizeDocument } from '@/ai/flows/auto-summarize-document';
import { generateChallengesFromDocument } from '@/ai/flows/generate-challenges-from-document';

interface ProcessDocumentInput {
  name: string;
  content: string;
  summaryLength?: 'short' | 'medium' | 'long';
}

function limitSummaryLines(text: string, length: 'short' | 'medium' | 'long') {
  const sentences = text
    .split(/(?<=[.?!])\s+/)
    .map(s => s.trim())
    .filter(Boolean);

  let maxSentences = sentences.length;
  if (length === 'short') maxSentences = Math.min(5, sentences.length);
  else if (length === 'medium') maxSentences = Math.min(15, sentences.length);
  // long uses all sentences

  return sentences.slice(0, maxSentences).join('\n');
}

export async function processDocument(
  docData: ProcessDocumentInput
): Promise<ProcessedDocument> {
  const { name, content, summaryLength = 'medium' } = docData;

  // Run summary generation and challenge generation in parallel
  const [summaryResult, challengesResult] = await Promise.all([
    summarizeDocument({ documentContent: content }),
    generateChallengesFromDocument({
      documentText: content,
      numQuestions: 3,
    }),
  ]);

  // Apply line-limiting based on summaryLength
  const finalSummary = limitSummaryLines(summaryResult.summary, summaryLength);

  const processedDoc: ProcessedDocument = {
    name,
    content,
    summary: finalSummary,
    challenges: challengesResult.questions || [],
  };

  return processedDoc;
}
