import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('people') // Defines the route prefix for this controller (e.g., /api/people if using a global prefix)
export class AppController {
  constructor(private readonly appService: AppService) { }

  // Handles GET requests to /people, fetching a paginated list of people
  @Get()
  getPeople(@Query('page') page: number = 1) {
    return this.appService.getPeople(page);
  }
}
