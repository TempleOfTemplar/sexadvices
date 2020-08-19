export class Category {
  id: number;
  title: string;
  cover: string; // path to image
  constructor(data: any) {
    this.id = data.id;
    this.title = data.title;
    this.cover = data.cover;
  }

}
