const images = import.meta.glob("/public/Images/*", {
    eager: true,
    import: "default",
});

export function getScholarshipImage(title, universityName) {
  const fallback = "/Images/Not_Available.webp";

  const normalize = (str) =>
    str?.toLowerCase().replace(/[^a-z0-9]/g, "") || "";

  const normTitle = normalize(title);
  const normUni = normalize(universityName);

  // 1️⃣ Try matching by university name
  for (const path in images) {
    const file = path.split("/").pop().toLowerCase().replace(/\..+$/, "");
    const normFile = normalize(file);

    if (normFile.includes(normUni)) {
      return images[path];
    }
  }

  // 2️⃣ Try matching by scholarship title
  for (const path in images) {
    const file = path.split("/").pop().toLowerCase().replace(/\..+$/, "");
    const normFile = normalize(file);

    if (normFile.includes(normTitle)) {
      return images[path];
    }
  }

  return fallback;
}