import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { CreditCardIcon } from "lucide-react";

export async function SalesCard() {
  //const totalPosts = await fetchTotalPosts();

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">Sales</CardTitle>
        <CreditCardIcon className="w-4 h-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">+12,234</div>
        <p className="text-xs text-muted-foreground">+19% from last month</p>
      </CardContent>
    </Card>
  );
}

export default SalesCard;
