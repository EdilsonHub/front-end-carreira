export function converterDataAmericano(dataLimite: string) {
  const [data, hora] = (dataLimite || "").split(" ");

  if (!data) {
    return "";
  }
  return data.split("/").reverse().join("-") + " " + (hora || "");
}

export function converterDataBrasileira(dataLimite: string) {
  const [data, hora] = (dataLimite || "").split(" ");

  if (!data) {
    return "";
  }

  return (
    new Date(data).toLocaleDateString("pt-BR", { timeZone: "UTC" }) +
    " " +
    (hora || "")
  );
}
