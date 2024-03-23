export default class ApiService {
  private static instance: ApiService;

  private readonly baseURL: string;

  constructor() {
    if (!ApiService.instance) {
      ApiService.instance = this;
    }
    this.baseURL = import.meta.env.VITE_FETCH_URL;
  }

  async getCars() {
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
}
