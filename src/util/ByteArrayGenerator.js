export const byteArrayGenerator = () => {
    const randomString = Math.random().toString(36).substring(7);
    const length = randomString.length;
    const buffer = new ArrayBuffer(length);
    const array = new Uint8Array(buffer);

    for (let i = 0; i < length; i++) {
        array[i] = randomString.charCodeAt(i);
    }
    return array;
};
