import { generate } from "@ldsg/utils";
import { Command } from "commander";

const program = new Command();

program.name("ldsg-cli").description("ldsg cli");

program
  .command("generate")
  .alias("gen")
  .description("generate ldsg app")
  .argument("url", "url for fetch service records and environment variables")
  .option("-o, --output <path>", "output path", "app")
  .option("-e, --extra-app-data <path>", "extra app data path")
  .action(async (url, options) => {
    const { output: outputPath, extraAppData: extraAppDataPath } = options;

    await generate({
      lgsgAppDataUrl: url,
      outputPath,
      extraAppDataPath,
    });
  });

program.parse();
