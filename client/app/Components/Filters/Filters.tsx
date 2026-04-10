import Button from '@/components/ui/Button';
import { useTasks } from '@/context/taskContext';
import { cn } from '@/lib/utils';
import React from 'react';
function Filters() {
    const { priority, setPriority } = useTasks();
    const priorities = ["All", "Low", "Medium", "High"];
    const [activeIndex, setActiveIndex] = React.useState(0);

  return (
    <div className="relative md:p-0.5 p-1 grid grid-cols-4 items-center justify-center gap-2 border-border bg-muted rounded-lg">
        <span 
            className='absolute top-1 left-1 h-[calc(100%-8px)] bg-primary rounded-md shadow-sm transition-all duration-300'
            style={{
                width: 'calc(100% /4 - 2px)',
                transform: `translate(calc(${activeIndex} * 100%))`,
                // transition: 'transform 300ms cubic-bezier(.95, .03, 1, 1)',
            }}
        >
        </span>
        {priorities.map((priority, i) => (
            <Button
                type="button"
                variant="ghost"
                key={i}
                className={cn("relative py-1.5 z-10 font-medium text-sm transitions-colors",
                    activeIndex === i ? "text-primary-foreground" : "text-muted-foreground"
                )}
                onClick={() => {
                    setActiveIndex(i);
                    setPriority(priority.toLowerCase());
                }}
            >
                {priority}
            </Button>
        ))}
    </div>
  )
}

export default Filters;

