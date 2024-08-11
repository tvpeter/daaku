export abstract class AbstractSeeder {
  abstract seed(): Promise<void>;

  abstract generateData(): Promise<any[]>;

  abstract count(): Promise<number>;
}
