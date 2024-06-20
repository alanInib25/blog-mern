export function useShortString({ stringText, stringLength }) {
  const text =
    stringText.length > stringLength
      ? `${stringText.substring(0, stringLength)}...`
      : stringText;
  return { text };
}
