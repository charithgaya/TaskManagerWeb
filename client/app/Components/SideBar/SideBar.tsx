"use client";

import { useUserContext } from '@/context/userContext';
import Profile from '../Profile/Profile';
import RadioChart from '../RadioChart/RadioChart';

import Button from "@/components/ui/Button";
import { Separator } from "@/components/ui/separator";
import { Card } from "@/components/ui/card";

function SideBar() {
  const { logoutUser } = useUserContext();

  return (
    <aside className="w-[18rem] p-4">
      <Card className="h-full p-4 shadow-sm hover:shadow-md transition border-border">

        {/* Top */}
        <div className="space-y-6">
          <Profile />

          <Separator />

          <div className="px-2">
            <RadioChart />
          </div>
        </div>

        {/* Bottom */}
        <div className="flex items-center justify-center">
          <Button
            variant="danger"
            className="text-primary-foreground cursor-pointer"
            onClick={logoutUser}
          >
            Sign out
          </Button>
        </div>

      </Card>
    </aside>
  );
}

export default SideBar;