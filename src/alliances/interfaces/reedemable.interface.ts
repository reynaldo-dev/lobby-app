export interface IToken {
  id: string;
  name: string;
  createdAt: string;
  required_points: number;
}

export interface IRedeemable {
  id: string;
  name: string;
  description: string;
  picture: string | null;
  required_token_id: string;
  required_token_amount: number;
  createdAt: string;
  stock: number;
  token: IToken;
}
