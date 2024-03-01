import { JsonCategoryItem } from "./category.service";

export const jsonCategories: JsonCategoryItem[] = [
  {
    name: "Carnes",
    subcategories: [
      {
        name: "Cerdo",
        subcategories: [
          {
            name: "Chuleta de Cerdo",
          },
        ],
      },
      {
        name: "Res",
        subcategories: [
          {
            name: "Filete de Res",
          },
        ],
      },
    ],
  },
  {
    name: "Perfumes",
    subcategories: [
      {
        name: "Perfumes Masculinos",
        subcategories: [
          {
            name: "Perfume EL",
          },
        ],
      },
      {
        name: "Perfumes Femeninos",
        subcategories: [
          {
            name: "Perfume Alicia",
          },
        ],
      },
    ],
  },
  {
    name: "Ropa",
    subcategories: [
      {
        name: "Ropa de Hombre",
        subcategories: [
          {
            name: "Pantalon",
          },
          {
            name: "Calsoncillo",
          },
        ],
      },
      {
        name: "Ropa de Mujer",
        subcategories: [
          {
            name: "Ajustador",
          },
          {
            name: "Blumer",
          },
        ],
      },
    ],
  },
];
