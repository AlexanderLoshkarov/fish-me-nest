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
      },
      {
        name: 'Salmon',
        description: 'Premium File',
      },
      {
        name: 'Salmon',
        description: 'Zhivotiki',
      },
      {
        name: 'Salmon',
        description: 'Scottish',
      },
    ];

    const savedProducts = await Promise.all(
      products.map((product) => this.productService.create(product)),
    );

    savedProducts.forEach(console.log);
  }
}
