let message = 'こんにちは、webpack！';

export const APP_NAME = '速習webpack';

export function hello() {
  console.log(message);
}

export class Figure {
  static getTriangle(base, height) {
    return base * height / 2;
  }
}