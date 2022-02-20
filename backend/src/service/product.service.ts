import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductDocument } from '../model/product.schema';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
  ) {}

  async getNextDeliveryProducts(): Promise<Product[]> {
    return this.productModel.find().exec();
  }

  async create(product: Omit<Product, 'createdDate'>): Promise<Product> {
    const reqBody = {
      name: product.name,
      description: product.description,
      price: product.price,
      unit: product.unit,
    };
    const newProduct = new this.productModel(reqBody);
    return newProduct.save();
  }
}
