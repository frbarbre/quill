import { appRouter } from '@/trpc';
import { inferRouterOutputs } from '@trpc/server';

type RouterOutput = inferRouterOutputs<typeof appRouter>;

type Messages = RouterOutput['getFileMessage']['messages'];

type OmitText = Omit<Messages[number], 'text'>;

type ExtendedText = {
  text: string | JSX.Element;
};

export type ExtendedMessages = OmitText & ExtendedText;
