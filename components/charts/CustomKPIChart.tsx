import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';

interface CustomKPIChartProps {
  title: string;
  description: string;
  footerText?: string;
}

export const CustomKPIChart = ({ title, description, footerText }: CustomKPIChartProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>test</CardContent>
      {footerText && <CardFooter>{footerText}</CardFooter>}
    </Card>
  );
};
