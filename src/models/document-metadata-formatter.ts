import { iDocumentMetadataTag } from "./document-metadata-tag";

export interface iDocumentMetadataFormatter {

    toDictionary(tags: iDocumentMetadataTag[]): {[key: string]: string;};

}