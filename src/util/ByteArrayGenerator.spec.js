import {byteArrayGenerator as generator} from "./ByteArrayGenerator";
import {readFileSync} from 'fs';
import {Table} from 'apache-arrow';

it('test ', () => {
    const byteArrayGenerator = generator;

    console.log('testing', byteArrayGenerator());
});

it('test arrow file input', () => {
    const func = (fileName) => {
        console.log('reading file ', fileName);
        const arrow = readFileSync(fileName);
        const table = Table.from(arrow);
        console.log('the table length ', table.length);

        table.schema.fields.map((d) => console.log('field ', d.name));
        const value = table.getColumnAt(0).get(0);
        console.log('value ', value);
        console.log('======================');
        // console.log('meta-data', table.getColumnAt(0));
        // .map(d=> console.log('data', d));
    };

    // Array('/Users/dashanlu/Desktop/simple.arrow',
    //     '/Users/dashanlu/Desktop/simple1.arrow',
    //     '/Users/dashanlu/Desktop/test.arrow').forEach(x => func(x));

    Array('/Users/dashanlu/Desktop/test.arrow').forEach(x => func(x));
});

it('test arrow bytearry input', () => {

});