import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  UploadedFiles,
  Put,
  Req,
  Res,
} from '@nestjs/common';
import { DeliveryService } from '../service/delivery.service';
import { JwtService } from '@nestjs/jwt';

@Controller('/api/v1/home')
export class HomeController {
  constructor(
    private readonly deliveryService: DeliveryService,
    private jwtService: JwtService,
  ) {}

  @Get()
  async index(): Promise<any[]> {
    const delivery = await this.deliveryService.getNextDeliveryProducts();
    return delivery.map((item) => ({
      name: item.name,
      description: item.description,
      unit: item.unit,
      price: item.price,
    }));
  }
}
