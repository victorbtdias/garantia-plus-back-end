import {
  Table,
  Column,
  Model,
  DataType,
  BeforeSave,
} from 'sequelize-typescript';
import * as bcrypt from 'bcrypt';

@Table
export class User extends Model {
  @Column({ allowNull: false, type: DataType.STRING })
  declare name: string;

  @Column({ allowNull: false, unique: true, type: DataType.STRING })
  declare email: string;

  @Column({ allowNull: false, type: DataType.STRING })
  declare password: string;

  @Column({ type: DataType.STRING })
  declare resetToken: string | null;

  @Column({ type: DataType.DATE })
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
}
