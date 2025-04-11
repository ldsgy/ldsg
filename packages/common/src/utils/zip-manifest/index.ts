import { Manifest } from "@ldsg/resource";
import JSZip from "jszip";

interface ZipManifestParams<T extends JSZip.OutputType>
  extends JSZip.JSZipGeneratorOptions<T> {
  manifest: Manifest;
}

type UnwrapPromise<T> = T extends Promise<infer U> ? U : T;

type OutputByType<T extends JSZip.OutputType> = UnwrapPromise<
  ReturnType<typeof JSZip.generateAsync<T>>
>;

interface ZipManifestRes<T extends JSZip.OutputType> {
  archive: OutputByType<T>;
}

export const zipManifest = async <T extends JSZip.OutputType>(
  params: ZipManifestParams<T>
): Promise<ZipManifestRes<T>> => {
  const { type, manifest } = params;

  const zip = new JSZip();

  zip.file("manifest.json", JSON.stringify(manifest));

  const archive = await zip.generateAsync({ type });

  const res: ZipManifestRes<T> = {
    archive,
  };

  return res;
};
