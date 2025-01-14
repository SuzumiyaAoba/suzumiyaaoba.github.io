// see: https://codehike.org/docs/code/tabs

import { Block, CodeBlock, parseProps } from "codehike/blocks";
import { z } from "zod";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { highlight, RawCode } from "codehike/code";
import { CustomCodeBlock } from "./custom-code-block";
import { LanguageIcon } from "./language-icon";

const Schema = Block.extend({ tabs: z.array(CodeBlock) });

export async function CodeWithTabs(props: unknown) {
  const { tabs } = parseProps(props, Schema);
  return <CodeTabs tabs={tabs} />;
}

export async function CodeTabs(props: { tabs: RawCode[] }) {
  const { tabs } = props;
  const highlighted = await Promise.all(
    tabs.map((tab) => highlight(tab, "github-light"))
  );
  return (
    <Tabs defaultValue={tabs[0]?.meta}>
      <TabsList>
        {tabs.map((tab, i) => (
          <TabsTrigger
            key={tab.meta}
            value={tab.meta}
            className="flex items-center"
          >
            <LanguageIcon lang={highlighted[i].lang} className="mr-2" />
            {tab.meta}
          </TabsTrigger>
        ))}
      </TabsList>
      {tabs.map((tab, i) => (
        <TabsContent key={tab.meta} value={tab.meta} className="relative">
          <CustomCodeBlock code={highlighted[i]} />
        </TabsContent>
      ))}
    </Tabs>
  );
}
