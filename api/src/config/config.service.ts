import {Injectable} from '@nestjs/common';
import {parse} from 'dotenv';
import * as fs from 'fs';

@Injectable()
export class ConfigService {
  private readonly envConfig: { [key: string]: string };

  constructor() {
    const envFilePath = __dirname + '/../../.env';
    const existsPath = fs.existsSync(envFilePath);

    if (!existsPath) {
      console.log('.env file does not exist');
      process.exit(0);
    }

    this.envConfig = parse(fs.readFileSync(envFilePath));
  }

  get(key: string): string {
    return this.envConfig[key];
  }
}
