import { iDocumentMetadataFormatter } from "./models/document-metadata-formatter";
import { iDocumentMetadataTag } from "./models/document-metadata-tag";

/**
 * We are creating this as a singleton
 */
export const DocumentMetadataFormatter: iDocumentMetadataFormatter = {
    toDictionary: (tags: iDocumentMetadataTag[]): {[key: string]: string} => {
        return tags.reduce((obj, tag) => {
            if (obj[tag.key.value]) {
                if (Array.isArray(obj[tag.key.value])) {
                    obj[tag.key.value].push(tag.value.value);
                } else {
                    obj[tag.key.value] = [obj[tag.key.value], tag.value.value];
                }
            } else {
                obj[tag.key.value] = tag.value.value;
            }
            return obj;
        }, {} as any);
    }
}