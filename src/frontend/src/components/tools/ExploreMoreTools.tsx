import { Link } from '@tanstack/react-router';
import { ArrowRight } from 'lucide-react';
import { ToolLink } from '@/utils/exploreMoreTools';

interface ExploreMoreToolsProps {
  tools: ToolLink[];
}

export function ExploreMoreTools({ tools }: ExploreMoreToolsProps) {
  if (tools.length === 0) {
    return null;
  }

  return (
    <section className="mt-12 pt-8 border-t border-border">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-lg font-semibold mb-4 text-foreground">Explore More Tools</h2>
        <div className="flex flex-wrap gap-3">
          {tools.map((tool) => (
            <Link
              key={tool.route}
              to={tool.route}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-foreground hover:text-primary bg-muted hover:bg-muted/80 rounded-md transition-colors"
            >
              {tool.title}
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
