/**
 * Generalized representation of a metadata tag
 */
export interface iDocumentMetadataTag {

    //the key, which can be 'name', 'property', etc
    key: {
        labelName: string;
        value: string;
    };

    //the value, which can be 'value', 'content', etc
    value: {
        labelName: string;
        value: string;
    }

}