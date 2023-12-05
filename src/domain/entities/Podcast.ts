export class Podcast {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly author: string;
  readonly picture: string;

  constructor(id: string, title: string, description: string, author: string, picture: string) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.author = author;
    this.picture = picture;
  }
}
