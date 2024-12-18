import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';

interface CustomKPIChartProps {
  title: string;
  description: string;
  trend?: {
    value: number;
    isUp: boolean;
  };
  footerText?: string;
}

export const CustomKPIChart = ({ title, description, footerText }: CustomKPIChartProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>
          <p className="mt-10 scroll-m-20 pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
            {description}
          </p>
        </CardDescription>
      </CardHeader>
      {footerText && <CardFooter>{footerText}</CardFooter>}
    </Card>
  );
};
