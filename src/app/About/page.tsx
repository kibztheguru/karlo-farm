import About from "@/components/About";
import { getSettings } from "@/lib/settings";

export default async function Page() {
  const settings = await getSettings();

  return <About settings={settings} />;
}