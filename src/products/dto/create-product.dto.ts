import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsNumber,
  IsDateString,
  Min,
} from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty({ message: 'O nome do produto é obrigatório' })
  @IsString({ message: 'O nome deve ser uma string' })
  name: string;

  @IsNotEmpty({ message: 'A categoria é obrigatória' })
  @IsString({ message: 'A categoria deve ser uma string' })
  category: string;

  @IsOptional()
  @IsString({ message: 'A marca deve ser uma string' })
  brand?: string;

  @IsOptional()
  @IsString({ message: 'A loja deve ser uma string' })
  store?: string;

  @IsOptional()
  @IsString({ message: 'O número de série deve ser uma string' })
  serialNumber?: string;

  @IsOptional()
  @IsNumber({}, { message: 'O preço deve ser um número' })
  price?: number;

  @IsNotEmpty({ message: 'A data de compra é obrigatória' })
  @IsDateString(
    {},
    { message: 'A data de compra deve estar no formato ISO (AAAA-MM-DD)' },
  )
  purchaseDate: string;

  @IsNotEmpty({ message: 'O tempo de garantia é obrigatório' })
  @IsNumber({}, { message: 'O tempo de garantia deve ser um número' })
  @Min(0, { message: 'A garantia deve ser um número maior ou igual a 0' })
  warrantyMonths: number;

  @IsOptional()
  @IsString({ message: 'A descrição deve ser uma string' })
  description?: string;

  @IsOptional()
  @IsString({ message: 'A imagem deve ser uma string' })
  imageUrl?: string;

  @IsOptional()
  @IsString({ message: 'A nota deve ser uma string' })
  noteUrl?: string;
}
