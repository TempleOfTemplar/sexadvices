export class Suggestion {
  id: number;
  title: string;
  description: string;
  body: string;
  cover: string;
  publishedAt: Date;
  authorId: number;
  categoriesIds: number[];
  toysIds: number[];

  constructor(data: any) {
    this.id = data.id;
    this.title = data.title;
    this.description = data.description;
    this.body = data.body;
    this.cover = data.cover;
    this.publishedAt = data.pub_date ? new Date(data.pub_date) : null;
    this.authorId = data.author;
    this.categoriesIds = data.categories;
    this.toysIds = data.toys;
  }
}
