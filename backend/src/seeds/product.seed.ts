import { Command, Positional } from 'nestjs-command';
import { Injectable } from '@nestjs/common';

import { ProductService } from '../service/product.service';
import { Product } from 'src/model/product.schema';

@Injectable()
export class ProductSeedCommand {
  constructor(private readonly productService: ProductService) {}

  @Command({
    command: 'create:products',
    describe: 'create set of products',
  })
  async create() {
    const products: Omit<Product, 'createdDate'>[] = [
      {
        name: 'Riapushka',
        description: '4ishenaya',
        unit: '1 KG',
        price: 10.0,
      },
      {
        name: 'Salmon',
        description: 'Premium File',
        unit: '1 KG',
        price: 15.5,
      },
      {
        name: 'Salmon',
        description: 'Zhivotiki',
        unit: '0.5 KG',
        price: 3.25,
      },
      {
        name: 'Salmon',
        description: 'Scottish',
        unit: '1 KG',
        price: 9.0,
      },
    ];

    const savedProducts = await Promise.all(
      products.map((product) => this.productService.create(product)),
    );

    savedProducts.forEach(console.log);
  }
}
