declare namespace Express {
  export interface Request {
    user?: {
      userId: string;
    };
    file?: {
      buffer: Buffer;
      fieldname: string;
      originalname: string;
      encoding: string;
      mimetype: string;
      size: number;
    };
  }
}
