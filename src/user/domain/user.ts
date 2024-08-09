export class User {
  constructor(
    public id: string,
    public firstName: string,
    public lastName: string,
    public email: string,
    public password: string,
    public photo: string,
    public cheeses: string[],
    public params: {
      temperature: number;
      humidity: number;
      nh3: number;
      co2: number;
      ph: number;
    }
  ) {}
}
