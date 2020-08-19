export class Item {
  id: number;
  title: string;
  description: string;
  image: string;
  averagePrice: number;

  constructor(data: any) {
    this.id = data.id;
    this.title = data.title;
    this.description = data.description;
    this.image = data.image;
    this.averagePrice = data.average_price;
  }
}
