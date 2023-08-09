/**
 * Направи тип, който да те задължава да напишеш ключовете на обект 
 * да са pascal case версия на стойностите
 */


type RemoveSpaces<S extends string> = S extends `${infer Left} ${infer Right}`
    ? `${RemoveSpaces<`${Lowercase<Left>}${CamelCase<Lowercase<Right>>}`>}`
    : S;

type CamelCase<S extends string> =
    S extends `${infer First}${infer Rest}`
    ? `${Uppercase<First>}${RemoveSpaces<Rest>}`
    : '';

type KeysAsCamelCaseValues<T extends Record<string, string>> {
    -readonly [K in keyof T as CamelCase<T[K]>]: T[K]
}

type Writeable<T extends Record<string, string>, K extends string> = {
    [P in K]: T[P];
}

const Profession = {
    Influencer: 'influencer',
    ProductManager: 'productManager',
    DataScientist: 'Data Scientist',
    SoftwareDeveloper: 'software developer',
    withMultipleSpacesAndRandomName: 'Multiple    Spaces',
    MoreThanTwoStrings: 'more than two strings',
    UppercaseStrings: "UPPERCASE STRINGS",
    UPPERCASE: "UPPERCASE"
} as const;

function camelize(str: string) {
    return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function (word: string, index: number) {
        return index === 0 ? word.toLowerCase() : word.toUpperCase();
    }).replace(/\s+/g, '');
}

const keysAsCamelCaseValues = <T extends Record<string, string>>(object: T): KeysAsCamelCaseValues<T> => {
    return Object.keys(object).reduce((acc, objKey) => {
        return {
            ...acc,
            [camelize(objKey)]: object[objKey]
        }
    }, {} as KeysAsCamelCaseValues<T>);
}

const profession = keysAsCamelCaseValues(Profession);
profession.MultipleSpaces = "Multiple    Spaces";