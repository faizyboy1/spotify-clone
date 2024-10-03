import { seedData } from './../../db/seeds/seed-data';
import { DataSource } from 'typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SeedService {
    constructor(private readonly connection:DataSource) {}
    async seed():Promise<void>{
        const queryRunner = this.connection.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const manager = queryRunner.manager;
            await seedData(manager);
            await queryRunner.commitTransaction(); //4
            } catch (err) {
            console.log("Error during database seeding:", err);
            await queryRunner.rollbackTransaction(); // 5
            } finally {
            await queryRunner.release(); //6
            }
    }
}
