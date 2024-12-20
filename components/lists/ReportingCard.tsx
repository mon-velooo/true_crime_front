import { Badge } from "../ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";

export interface ReportingData {
  id?: string;
  latitude: number;
  longitude: number;
  status: string;
  description: string;
}

export const ReportingCard = ({ id, status, description, latitude, longitude  }: ReportingData) => {
  return (
    <Card className="bg-card-secondary">
      <CardHeader>
        <CardTitle>{description}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-2">
          <p className="text-xs text-foreground">ID : {id}</p>
          <div className="flex justify-between gap-2">
            <p className="flex items-center gap-1 text-xs text-muted-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground/60" />
              {latitude}, {longitude}
            </p>
            {status && (
              <Badge variant="destructive">{status}</Badge>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}