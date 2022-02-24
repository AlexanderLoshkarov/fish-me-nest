import { Command, Positional } from 'nestjs-command';
import { Injectable } from '@nestjs/common';

import { DeliveryService } from '../service/delivery.service';
import { Delivery } from 'src/model/delivery.schema';

@Injectable()
export class DeliverySeedCommand {
  constructor(private readonly deliveryService: DeliveryService) {}

  @Command({
    command: 'create:delivery',
    describe: 'create delivery',
  })
  async create() {
    const nextDelivery: Omit<Delivery, 'createdDate'>[] = [
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

    const savedDelivery = await Promise.all(
      nextDelivery.map((item) => this.deliveryService.create(item)),
    );

    savedDelivery.forEach(console.log);
  }
}
