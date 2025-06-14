import {
  Table,
  Column,
  Model,
  DataType,
  BeforeSave,
  HasMany,
} from 'sequelize-typescript';
import * as bcrypt from 'bcrypt';
import { Product } from 'src/products/product.model';

@Table
export class User extends Model {
  @Column({ allowNull: false, type: DataType.STRING })
  declare name: string;

  @Column({ allowNull: false, unique: true, type: DataType.STRING })
  declare email: string;

  @Column({ allowNull: false, type: DataType.STRING })
  declare password: string;

  @Column(DataType.STRING)
  declare resetToken: string | null;

  @Column(DataType.DATE)
  declare resetTokenExpiresAt: Date | null;

  @BeforeSave
  static async hashPassword(user: User) {
    if (user.isNewRecord || user.changed('password')) {
      user.password = await bcrypt.hash(user.password.toString(), 10);
    }
  }

  async checkPassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }

  @HasMany(() => Product)
  products: Product[];
}
