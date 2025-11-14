export async function extractTextFromImage(file: File): Promise<string> {
  const apiKey = process.env.NEXT_PUBLIC_OCR_API_KEY;
  if (!apiKey) throw new Error("OCR API key missing");

  const formData = new FormData();
  formData.append("apikey", apiKey);
  formData.append("language", "eng");
  formData.append("isOverlayRequired", "false");
  formData.append("file", file);

  const res = await fetch("https://api.ocr.space/parse/image", {
    method: "POST",
    body: formData,
  });

  const data = await res.json();

  if (!data || !data.ParsedResults || !data.ParsedResults[0]) {
    throw new Error("OCR failed to extract text.");
  }

  return data.ParsedResults[0].ParsedText || "";
}
