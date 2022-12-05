export function normalizeUrl(text) { 
    return encodeURI(text.trim().replaceAll('/', '').replaceAll('.', '').replaceAll(' ', '_').toLowerCase());
}

export function normalizeString(text) { 
    return text.trim().replaceAll('/', '').replaceAll('.', '').replaceAll(' ', '_').toLowerCase();
}

export function removeDash(text) { 
    return text.trim().replaceAll('-', '_');
}

export function getImageUrl(apiUrl, path) {
    return `${apiUrl}/storage/${path}`;
} 

export function getAttachmentsUrl(apiUrl, path) {
    return `${apiUrl}/storage/${path}`;
} 

export function generateImagesObj(apiUrl, arrayOfImages, width, height) {
    if(!Array.isArray(arrayOfImages)) return null;

    return arrayOfImages.map(e => {
        return {
            src: `${apiUrl}/storage/${e.path}`,
            thumbnail: `${apiUrl}/storage/${e.path}`,
            w: width,
            h: height
        };
    })
} 

export function generateAttachmentsObj(apiUrl, arrayOfAttachments) {
    if(!Array.isArray(arrayOfAttachments)) return null;

    return arrayOfAttachments.map(e => {
        return {
            id: e.id,
            title: e.title,
            path: `${apiUrl}/storage/${e.path}`,
        };
    })
} 