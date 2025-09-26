
export interface Product {
  id: number;
  name: string;
  category: 'Anillos' | 'Aretes' | 'Collares' | 'Pulseras';
  material: 'Oro' | 'Plata' | 'Acero';
  price: number;
  imageUrl: string;
  description: string;
}

export interface CartItem extends Product {
  quantity: number;
}
