'use client';

import { Menu } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet';
import { Sidebar } from './Sidebar';
import { useSheetStore } from '@/store/sheet';
import { DialogTitle } from '@radix-ui/react-dialog';

export function MobileMenu() {
  const open = useSheetStore((state) => state.open);
  const setOpen = useSheetStore((state) => state.setOpen);

  return (
    <div className="md:hidden">
      <Sheet open={open} onOpenChange={(open) => setOpen(open)}>
        <SheetTrigger asChild>
          <Menu />
        </SheetTrigger>
        <SheetContent side="left" className="p-0">
          <DialogTitle className="sr-only">모바일 메뉴</DialogTitle>
          <Sidebar />
        </SheetContent>
      </Sheet>
    </div>
  );
}
