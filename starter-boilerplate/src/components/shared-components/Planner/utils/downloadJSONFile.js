export function downloadJSONFile(data, filename) {
  const json = JSON.stringify(data);
  const blob = new Blob([json], { type: "application/json" });

  const url = window.URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", filename);

  document.body.appendChild(link);
  link.click();

  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
}
