import { CarData } from '../interfaces/cars';

type Method = 'GET' | 'POST' | 'PUT' | 'DELETE';
export default class ApiService {
  private static instance: ApiService;

  private readonly baseURL: string;

  constructor() {
    this.baseURL = import.meta.env.VITE_FETCH_URL;
  }

  public static getInstance(): ApiService {
    if (!ApiService.instance) {
      ApiService.instance = new ApiService();
    }

    return ApiService.instance;
  }

  public async manageCars(method: Method, value?: Partial<CarData>) {
    // единая ответственность
    try {
      const response = await fetch(
        `${this.baseURL}/garage/${value?.id || ''}`,
        {
          method,
          headers: { 'Content-type': 'application/json' },
          body: JSON.stringify(value),
        }
      );
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
