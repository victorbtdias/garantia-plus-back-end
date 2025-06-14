import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { User } from '../users/user.model';

@Table
export class Product extends Model {
  @ForeignKey(() => User)
  @Column({ allowNull: false, type: DataType.INTEGER })
  userId: number;

  @Column({ allowNull: false, type: DataType.STRING })
  name: string;

  @Column({ allowNull: false, type: DataType.STRING })
  category: string;

  @Column(DataType.STRING)
  brand: string;

  @Column(DataType.STRING)
  store: string;

  @Column(DataType.STRING)
  serialNumber: string;

  @Column(DataType.DECIMAL)
  price: number;

  @Column({ allowNull: false, type: DataType.DATE })
  purchaseDate: Date;

  @Column({ allowNull: false, type: DataType.INTEGER })
  warrantyMonths: number;

  @Column(DataType.TEXT)
  description: string;

  @Column(DataType.STRING)
  imageUrl: string;

  @Column(DataType.STRING)
  noteUrl: string;

  @BelongsTo(() => User)
  user: User;
}
