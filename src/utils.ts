/**
 * utils
 * @author  sanshishen
 * @email   sanshishen@qq.com
 * @date    2018-10-16 22:43:26
 * @version 1.0.0
 */
/**
 * @method
 * Generates a unique id.<br>
 * But just for the correctness: <strong>this is no Global Unique Identifier</strong>, it is just a random generator 
 * with the output that looks like a GUID. <br>
 * But may be also useful.
 *
 * @returns {String} the  UUID in the format xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx (8-4-4-4-12) 
 **/
export const uuidv1 = (): string => {
    const segment = (): string => {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return `${segment()}${segment()}-${segment()}-${segment()}-${segment()}-${segment()}${segment()}${segment()}`;
};
/**
 * @method
 * @returns {String} the  UUID in the format xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx (8-4-4-4-12)
 */
export const uuidv4 = (): string => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c: string): string => {
        let r = Math.random() * 16 | 0,
            v = c === 'x' ? r : ( r & 0x3 | 0x8);
        return v.toString(16);
    });
};