const FILLER_WORDS = new Set(["la", "le", "les", "un", "une", "des", "de", "du", "au", "aux", "est", "cest", "c", "je", "pense", "que", "la réponse", "réponse"]);

export function normalizeAnswer(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[’']/g, " ")
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function compact(value: string) {
  return normalizeAnswer(value).split(" ").filter((word) => !FILLER_WORDS.has(word)).join(" ");
}

export function answersMatch(spoken: string, accepted: string | string[]) {
  const spokenNormalized = compact(spoken);
  const acceptedValues = Array.isArray(accepted) ? accepted : [accepted];
  return acceptedValues.some((value) => {
    const target = compact(value);
    return spokenNormalized === target || spokenNormalized.includes(target) || target.includes(spokenNormalized);
  });
}
