import DashboardPage from "./dashboardPage";

export interface PartState {
  id: string;
  title: string;

  imageLink: string;
  productLink: string;
  package: string;
  quantity: number;
  manufacturer: string;

  prices: { ladder: string; price: number }[];
  description: string;
  createdAt: Date;
  updatedAt: Date;

  voltageRated?: number;
  resistance?: number;
  power?: number;
  tolerance?: number;
  type?: string;
  capacitance?: number;
  tempretureCoefficient?: number;
  minBuyQuantity?: number;
}

export default function Home() {
  return <DashboardPage />;
}
