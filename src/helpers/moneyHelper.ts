export function converterMoedaBrasileira(centavos: number) {
  return (centavos / 100).toLocaleString("pt-br", {
    style: "currency",
    currency: "BRL",
  });
}
