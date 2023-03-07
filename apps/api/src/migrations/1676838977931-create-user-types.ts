import { MigrationInterface, QueryRunner } from 'typeorm';

export class createUserTypes1676838977931 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      INSERT INTO user_types(id,label,isAdmin,isDefaulUserType)
      VALUES
        (1,'Admin',true,false),
        (2,'Regular',false,false);`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    `DELETE FROM user_types WHERE user_types.id IN (1,2)`;
  }
}
