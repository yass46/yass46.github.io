import { items } from "./items.js"; // Importando os itens corretamente

export function getAllItems() {
  return items;
}

export function getItemById(id) {
  return items.find(item => item.id === id);
}
