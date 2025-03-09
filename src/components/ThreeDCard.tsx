import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import { Badge } from "./ui/badge";
import { Label } from "./ui/label";

// Define props interface
interface ThreeDCardProps {
  title?: string;
  titleBadge?: string;
  tags?: string[];
  description?: string;
  imageUrl: string;
  tourLink?: string;
  buttonText: string;
  descriptionList?: {
    title: string;
    value: string;
  }[];
  translateZ?: string;
}

// Update the component to accept props
export function ThreeDCard({
  title,
  description,
  titleBadge,
  tags,
  imageUrl,
  descriptionList,
  translateZ = "20",
}: ThreeDCardProps) {
  return (
    <CardContainer>
      <CardBody className="bg-gray-50 relative dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto h-auto rounded-xl p-6 border">
        <div className="flex justify-between items-center">
          <CardItem
            translateZ={translateZ}
            className="text-xl font-bold text-neutral-600 dark:text-white"
          >
            {title}
          </CardItem>
          {titleBadge && (
            <CardItem
              translateZ={translateZ}
              className="text-xl font-bold text-neutral-600 dark:text-white"
            >
              <Badge>{titleBadge}</Badge>
            </CardItem>
          )}
        </div>
        {descriptionList?.map((description) => {
          return (
            <div className="flex justify-between items-center">
              <Label>{description?.title}</Label>
              <CardItem
                translateZ={translateZ}
                as="button"
                className="px-4 py-2 dark:bg-white dark:text-black text-black text-xs font-bold"
              >
                {description?.value}
              </CardItem>
            </div>
          );
        })}
        <CardItem translateZ={translateZ}>
          <img
            src={imageUrl}
            height="1000"
            width="1000"
            className="h-60 w-full object-contain rounded-xl group-hover/card:shadow-xl"
            alt={title}
          />
        </CardItem>
        <div className="flex flex-wrap">
          {tags?.map((tag) => {
            return (
              <CardItem
                translateZ={translateZ}
                className="px-2 py-1 dark:bg-white dark:text-black text-black text-xs font-bold"
              >
                <Badge variant="outline">{`#${tag}`}</Badge>
              </CardItem>
            );
          })}
        </div>
        <CardItem
          as="p"
          translateZ={translateZ}
          className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
        >
          {description}
        </CardItem>
      </CardBody>
    </CardContainer>
  );
}
