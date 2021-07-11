import { iDocumentMetadataTag } from "./document-metadata-tag";

/**
 * Service to read the tags from an html document
 */
export interface iDocumentMetadataReader {

    readTagsFromDocument(htmlDocument: string): iDocumentMetadataTag[];

}

/**
 * Service to read the document from a url, then return the tags
 */
export interface iRemoteDocumentMetadataReader {

    readTagsFromUrl(url: string): Promise<{
        metadataTags: iDocumentMetadataTag[];
        document: string;
    }>;

}