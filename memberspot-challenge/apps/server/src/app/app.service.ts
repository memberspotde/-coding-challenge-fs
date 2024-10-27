import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import axios from 'axios';
import { PersonSchema } from '../../../../shared-models/src/lib/person.model';

@Injectable()
export class AppService {

  // Fetches people from SWAPI with homeworld details
  async getPeople(page: number = 1): Promise<any[]> {
    try {
      const response = await axios.get(`https://www.swapi.tech/api/people`, {
        params: { page, limit: 10 }
      });

      const people = response.data.results;
      const peopleWithHomeworld = [];

      for (const person of people) {
        const personDetailResponse = await axios.get(person.url);
        const personDetails = personDetailResponse.data.result.properties;

        if (!this.isValidUrl(personDetails.homeworld)) {
          throw new NotFoundException(`Invalid homeworld URL for person: ${personDetails.name}`);
        }

        const homeworldResponse = await axios.get(personDetails.homeworld);
        const homeworld = homeworldResponse.data.result.properties;

        const parsedPerson = PersonSchema.parse({
          name: personDetails.name,
          birth_year: personDetails.birth_year,
          homeworld: homeworld.name,
          homeworld_terrain: homeworld.terrain,
        });

        peopleWithHomeworld.push(parsedPerson);
      }

      return peopleWithHomeworld;
    } catch (error) {
      console.error('Error fetching people:', error);
      throw new InternalServerErrorException(
        error.response
          ? `Error fetching data from SWAPI: ${error.response.status} - ${error.response.statusText}`
          : 'Error fetching people due to a network issue or unexpected response'
      );
    }
  }

  // Checks if a given URL is valid and absolute
  private isValidUrl(url: string): boolean {
    try {
      if (!/^https?:\/\//.test(url)) {
        throw new Error("URL is not absolute");
      }
      new URL(url);
      return true;
    } catch {
      return false;
    }
  }
}
