import styled from "@emotion/styled";

export const Container = styled.div`
  max-width: 1280px;
  margin: 0px auto;
  width: 100%;
`;

export function PriceType(type) {
  if (type === "usd") {
    return "$";
  } else if (type == "rub") {
    return "₽";
  } else if (type === "eur") {
    return "₹";
  }
}

export const radioButtons = [
  { id: "option1", label: "24 Hours", value: "24" },
  { id: "option2", label: "30 Days", value: "30" },
  { id: "option3", label: "3 Month", value: "3" },
  { id: "option4", label: "1 Year Hours", value: "1" },
];
export function formatNumber(number) {
  if (!number) return null; // Null yoki undefined qiymatlarni tekshirish

  // Sonni raqamlarga ajratib chiqish
  const parts = number.toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  // Raqamlar birlikini ko'rsatish
  return parts.join(".");
}
