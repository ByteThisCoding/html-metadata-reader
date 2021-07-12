# html-metadata-reader

![Coverage lines](./coverage/badge-lines.svg)
![Coverage functions](./coverage/badge-functions.svg)
![Coverage branches](./coverage/badge-branches.svg)
![Coverage statements](./coverage/badge-statements.svg)

Node JS solution to read all meta tags and their values from an HTML document. This is useful in cases where we need to read metadata from a document on a Node Js server, where we cannot do a document query. Unlike other solutions, this will retrieve all meta tag information, including arbitrary/non-standard tags.

## Usage
```javascript

const htmlDocumentMetadataReader = new HtmlDocumentMetadataReader();
const tags = htmlDocumentMetadataReader.readTagsFromDocument(htmlString);
console.log(tags);

```

The result will have this schema:
```javascript
/*
* The structure of a tag is split as follows:
* <meta {key.labelName}="{key.value}" {value.labelName}="{value.value}">
* <meta {key.value}="{value.value}">
*/
[
    //title is included, even though it is not technically a meta tag
    {
        "key": {
            "labelName": "",
            "value": "title"
        },
        "value": {
            "labelName": "",
            "value": "Test Page"
        }
    },
    {
        "key": {
            "labelName": "",
            "value": "charset"
        },
        "value": {
            "labelName": "",
            "value": "utf-8"
        }
    },
    {
        "key": {
            "labelName": "name",
            "value": "description"
        },
        "value": {
            "labelName": "value",
            "value": "something"
        }
    },
    {
        "key": {
            "labelName": "name",
            "value": "author"
        },
        "value": {
            "labelName": "content",
            "value": "Byte This!"
        }
    },
    {
        "key": {
            "labelName": "property",
            "value": "og:description"
        },
        "value": {
            "labelName": "content",
            "value": "something"
        }
    }
]
```