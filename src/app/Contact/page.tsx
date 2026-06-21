import Contact from "@/components/Contact";
import { getSettings } from "@/lib/settings";

export default async function Page() {
  const settings = await getSettings();

  return <Contact settings={settings} />;
}