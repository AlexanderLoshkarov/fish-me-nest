import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Delivery, DeliveryDocument } from '../model/delivery.schema';

@Injectable()
export class DeliveryService {
  constructor(
    @InjectModel(Delivery.name) private deliveryModel: Model<DeliveryDocument>,
  ) {}

  async getNextDeliveryProducts(): Promise<Delivery[]> {
    return this.deliveryModel.find().exec();
  }

  async create(delivery: Omit<Delivery, 'createdDate'>): Promise<Delivery> {
    const reqBody = {
      name: delivery.name,
      description: delivery.description,
      price: delivery.price,
      unit: delivery.unit,
    };
    const newDelivery = new this.deliveryModel(reqBody);
    return newDelivery.save();
  }
}
