export class GetRoutineStretchingListResponse {
  id: number
  title: string;
  order: number;

  constructor(id: number, title: string, order: number) {
    this.id = id;
    this.title = title;
    this.order = order;
  }
}

export class GetRoutineListResponse {
  title: string;
  stretchingImageUrls: string[];
  stretchingCount: number;

  constructor(title: string, stretchingImageUrls: string[], stretchingCount: number) {
    this.title = title;
    this.stretchingImageUrls = stretchingImageUrls;
    this.stretchingCount = stretchingCount;
  }
}