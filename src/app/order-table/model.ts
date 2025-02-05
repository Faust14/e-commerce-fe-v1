import {User} from '../user/model/user.model';
import {Product} from '../product/model/product.model';

export interface Order {
  id: number
  userResponse: User
  products: Product[]
  localDateTime: Date
  isExpanded?: boolean;
}
