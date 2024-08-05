import { ConnectionPool, Request } from 'mssql';
import mssql from 'mssql';
import { sqlConfig } from '../config';

class DbHelper {
  private pool: Promise<ConnectionPool>;

  constructor() {
    this.pool = mssql.connect(sqlConfig);
  }

  private createRequest(emptyRequest: Request, data: { [x: string]: string | number | boolean }) {
    const keys = Object.keys(data);
    keys.forEach(key => {
      emptyRequest.input(key, data[key]);
    });
    return emptyRequest;
  }

  async exec(storedProcedure: string, data: { [x: string]: string | number | boolean }) {
    try {
      const pool = await this.pool;
      const request = pool.request();
      const preparedRequest = this.createRequest(request, data);
      const results = await preparedRequest.execute(storedProcedure);
      return results;
    } catch (error) {
      console.error('Error in exec:', error);
      throw error;
    }
  }

  async query(queryString: string) {
    try {
      const pool = await this.pool;
      return await pool.request().query(queryString);
    } catch (error) {
      console.error('Error in query:', error);
      throw error;
    }
  }

  async get(storedProcedure: string, data: { [x: string]: string | number | boolean }) {
    try {
      const pool = await this.pool;
      const request = pool.request();
      const preparedRequest = this.createRequest(request, data);
      const results = await preparedRequest.execute(storedProcedure);
      return results.recordset[0];
    } catch (error) {
      console.error('Error in get:', error);
      throw error;
    }
  }

  async getAll(storedProcedure: string, data?: { [x: string]: string | number | boolean }) {
    try {
      const pool = await this.pool;
      const request = pool.request();
      const preparedRequest = data ? this.createRequest(request, data) : request;
      const results = await preparedRequest.execute(storedProcedure);
      return results.recordset;
    } catch (error) {
      console.error('Error in getAll:', error);
      throw error;
    }
  }
}

export default DbHelper;