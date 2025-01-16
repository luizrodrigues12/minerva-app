export const capitalize = (name: string) => {
  return name
    .trim()
    .toLowerCase()
    .split(" ")
    .map(
      (palavra, i) =>
        palavra.split("")[0].toUpperCase() + palavra.slice(1) + " "
    )
    .join("")
    .trim();
};
