export class Episode {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly date: string;
  readonly duration: string;
  readonly audio: string;

  constructor(id: string, title: string, description: string, date: string, duration: string, audio: string) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.date = date;
    this.duration = duration;
    this.audio = audio;
  }
}
