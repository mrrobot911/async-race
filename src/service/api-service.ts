import { CarData } from '../interfaces/cars';

export default class ApiService {
  private static instance: ApiService;

  private readonly baseURL: string;

  constructor() {
    if (!ApiService.instance) {
      ApiService.instance = this;
    }
    this.baseURL = import.meta.env.VITE_FETCH_URL;
  }

  public async getCars() {
    try {
      const response = await fetch(`${this.baseURL}/garage`, {
        method: 'GET',
        headers: { 'Content-type': 'application/json' },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }

  public async createCar(value: Omit<CarData, 'id'>) {
    try {
      const response = await fetch(`${this.baseURL}/garage`, {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(value),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }

  public async updateCar(value: CarData) {
    try {
      const response = await fetch(`${this.baseURL}/garage/${value.id}`, {
        method: 'PUT',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({ name: value.name, color: value.color }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }
}
