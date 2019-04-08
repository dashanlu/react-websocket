import {byteArrayGenerator as generator} from "./ByteArrayGenerator";

it('test ', () => {
    const byteArrayGenerator = generator;

    console.log('testing', byteArrayGenerator());
});