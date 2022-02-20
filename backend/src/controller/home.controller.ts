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
import { ProductService } from '../service/product.service';
import { JwtService } from '@nestjs/jwt';

@Controller('/api/v1/home')
export class HomeController {
  constructor(
    private readonly productService: ProductService,
    private jwtService: JwtService,
  ) {}

  @Get()
  async products(): Promise<any[]> {
    const products = await this.productService.getNextDeliveryProducts();
    return products.map((p) => ({
      name: p.name,
      description: p.description,
      unit: p.unit,
      price: p.price,
    }));
  }
}
