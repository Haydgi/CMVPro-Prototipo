export const recipes = [
  {
    id: 1,
    name: "Risoto de Cogumelos",
    category: "Principal",
    cost: 28.50,
    profitMargin: 35,
    tempoDePreparo: 40,
    ingredients: [
      { name: "Arroz Arbóreo", quantity: 300, unit: "g", cost: 5.00 },
      { name: "Cogumelos", quantity: 200, unit: "g", cost: 8.00 }
    ],
    createdAt: "2024-05-15"
  },
  {
    id: 2,
    name: "Lasanha Bolonhesa",
    category: "Principal",
    cost: 35.00,
    profitMargin: 40,
    tempoDePreparo: 90,
    ingredients: [
      { name: "Massa de Lasanha", quantity: 250, unit: "g", cost: 4.00 },
      { name: "Molho de Tomate", quantity: 150, unit: "g", cost: 2.00 },
      { name: "Carne Moída", quantity: 300, unit: "g", cost: 12.00 }
    ],
    createdAt: "2024-05-16"
  },
  {
    id: 3,
    name: "Torta de Frango",
    category: "Salgado",
    cost: 22.00,
    profitMargin: 30,
    tempoDePreparo: 70,
    ingredients: [
      { name: "Farinha de Trigo", quantity: 200, unit: "g", cost: 1.50 },
      { name: "Frango Desfiado", quantity: 250, unit: "g", cost: 6.00 },
      { name: "Requeijão", quantity: 100, unit: "g", cost: 4.00 }
    ],
    createdAt: "2024-05-17"
  },
  {
    id: 4,
    name: "Brownie de Chocolate",
    category: "Sobremesa",
    cost: 18.00,
    profitMargin: 50,
    tempoDePreparo: 50,
    ingredients: [
      { name: "Chocolate Meio Amargo", quantity: 200, unit: "g", cost: 6.00 },
      { name: "Farinha de Trigo", quantity: 100, unit: "g", cost: 0.75 },
      { name: "Ovos", quantity: 2, unit: "un", cost: 2.00 }
    ],
    createdAt: "2024-05-18"
  },
  {
    id: 5,
    name: "Salada Caesar",
    category: "Entrada",
    cost: 15.00,
    profitMargin: 45,
    tempoDePreparo: 25,
    ingredients: [
      { name: "Alface Romana", quantity: 150, unit: "g", cost: 2.50 },
      { name: "Frango Grelhado", quantity: 100, unit: "g", cost: 4.00 },
      { name: "Molho Caesar", quantity: 50, unit: "g", cost: 2.00 }
    ],
    createdAt: "2024-05-19"
  },
  {
    id: 6,
    name: "Panqueca de Banana",
    category: "Café da Manhã",
    cost: 10.00,
    profitMargin: 60,
    tempoDePreparo: 20,
    ingredients: [
      { name: "Banana", quantity: 2, unit: "un", cost: 2.00 },
      { name: "Ovos", quantity: 1, unit: "un", cost: 1.00 },
      { name: "Aveia", quantity: 50, unit: "g", cost: 1.00 }
    ],
    createdAt: "2024-05-20"
  }
];

export const ingredients = [
  { name: "Arroz Arbóreo", category: "Grãos", costPerUnit: 16.67, unit: "kg", wasteRate: 10 },
  { name: "Arroz Arbóreo", category: "Grãos", costPerUnit: 18.32, unit: "kg", wasteRate: 10 },
  { name: "Arroz Arbóreo", category: "Grãos", costPerUnit: 30.00, unit: "kg", wasteRate: 10 },
  { name: "Cogumelos", category: "Vegetais", costPerUnit: 40.00, unit: "kg", wasteRate: 15 },
  { name: "Cogumelos", category: "Vegetais", costPerUnit: 50.00, unit: "kg", wasteRate: 15 },
  { name: "Massa de Lasanha", category: "Massas", costPerUnit: 16.00, unit: "kg", wasteRate: 5 },
  { name: "Molho de Tomate", category: "Molhos", costPerUnit: 13.33, unit: "kg", wasteRate: 8 },
  { name: "Carne Moída", category: "Carnes", costPerUnit: 40.00, unit: "kg", wasteRate: 20 },
  { name: "Farinha de Trigo", category: "Grãos", costPerUnit: 7.50, unit: "kg", wasteRate: 2 },
  { name: "Frango Desfiado", category: "Carnes", costPerUnit: 24.00, unit: "kg", wasteRate: 18 },
  { name: "Requeijão", category: "Laticínios", costPerUnit: 40.00, unit: "kg", wasteRate: 5 },
  { name: "Chocolate Meio Amargo", category: "Doces", costPerUnit: 30.00, unit: "kg", wasteRate: 5 },
  { name: "Ovos", category: "Ovos e Derivados", costPerUnit: 1.00, unit: "un", wasteRate: 0 },
  { name: "Alface Romana", category: "Verduras", costPerUnit: 16.67, unit: "kg", wasteRate: 25 },
  { name: "Molho Caesar", category: "Molhos", costPerUnit: 40.00, unit: "kg", wasteRate: 10 },
  { name: "Banana", category: "Frutas", costPerUnit: 2.00, unit: "un", wasteRate: 10 },
  { name: "Aveia", category: "Grãos", costPerUnit: 20.00, unit: "kg", wasteRate: 3 }
];
