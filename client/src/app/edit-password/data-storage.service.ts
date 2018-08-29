import { Injectable } from '@angular/core';
import { Password } from '../api/_password';

@Injectable()
export class DataStorageService {

  public formData: Password;
  constructor() { }
}
